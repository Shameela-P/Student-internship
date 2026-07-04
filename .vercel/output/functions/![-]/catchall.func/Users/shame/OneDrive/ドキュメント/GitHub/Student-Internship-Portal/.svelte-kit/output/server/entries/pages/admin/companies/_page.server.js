import { i as updateEntireDatabase, n as getCollection, r as logAction } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/admin/companies/+page.server.js
async function load({ cookies }) {
	requireRole(cookies, ["admin"]);
	return { companies: [...{ companies: await getCollection("companies") }.companies].reverse() };
}
var actions = { updateStatus: async ({ request, cookies }) => {
	requireRole(cookies, ["admin"]);
	const data = await request.formData();
	const companyId = data.get("companyId");
	const newStatus = data.get("status");
	const db = { companies: await getCollection("companies") };
	const companyIndex = db.companies.findIndex((c) => c.id === companyId);
	if (companyIndex > -1) {
		const oldStatus = db.companies[companyIndex].status;
		db.companies[companyIndex].status = newStatus;
		if (newStatus === "Suspended") db.companies[companyIndex].isSuspended = true;
		else if (newStatus === "Approved") db.companies[companyIndex].isSuspended = false;
		await updateEntireDatabase(db);
		logAction("UPDATE_COMPANY_STATUS", `Admin changed company ${companyId} status from ${oldStatus} to ${newStatus}`);
	}
	return { success: true };
} };
//#endregion
export { actions, load };
