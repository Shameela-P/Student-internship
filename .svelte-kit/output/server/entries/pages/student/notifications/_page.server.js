import { o as updateEntireDatabase, r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/student/notifications/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData, notificationsData] = await Promise.all([getCollection("students"), getCollection("notifications")]);
	const db = {
		students: studentsData,
		notifications: notificationsData
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	const studentNotifications = db.notifications.filter((n) => n.recipientEmail.toLowerCase() === student.email.toLowerCase());
	let changed = false;
	studentNotifications.forEach((n) => {
		if (!n.read) {
			n.read = true;
			changed = true;
		}
	});
	if (changed) await updateEntireDatabase(db);
	return { notifications: studentNotifications };
}
//#endregion
export { load };
