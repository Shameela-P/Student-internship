import { i as updateEntireDatabase, n as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/admin/messages/+page.server.js
async function load({ cookies }) {
	requireRole(cookies, ["admin"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		messages: await getCollection("messages")
	};
	if (!db.messages) db.messages = [];
	const adminEmail = "admin@nexora.com";
	const userMessages = db.messages.filter((m) => m.senderEmail.toLowerCase() === adminEmail.toLowerCase() || m.recipientEmail.toLowerCase() === adminEmail.toLowerCase());
	let dbChanged = false;
	db.messages.forEach((m) => {
		if (m.recipientEmail.toLowerCase() === adminEmail.toLowerCase() && !m.read) {
			m.read = true;
			dbChanged = true;
		}
	});
	if (dbChanged) await updateEntireDatabase(db);
	const companies = db.companies.filter((c) => c.status === "Approved" && !c.isSuspended).slice(0, 100).map((c) => ({
		name: c.companyName,
		email: c.companyEmail,
		role: "company"
	}));
	const students = db.students.filter((s) => !s.isBlocked).slice(0, 100).map((s) => ({
		name: s.fullName,
		email: s.email,
		role: "student"
	}));
	return {
		messages: userMessages,
		contacts: [...companies, ...students]
	};
}
var actions = { sendMessage: async ({ request, cookies }) => {
	requireRole(cookies, ["admin"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		messages: await getCollection("messages")
	};
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
		senderEmail: "admin@nexora.com",
		senderRole: "admin",
		senderName: "Nexora Admin",
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
