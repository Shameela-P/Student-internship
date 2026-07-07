import { i as logAction, o as updateEntireDatabase, r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
import crypto from "crypto";
//#region src/routes/company/applications/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const [studentsData, companiesData, internshipsData, applicationsData, notificationsData, emailTemplatesData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("internships"),
		getCollection("applications"),
		getCollection("notifications"),
		getCollection("emailTemplates")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		internships: internshipsData,
		applications: applicationsData,
		notifications: notificationsData,
		emailTemplates: emailTemplatesData
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	const postedInternships = db.internships.filter((i) => i.companyId === company.id);
	const internshipIds = new Set(postedInternships.map((i) => i.id));
	const applications = db.applications.filter((a) => internshipIds.has(a.internshipId)).map((app) => {
		const student = db.students.find((s) => s.id === app.studentId);
		const internship = postedInternships.find((i) => i.id === app.internshipId);
		return {
			...app,
			student: student ? {
				id: student.id,
				fullName: student.fullName,
				email: student.email,
				mobileNumber: student.mobileNumber,
				collegeName: student.collegeName,
				degreeCourse: student.degreeCourse,
				department: student.department,
				yearOfStudy: student.yearOfStudy,
				skills: student.skills,
				address: student.address,
				profilePhoto: student.profilePhoto,
				resumePath: student.resumePath
			} : null,
			internshipTitle: internship ? internship.title : "Deleted Internship",
			domain: internship ? internship.domain : "N/A"
		};
	});
	applications.reverse();
	return {
		company,
		applications
	};
}
var actions = {
	updateStatus: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["company"]);
		const formData = await request.formData();
		const appId = formData.get("applicationId")?.toString();
		const newStatus = formData.get("status")?.toString();
		if (!appId || !newStatus) return fail(400, {
			success: false,
			error: "Reference ID and Status are required"
		});
		const [studentsData, companiesData, internshipsData, applicationsData, notificationsData, emailTemplatesData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("internships"),
			getCollection("applications"),
			getCollection("notifications"),
			getCollection("emailTemplates")
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			internships: internshipsData,
			applications: applicationsData,
			notifications: notificationsData,
			emailTemplates: emailTemplatesData
		};
		const appIndex = db.applications.findIndex((a) => a.id === appId);
		if (appIndex === -1) return fail(404, {
			success: false,
			error: "Application entry not found"
		});
		const application = db.applications[appIndex];
		const internship = db.internships.find((i) => i.id === application.internshipId);
		if (!internship || internship.companyId !== sessionUser.id) return fail(403, {
			success: false,
			error: "Access denied: You do not own this internship posting"
		});
		const student = db.students.find((s) => s.id === application.studentId);
		if (!student) return fail(404, {
			success: false,
			error: "Applicant student profile not found"
		});
		application.status = newStatus;
		application.actionDate = (/* @__PURE__ */ new Date()).toISOString();
		if (newStatus === "Approved") {
			const template = db.emailTemplates.find((t) => t.id === "temp_app_approved");
			let subject = "Internship Selection";
			let body = `Dear ${student.fullName}, your application has been approved.`;
			if (template) {
				subject = template.subject.replace("{title}", internship.title);
				body = template.body.replace("{studentName}", student.fullName).replace("{title}", internship.title).replace("{companyName}", sessionUser.name).replace("{studentMobile}", student.mobileNumber);
			}
			db.notifications.unshift({
				id: `notif_${Date.now()}_approved`,
				recipientEmail: student.email,
				recipientRole: "student",
				subject,
				body,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				read: false
			});
			logAction("APPLICATION_APPROVE", `Company approved application (ID: ${appId}) for student ${student.fullName}. Certificate generated.`);
		} else if (newStatus === "Rejected") {
			const template = db.emailTemplates.find((t) => t.id === "temp_app_rejected");
			let subject = "Internship Update";
			let body = `Dear ${student.fullName}, thank you for applying, but we will not be moving forward.`;
			if (template) {
				subject = template.subject.replace("{title}", internship.title);
				body = template.body.replace("{studentName}", student.fullName).replace("{title}", internship.title).replace("{companyName}", sessionUser.name);
			}
			db.notifications.unshift({
				id: `notif_${Date.now()}_rejected`,
				recipientEmail: student.email,
				recipientRole: "student",
				subject,
				body,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				read: false
			});
			logAction("APPLICATION_REJECT", `Company rejected application (ID: ${appId}) for student ${student.fullName}.`);
		} else if (newStatus === "Shortlisted") {
			db.notifications.unshift({
				id: `notif_${Date.now()}_shortlisted`,
				recipientEmail: student.email,
				recipientRole: "student",
				subject: `Application Shortlisted: ${internship.title}`,
				body: `Dear ${student.fullName},\n\nWe are pleased to inform you that your application for "${internship.title}" has been SHORTLISTED by our hiring board.\n\nWe will review your resume in the next phase or contact you directly to schedule an interview.\n\nBest regards,\n${sessionUser.name} Recruiting Office`,
				date: (/* @__PURE__ */ new Date()).toISOString(),
				read: false
			});
			logAction("APPLICATION_SHORTLIST", `Company shortlisted application (ID: ${appId}) for student ${student.fullName}.`);
		} else logAction("APPLICATION_PENDING", `Company set application (ID: ${appId}) to pending.`);
		await updateEntireDatabase(db);
		return { success: true };
	},
	issueCertificate: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["company"]);
		const appId = (await request.formData()).get("applicationId")?.toString();
		if (!appId) return fail(400, {
			success: false,
			error: "Reference ID is required"
		});
		const [studentsData, companiesData, internshipsData, applicationsData, notificationsData, emailTemplatesData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("internships"),
			getCollection("applications"),
			getCollection("notifications"),
			getCollection("emailTemplates")
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			internships: internshipsData,
			applications: applicationsData,
			notifications: notificationsData,
			emailTemplates: emailTemplatesData
		};
		const appIndex = db.applications.findIndex((a) => a.id === appId);
		if (appIndex === -1) return fail(404, {
			success: false,
			error: "Application entry not found"
		});
		const application = db.applications[appIndex];
		const internship = db.internships.find((i) => i.id === application.internshipId);
		if (!internship || internship.companyId !== sessionUser.id) return fail(403, {
			success: false,
			error: "Access denied: You do not own this internship posting"
		});
		if (application.status !== "Approved") return fail(400, {
			success: false,
			error: "Application must be approved before issuing a certificate"
		});
		if (!application.certificateHash) {
			const uniqueSeed = `${appId}_${application.studentId}_${Date.now()}`;
			application.certificateHash = `cert_${crypto.createHash("sha256").update(uniqueSeed).digest("hex").substr(0, 20)}`;
			application.status = "Completed";
			await updateEntireDatabase(db);
			logAction("CERTIFICATE_ISSUE", `Company issued completion certificate for application (ID: ${appId}).`);
		}
		return { success: true };
	}
};
//#endregion
export { actions, load };
