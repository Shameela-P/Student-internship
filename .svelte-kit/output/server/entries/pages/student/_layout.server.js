import { l as queryDocuments, o as getDocument } from "../../../chunks/db.js";
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
	return {
		user: sessionUser,
		student,
		lazy: {
			unreadNotifications: (async () => {
				return (await queryDocuments("notifications", "recipientEmail", student.email)).filter((n) => !n.read).length;
			})(),
			unreadMessages: (async () => {
				return (await queryDocuments("messages", "recipientEmail", student.email)).filter((m) => !m.read).length;
			})()
		}
	};
}
//#endregion
export { load };
