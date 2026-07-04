import { n as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/company/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const db = {
		companies: await getCollection("companies"),
		notifications: await getCollection("notifications"),
		messages: await getCollection("messages")
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	if (!company) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	if (company.isSuspended) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	const unreadNotifications = db.notifications.filter((n) => n.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase() && !n.read).length;
	const unreadMessages = db.messages ? db.messages.filter((m) => m.recipientEmail === company.companyEmail && !m.read).length : 0;
	return {
		user: sessionUser,
		company,
		pendingApproval: company.status === "Pending",
		unreadNotifications,
		unreadMessages
	};
}
//#endregion
export { load };
