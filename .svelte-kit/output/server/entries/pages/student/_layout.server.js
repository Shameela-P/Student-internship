import { r as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/student/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData, notificationsData, messagesData] = await Promise.all([
		getCollection("students"),
		getCollection("notifications"),
		getCollection("messages")
	]);
	const student = studentsData.find((s) => s.id === sessionUser.id);
	if (!student) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	return {
		user: sessionUser,
		student,
		unreadNotifications: (notificationsData || []).filter((n) => n?.recipientEmail?.toLowerCase() === student.email?.toLowerCase() && !n.read).length,
		unreadMessages: (messagesData || []).filter((m) => m?.recipientEmail?.toLowerCase() === student.email?.toLowerCase() && !m.read).length
	};
}
//#endregion
export { load };
