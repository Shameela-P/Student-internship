import { i as updateEntireDatabase, n as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/company/messages/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		internships: await getCollection("internships"),
		applications: await getCollection("applications"),
		messages: await getCollection("messages")
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	if (!db.messages) db.messages = [];
	const userMessages = db.messages.filter((m) => m.senderEmail.toLowerCase() === company.companyEmail.toLowerCase() || m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase());
	let dbChanged = false;
	db.messages.forEach((m) => {
		if (m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase() && !m.read) {
			m.read = true;
			dbChanged = true;
		}
	});
	if (dbChanged) await updateEntireDatabase(db);
	const companyInternshipIds = db.internships.filter((i) => i.companyId === company.id).map((i) => i.id);
	const appliedStudentIds = Array.from(new Set(db.applications.filter((a) => companyInternshipIds.includes(a.internshipId)).map((a) => a.studentId)));
	return {
		company,
		messages: userMessages,
		contacts: [{
			name: "Nexora Admin Support",
			email: "admin@nexora.com",
			role: "admin"
		}, ...db.students.filter((s) => appliedStudentIds.includes(s.id) && !s.isBlocked).map((s) => ({
			name: s.fullName,
			email: s.email,
			role: "student"
		}))]
	};
}
var actions = { sendMessage: async ({ request, cookies }) => {
	const sessionUser = requireRole(cookies, ["company"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		internships: await getCollection("internships"),
		applications: await getCollection("applications"),
		messages: await getCollection("messages")
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	const formData = await request.formData();
	const recipientEmail = formData.get("recipientEmail")?.toString().trim();
	const recipientRole = formData.get("recipientRole")?.toString().trim();
	const recipientName = formData.get("recipientName")?.toString().trim();
	const content = formData.get("content")?.toString().trim();
	if (!recipientEmail || !recipientRole || !content) return fail(400, {
		success: false,
		error: "Recipient details or content is required"
	});
	if (!db.messages) db.messages = [];
	const newMessage = {
		id: `msg_${Date.now()}`,
		senderEmail: company.companyEmail,
		senderRole: "company",
		senderName: company.companyName,
		recipientEmail,
		recipientRole,
		recipientName: recipientName || "User",
		content,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	};
	db.messages.push(newMessage);
	await updateEntireDatabase(db);
	return { success: true };
} };
//#endregion
export { actions, load };
