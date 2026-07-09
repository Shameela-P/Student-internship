import "../../../chunks/firebase.js";
import { c as logAction, i as getCollection, n as addDocument, u as queryDocumentsPaginated } from "../../../chunks/db.js";
import { i as hashPassword, s as verifyToken } from "../../../chunks/auth.js";
import { fail, redirect } from "@sveltejs/kit";
import "path";
import "firebase/storage";
//#region src/routes/register/+page.server.js
async function load({ url, cookies }) {
	const sessionCookie = cookies.get("nexora_session");
	if (sessionCookie) {
		const session = verifyToken(sessionCookie);
		if (session) throw redirect(303, `/${session.role}`);
	}
	return { role: url.searchParams.get("role") || "student" };
}
var actions = {
	registerStudent: async ({ request, cookies }) => {
		const formData = await request.formData();
		const fullName = formData.get("fullName")?.toString().trim();
		const email = formData.get("email")?.toString().trim().toLowerCase();
		const mobileNumber = formData.get("mobileNumber")?.toString().trim();
		const password = formData.get("password")?.toString();
		const collegeName = formData.get("collegeName")?.toString().trim();
		const degreeCourse = formData.get("degreeCourse")?.toString().trim();
		const department = formData.get("department")?.toString().trim();
		const yearOfStudy = formData.get("yearOfStudy")?.toString().trim();
		const currentStatus = formData.get("currentStatus")?.toString();
		const skillsRaw = formData.get("skills")?.toString().trim();
		const address = formData.get("address")?.toString().trim();
		const profilePhoto = formData.get("profilePhoto")?.toString().trim() || "";
		const resumeUrl = formData.get("resumeUrl")?.toString().trim();
		if (!fullName || !email || !mobileNumber || !password || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address || !resumeUrl) return fail(400, {
			success: false,
			error: "Please fill out all required student profile fields"
		});
		try {
			if (new URL(resumeUrl).protocol !== "https:") return fail(400, {
				success: false,
				error: "Resume URL must use a secure HTTPS protocol"
			});
		} catch (e) {
			return fail(400, {
				success: false,
				error: "Please provide a valid publicly accessible HTTPS Resume URL"
			});
		}
		const [students, companies, admins, emailTemplatesData] = await Promise.all([
			queryDocumentsPaginated("students", "email", email, 1),
			queryDocumentsPaginated("companies", "companyEmail", email, 1),
			queryDocumentsPaginated("admins", "email", email, 1),
			getCollection("emailTemplates")
		]);
		if (students.length > 0 || companies.length > 0 || admins.length > 0) return fail(400, {
			success: false,
			error: "This email is already registered on Nexora"
		});
		const skills = skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
		await addDocument("students", {
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
			resumeUrl,
			isBlocked: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		const template = emailTemplatesData.find((t) => t.id === "temp_student_reg");
		let subject = "Welcome to Nexora";
		let body = `Hi ${fullName}, welcome to Nexora! Your profile has been registered.`;
		if (template) {
			subject = template.subject;
			body = template.body.replace("{name}", fullName).replace("{degree}", degreeCourse).replace("{college}", collegeName);
		}
		await addDocument("notifications", {
			id: `notif_${Date.now()}`,
			recipientEmail: email,
			recipientRole: "student",
			subject,
			body,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		});
		logAction("STUDENT_REGISTER", `New student ${fullName} (${email}) registered.`);
		throw redirect(303, "/login?registered=true");
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
		if (!companyName || !companyEmail || !companyContactNumber || !website || !companyAddress || !companyDescription || !industryType || !password) return fail(400, {
			success: false,
			error: "Please fill out all required company profile fields"
		});
		const [students, companies, admins, emailTemplatesData] = await Promise.all([
			queryDocumentsPaginated("students", "email", companyEmail, 1),
			queryDocumentsPaginated("companies", "companyEmail", companyEmail, 1),
			queryDocumentsPaginated("admins", "email", companyEmail, 1),
			getCollection("emailTemplates")
		]);
		if (students.length > 0 || companies.length > 0 || admins.length > 0) return fail(400, {
			success: false,
			error: "This email is already registered on Nexora"
		});
		await addDocument("companies", {
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
			status: "Approved",
			isSuspended: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		});
		const template = emailTemplatesData.find((t) => t.id === "temp_company_reg");
		let subject = "Nexora Company Application";
		let body = `Dear HR at ${companyName}, your registration is pending review.`;
		if (template) {
			subject = template.subject;
			body = template.body.replace("{companyName}", companyName);
		}
		await addDocument("notifications", {
			id: `notif_${Date.now()}`,
			recipientEmail: companyEmail,
			recipientRole: "company",
			subject,
			body,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		});
		logAction("COMPANY_REGISTER", `New company ${companyName} (${companyEmail}) submitted for approval.`);
		throw redirect(303, "/login?registered=true");
	}
};
//#endregion
export { actions, load };
