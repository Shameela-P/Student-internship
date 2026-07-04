import { n as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/student/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const db = {
		students: await getCollection("students"),
		notifications: await getCollection("notifications"),
		messages: await getCollection("messages")
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	if (!student) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	return {
		user: sessionUser,
		student,
		unreadNotifications: db.notifications.filter((n) => n.recipientEmail.toLowerCase() === student.email.toLowerCase() && !n.read).length,
		unreadMessages: db.messages ? db.messages.filter((m) => m.recipientEmail === student.email && !m.read).length : 0
	};
}
//#endregion
export { load };
