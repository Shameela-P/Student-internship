import { i as updateEntireDatabase, n as getCollection, r as logAction } from "../../../chunks/db.js";
import { i as hashPassword, n as createToken } from "../../../chunks/auth.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/register/+page.server.js
function isValidIndianPhone(number) {
	return /^(?:\+91[\s-]?)?(?:[6-9]\d{9})$/.test(number || "");
}
function isValidCompanyPhone(number) {
	return /^(?:\+?\d[\s-]?)?(?:\d{3,4}[\s-]?\d{3,4}[\s-]?\d{3,4})$/.test(number || "");
}
function isValidUrl(value) {
	try {
		const url = new URL(value);
		return ["http:", "https:"].includes(url.protocol);
	} catch {
		return false;
	}
}
async function load({ url }) {
	return { role: url.searchParams.get("role") || "student" };
}
var actions = {
	registerStudent: async ({ request, cookies }) => {
		const formData = await request.formData();
		const fullName = formData.get("fullName")?.toString().trim();
		const email = formData.get("email")?.toString().trim().toLowerCase();
		const mobileNumber = formData.get("mobileNumber")?.toString().trim();
		const password = formData.get("password")?.toString();
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$_@#!])[A-Za-z0-9$_@#!]{8,14}$/.test(password || "")) return fail(400, {
			success: false,
			error: "Password does not meet the security requirements."
		});
		const collegeName = formData.get("collegeName")?.toString().trim();
		const degreeCourse = formData.get("degreeCourse")?.toString().trim();
		const department = formData.get("department")?.toString().trim();
		const yearOfStudy = formData.get("yearOfStudy")?.toString().trim();
		const currentStatus = formData.get("currentStatus")?.toString();
		const skillsRaw = formData.get("skills")?.toString().trim();
		const address = formData.get("address")?.toString().trim();
		const profilePhoto = formData.get("profilePhoto")?.toString().trim() || "";
		const resumeUrl = formData.get("resumeUrl")?.toString().trim() || "";
		if (!fullName || !email || !mobileNumber || !password || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address) return fail(400, {
			success: false,
			error: "Please fill out all required student profile fields"
		});
		if (!isValidIndianPhone(mobileNumber)) return fail(400, {
			success: false,
			error: "Please enter a valid 10-digit Indian mobile number."
		});
		const db = {
			students: await getCollection("students"),
			companies: await getCollection("companies"),
			admins: await getCollection("admins"),
			notifications: await getCollection("notifications"),
			emailTemplates: await getCollection("emailTemplates")
		};
		if (db.students.some((s) => s.email.toLowerCase() === email) || db.companies.some((c) => c.companyEmail.toLowerCase() === email) || db.admins.some((a) => a.email.toLowerCase() === email)) return fail(400, {
			success: false,
			error: "This email is already registered on Nexora"
		});
		if (!resumeUrl || !isValidUrl(resumeUrl)) return fail(400, {
			success: false,
			error: "A valid PDF/DOC resume upload is required."
		});
		const skills = skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
		const newStudent = {
			id: `stud_${Date.now()}`,
			fullName,
			email,
			mobileNumber,
			password: hashPassword(password),
			collegeName,
			degreeCourse,
			department,
			yearOfStudy,
			currentStatus,
			skills,
			address,
			profilePhoto,
			resumePath: resumeUrl,
			isBlocked: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.students.push(newStudent);
		const template = db.emailTemplates.find((t) => t.id === "temp_student_reg");
		let subject = "Welcome to Nexora";
		let body = `Hi ${fullName}, welcome to Nexora! Your profile has been registered.`;
		if (template) {
			subject = template.subject;
			body = template.body.replace("{name}", fullName).replace("{degree}", degreeCourse).replace("{college}", collegeName);
		}
		db.notifications.unshift({
			id: `notif_${Date.now()}`,
			recipientEmail: email,
			recipientRole: "student",
			subject,
			body,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		});
		await updateEntireDatabase(db);
		logAction("STUDENT_REGISTER", `New student ${fullName} (${email}) registered.`);
		const token = createToken({
			id: newStudent.id,
			email: newStudent.email,
			name: newStudent.fullName,
			role: "student"
		});
		cookies.set("nexora_session", token, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 3600 * 24
		});
		throw redirect(303, "/student");
	},
	registerCompany: async ({ request, cookies }) => {
		const formData = await request.formData();
		const companyName = formData.get("companyName")?.toString().trim();
		const companyEmail = formData.get("companyEmail")?.toString().trim().toLowerCase();
		const companyContactNumber = formData.get("companyContactNumber")?.toString().trim();
		const website = formData.get("website")?.toString().trim();
		const companyAddress = formData.get("companyAddress")?.toString().trim();
		const companyDescription = formData.get("companyDescription")?.toString().trim();
		const industryType = formData.get("industryType")?.toString();
		const companyLogo = formData.get("companyLogo")?.toString().trim() || "";
		const password = formData.get("password")?.toString();
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$_@#!])[A-Za-z0-9$_@#!]{8,14}$/.test(password || "")) return fail(400, {
			success: false,
			error: "Password does not meet the security requirements."
		});
		if (!companyName || !companyEmail || !companyContactNumber || !website || !companyAddress || !companyDescription || !industryType || !password) return fail(400, {
			success: false,
			error: "Please fill out all required company profile fields"
		});
		if (!isValidCompanyPhone(companyContactNumber)) return fail(400, {
			success: false,
			error: "Please enter a valid company contact number."
		});
		if (!isValidUrl(website)) return fail(400, {
			success: false,
			error: "Please enter a valid company website URL."
		});
		const db = {
			students: await getCollection("students"),
			companies: await getCollection("companies"),
			admins: await getCollection("admins"),
			notifications: await getCollection("notifications"),
			emailTemplates: await getCollection("emailTemplates")
		};
		if (db.students.some((s) => s.email.toLowerCase() === companyEmail) || db.companies.some((c) => c.companyEmail.toLowerCase() === companyEmail) || db.admins.some((a) => a.email.toLowerCase() === companyEmail)) return fail(400, {
			success: false,
			error: "This email is already registered on Nexora"
		});
		const newCompany = {
			id: `comp_${Date.now()}`,
			companyName,
			companyEmail,
			companyContactNumber,
			website,
			companyAddress,
			companyDescription,
			industryType,
			companyLogo,
			password: hashPassword(password),
			status: "Pending",
			isSuspended: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		db.companies.push(newCompany);
		const template = db.emailTemplates.find((t) => t.id === "temp_company_reg");
		let subject = "Nexora Company Application";
		let body = `Dear HR at ${companyName}, your registration is pending review.`;
		if (template) {
			subject = template.subject;
			body = template.body.replace("{companyName}", companyName);
		}
		db.notifications.unshift({
			id: `notif_${Date.now()}`,
			recipientEmail: companyEmail,
			recipientRole: "company",
			subject,
			body,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		});
		await updateEntireDatabase(db);
		logAction("COMPANY_REGISTER", `New company ${companyName} (${companyEmail}) submitted for approval.`);
		const token = createToken({
			id: newCompany.id,
			email: newCompany.companyEmail,
			name: newCompany.companyName,
			role: "company"
		});
		cookies.set("nexora_session", token, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 3600 * 24
		});
		throw redirect(303, "/company");
	}
};
//#endregion
export { actions, load };
