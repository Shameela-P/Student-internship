import { r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/admin/email-templates/+page.server.js
async function load({ cookies }) {
	requireRole(cookies, ["admin"]);
	const [emailTemplatesData] = await Promise.all([getCollection("emailTemplates")]);
	let templates = { emailTemplates: emailTemplatesData }.emailTemplates || [];
	if (templates.length === 0) templates = [
		{
			id: "TEMP_STUDENT_REG",
			name: "Student Registration Success",
			subject: "Welcome to Nexora - Start Your Internship Journey",
			body: "Hi {name},\n\nWelcome to Nexora. Your account has been created successfully."
		},
		{
			id: "TEMP_COMPANY_REG",
			name: "Company Registration Submitted",
			subject: "Company Account Pending Approval - Nexora",
			body: "Hello,\n\nYour company registration is pending approval."
		},
		{
			id: "TEMP_APP_SUBMITTED",
			name: "Student Application Submitted",
			subject: "Application Filed for {title}",
			body: "Hi {name},\n\nYour application for {title} has been submitted."
		},
		{
			id: "TEMP_APP_APPROVED",
			name: "Application Approved (Hired)",
			subject: "Congratulations! You are selected for {title}",
			body: "Congratulations {name},\n\nYou have been selected for the {title} internship."
		}
	];
	return { templates };
}
//#endregion
export { load };
