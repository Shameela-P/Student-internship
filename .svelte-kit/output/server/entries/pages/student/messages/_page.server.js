import { o as updateEntireDatabase, r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/student/messages/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData, companiesData, messagesData, notificationsData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("messages"),
		getCollection("notifications")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		messages: messagesData,
		notifications: notificationsData
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	if (!db.messages) db.messages = [];
	const userMessages = db.messages.filter((m) => m.senderEmail.toLowerCase() === student.email.toLowerCase() || m.recipientEmail.toLowerCase() === student.email.toLowerCase());
	let dbChanged = false;
	db.messages.forEach((m) => {
		if (m.recipientEmail.toLowerCase() === student.email.toLowerCase() && !m.read) {
			m.read = true;
			dbChanged = true;
		}
	});
	if (dbChanged) await updateEntireDatabase(db);
	return {
		student,
		messages: userMessages,
		contacts: [{
			name: "Nexora Admin Support",
			email: "admin@nexora.com",
			role: "admin"
		}, ...db.companies.filter((c) => c.status === "Approved" && !c.isSuspended).slice(0, 100).map((c) => ({
			name: c.companyName,
			email: c.companyEmail,
			role: "company"
		}))]
	};
}
var actions = { sendMessage: async ({ request, cookies }) => {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData, companiesData, messagesData, notificationsData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("messages"),
		getCollection("notifications")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		messages: messagesData,
		notifications: notificationsData
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
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
		senderEmail: student.email,
		senderRole: "student",
		senderName: student.fullName,
		recipientEmail,
		recipientRole,
		recipientName: recipientName || "User",
		content,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	};
	db.messages.push(newMessage);
	if (!db.notifications) db.notifications = [];
	db.notifications.unshift({
		id: "notif_" + Date.now(),
		recipientEmail,
		recipientRole,
		subject: "New Message from " + newMessage.senderName,
		body: "You received a new message: \"" + content.substring(0, 50) + "...\"",
		date: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	});
	await updateEntireDatabase(db);
	return { success: true };
} };
//#endregion
export { actions, load };
