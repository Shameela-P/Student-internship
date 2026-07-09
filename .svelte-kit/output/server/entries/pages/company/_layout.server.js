import { l as queryDocuments, o as getDocument } from "../../../chunks/db.js";
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
	return {
		user: sessionUser,
		company,
		pendingApproval: company.status === "Pending",
		lazy: {
			unreadNotifications: (async () => {
				return (await queryDocuments("notifications", "recipientEmail", company.companyEmail)).filter((n) => !n.read).length;
			})(),
			unreadMessages: (async () => {
				return (await queryDocuments("messages", "recipientEmail", company.companyEmail)).filter((m) => !m.read).length;
			})()
		}
	};
}
//#endregion
export { load };
