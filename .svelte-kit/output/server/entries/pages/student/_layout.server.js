import { a as getDocument, s as queryDocuments } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/student/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const student = await getDocument("students", sessionUser.id);
	if (!student) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	const [unreadNotifs, unreadMsgs] = await Promise.all([queryDocuments("notifications", "recipientEmail", student.email), queryDocuments("messages", "recipientEmail", student.email)]);
	return {
		user: sessionUser,
		student,
		unreadNotifications: unreadNotifs.filter((n) => !n.read).length,
		unreadMessages: unreadMsgs.filter((m) => !m.read).length
	};
}
//#endregion
export { load };
