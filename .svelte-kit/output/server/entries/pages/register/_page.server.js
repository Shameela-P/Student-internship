import { i as getCollection, l as updateEntireDatabase, o as logAction } from "../../../chunks/db.js";
import { i as hashPassword } from "../../../chunks/auth.js";
import { t as uploadFileBuffer } from "../../../chunks/storageHelper.js";
import { fail, redirect } from "@sveltejs/kit";
import path from "path";
//#region src/routes/register/+page.server.js
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
		const collegeName = formData.get("collegeName")?.toString().trim();
		const degreeCourse = formData.get("degreeCourse")?.toString().trim();
		const department = formData.get("department")?.toString().trim();
		const yearOfStudy = formData.get("yearOfStudy")?.toString().trim();
		const currentStatus = formData.get("currentStatus")?.toString();
		const skillsRaw = formData.get("skills")?.toString().trim();
		const address = formData.get("address")?.toString().trim();
		const profilePhoto = formData.get("profilePhoto")?.toString().trim() || "";
		const resumeFile = formData.get("resume");
		if (!fullName || !email || !mobileNumber || !password || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address) return fail(400, {
			success: false,
			error: "Please fill out all required student profile fields"
		});
		const [studentsData, companiesData, adminsData, notificationsData, emailTemplatesData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("admins"),
			getCollection("notifications"),
			getCollection("emailTemplates")
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			admins: adminsData,
			notifications: notificationsData,
			emailTemplates: emailTemplatesData
		};
		if (db.students.some((s) => s.email.toLowerCase() === email) || db.companies.some((c) => c.companyEmail.toLowerCase() === email) || db.admins.some((a) => a.email.toLowerCase() === email)) return fail(400, {
			success: false,
			error: "This email is already registered on Nexora"
		});
		let resumePath = "";
		if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
			const ext = path.extname(resumeFile.name) || ".pdf";
			const filename = `resumes/resume_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
			try {
				resumePath = await uploadFileBuffer(await resumeFile.arrayBuffer(), filename, resumeFile.type || "application/pdf");
			} catch (err) {
				console.error("File save error:", err);
				return fail(500, {
					success: false,
					error: "Failed to upload resume to storage. Please try again."
				});
			}
		} else return fail(400, {
			success: false,
			error: "A PDF/DOC resume file upload is required"
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
			resumePath,
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
		const [studentsData, companiesData, adminsData, notificationsData, emailTemplatesData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("admins"),
			getCollection("notifications"),
			getCollection("emailTemplates")
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			admins: adminsData,
			notifications: notificationsData,
			emailTemplates: emailTemplatesData
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
			status: "Approved",
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
		throw redirect(303, "/login?registered=true");
	}
};
//#endregion
export { actions, load };
