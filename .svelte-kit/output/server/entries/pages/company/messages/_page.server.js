import { d as updateDocument, i as getCollection, n as addDocument } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/company/messages/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const [studentsData, companiesData, internshipsData, applicationsData, messagesData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("internships"),
		getCollection("applications"),
		getCollection("messages")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		internships: internshipsData,
		applications: applicationsData,
		messages: messagesData
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	if (!db.messages) db.messages = [];
	const userMessages = db.messages.filter((m) => m.senderEmail.toLowerCase() === company.companyEmail.toLowerCase() || m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase());
	for (const m of db.messages) if (m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase() && !m.read) {
		m.read = true;
		await updateDocument("messages", m.id, { read: true });
	}
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
	const company = (await getCollection("companies")).find((c) => c.id === sessionUser.id);
	const formData = await request.formData();
	const recipientEmail = formData.get("recipientEmail")?.toString().trim();
	const recipientRole = formData.get("recipientRole")?.toString().trim();
	const recipientName = formData.get("recipientName")?.toString().trim();
	const content = formData.get("content")?.toString().trim();
	if (!recipientEmail || !recipientRole || !content) return fail(400, {
		success: false,
		error: "Recipient details or content is required"
	});
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
	await addDocument("messages", newMessage);
	await addDocument("notifications", {
		id: "notif_" + Date.now(),
		recipientEmail,
		recipientRole,
		subject: "New Message from " + newMessage.senderName,
		body: "You received a new message: \"" + content.substring(0, 50) + "...\"",
		date: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	});
	return { success: true };
} };
//#endregion
export { actions, load };
