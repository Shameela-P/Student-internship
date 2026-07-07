import { n as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/student/notifications/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const db = {
		students: await getCollection("students"),
		notifications: await getCollection("notifications")
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	return {
		notifications: db.notifications.filter((n) => n.recipientEmail.toLowerCase() === student.email.toLowerCase()),
		student: { email: student.email }
	};
}
//#endregion
export { load };
