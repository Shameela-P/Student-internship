import { i as updateEntireDatabase, n as getCollection } from "../../../../chunks/db.js";
import { n as markMessagesRead } from "../../../../chunks/messages.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/student/messages/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		messages: await getCollection("messages"),
		notifications: await getCollection("notifications")
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	if (!db.messages) db.messages = [];
	const userMessages = db.messages.filter((m) => m.senderEmail.toLowerCase() === student.email.toLowerCase() || m.recipientEmail.toLowerCase() === student.email.toLowerCase());
	let dbChanged = false;
	if (markMessagesRead(db.messages, student.email)) dbChanged = true;
	if (dbChanged) await updateEntireDatabase(db);
	return {
		student,
		messages: userMessages,
		contacts: [{
			name: "Nexora Admin Support",
			email: "admin@nexora.com",
			role: "admin"
		}, ...db.companies.filter((c) => c.status === "Approved" && !c.isSuspended).map((c) => ({
			name: c.companyName,
			email: c.companyEmail,
			role: "company"
		}))]
	};
}
var actions = { sendMessage: async ({ request, cookies }) => {
	const sessionUser = requireRole(cookies, ["student"]);
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		messages: await getCollection("messages"),
		notifications: await getCollection("notifications")
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	const formData = await request.formData();
	const recipientEmail = formData.get("recipientEmail")?.toString().trim();
	const recipientRole = formData.get("recipientRole")?.toString().trim();
	const recipientName = formData.get("recipientName")?.toString().trim();
	const content = formData.get("content")?.toString().trim();
	const attachmentUrl = formData.get("attachmentUrl")?.toString().trim();
	const attachmentName = formData.get("attachmentName")?.toString().trim();
	const attachmentSize = formData.get("attachmentSize")?.toString().trim();
	const attachmentMimeType = formData.get("attachmentMimeType")?.toString().trim();
	if (!recipientEmail || !recipientRole || !content && !attachmentUrl) return fail(400, {
		success: false,
		error: "Recipient details or content is required"
	});
	let attachmentPath = "";
	let attachmentType = "";
	if (attachmentUrl) {
		attachmentPath = attachmentUrl;
		attachmentType = attachmentMimeType?.startsWith("image/") ? "image" : "file";
	}
	if (!db.messages) db.messages = [];
	const newMessage = {
		id: `msg_${Date.now()}`,
		senderEmail: student.email,
		senderRole: "student",
		senderName: student.fullName,
		recipientEmail,
		recipientRole,
		recipientName: recipientName || "User",
		content: content || "",
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		read: false,
		attachmentPath,
		attachmentType,
		attachmentName: attachmentName || "",
		attachmentSize: parseInt(attachmentSize) || 0,
		attachmentMimeType: attachmentMimeType || ""
	};
	db.messages.push(newMessage);
	if (!db.notifications) db.notifications = [];
	db.notifications.push({
		id: `notif_${Date.now()}_${Math.floor(Math.random() * 1e3)}`,
		recipientEmail,
		recipientRole,
		subject: `New Message from ${student.fullName}`,
		body: content ? `"${content.substring(0, 100)}${content.length > 100 ? "..." : ""}"` : `Sent an attachment: ${attachmentName || "File"}`,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	});
	await updateEntireDatabase(db);
	return { success: true };
} };
//#endregion
export { actions, load };
