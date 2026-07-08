import { c as updateDocument, i as getCollection, o as logAction } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/admin/companies/+page.server.js
async function load({ cookies }) {
	requireRole(cookies, ["admin"]);
	return { companies: [...await getCollection("companies")].reverse() };
}
var actions = { updateStatus: async ({ request, cookies }) => {
	requireRole(cookies, ["admin"]);
	const data = await request.formData();
	const companyId = data.get("companyId");
	const newStatus = data.get("status");
	const updates = { status: newStatus };
	if (newStatus === "Suspended") updates.isSuspended = true;
	else if (newStatus === "Approved") updates.isSuspended = false;
	await updateDocument("companies", companyId, updates);
	await logAction("UPDATE_COMPANY_STATUS", `Admin changed company ${companyId} status to ${newStatus}`);
	return { success: true };
} };
//#endregion
export { actions, load };
