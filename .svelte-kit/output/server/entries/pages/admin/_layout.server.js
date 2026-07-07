import { n as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/admin/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["admin"]);
	const db = {
		admins: await getCollection("admins"),
		notifications: await getCollection("notifications")
	};
	const admin = db.admins.find((a) => a.id === sessionUser.id);
	if (!admin) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	return {
		user: sessionUser,
		admin,
		unreadMessages: db.notifications ? db.notifications.filter((m) => m.recipientEmail === admin.email && !m.read).length : 0
	};
}
//#endregion
export { load };
