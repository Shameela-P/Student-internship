import { r as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/company/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const [companiesData, notificationsData, messagesData] = await Promise.all([
		getCollection("companies"),
		getCollection("notifications"),
		getCollection("messages")
	]);
	const company = companiesData.find((c) => c.id === sessionUser.id);
	if (!company) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	if (company.isSuspended) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	const unreadNotifications = (notificationsData || []).filter((n) => n?.recipientEmail?.toLowerCase() === company.companyEmail?.toLowerCase() && !n.read).length;
	const unreadMessages = (messagesData || []).filter((m) => m?.recipientEmail?.toLowerCase() === company.companyEmail?.toLowerCase() && !m.read).length;
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
