import { i as updateEntireDatabase, n as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/admin/notifications/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["admin"]);
	const db = {
		admins: await getCollection("admins"),
		notifications: await getCollection("notifications")
	};
	const admin = db.admins.find((s) => s.id === sessionUser.id);
	return { notifications: db.notifications.filter((n) => n.recipientEmail.toLowerCase() === admin.email.toLowerCase()) };
}
var actions = { deleteNotification: async ({ request, cookies }) => {
	requireRole(cookies, ["admin"]);
	const id = (await request.formData()).get("id");
	if (!id) return;
	const db = { notifications: await getCollection("notifications") };
	const index = db.notifications.findIndex((n) => n.id === id);
	if (index !== -1) {
		db.notifications.splice(index, 1);
		await updateEntireDatabase(db);
	}
	return { success: true };
} };
//#endregion
export { actions, load };
