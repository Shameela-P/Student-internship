import { l as queryDocuments, o as getDocument } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/admin/+layout.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["admin"]);
	const admin = await getDocument("admins", sessionUser.id);
	if (!admin) {
		cookies.delete("nexora_session", { path: "/" });
		throw redirect(303, "/login");
	}
	(await queryDocuments("notifications", "recipientEmail", admin.email)).filter((n) => !n.read).length;
	return {
		user: sessionUser,
		admin,
		lazy: { unreadMessages: (async () => {
			return (await queryDocuments("notifications", "recipientEmail", admin.email)).filter((n) => !n.read).length;
		})() }
	};
}
//#endregion
export { load };
