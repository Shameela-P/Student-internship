import { a as getDocument, s as queryDocuments } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/company/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const company = await getDocument("companies", sessionUser.id);
	if (!company) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	if (company.isSuspended) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	const [unreadNotifs, unreadMsgs] = await Promise.all([queryDocuments("notifications", "recipientEmail", company.companyEmail), queryDocuments("messages", "recipientEmail", company.companyEmail)]);
	const unreadNotifications = unreadNotifs.filter((n) => !n.read).length;
	const unreadMessages = unreadMsgs.filter((m) => !m.read).length;
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
