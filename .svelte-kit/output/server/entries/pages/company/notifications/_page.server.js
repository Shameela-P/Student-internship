import { o as updateEntireDatabase, r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/company/notifications/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const [companiesData, notificationsData] = await Promise.all([getCollection("companies"), getCollection("notifications")]);
	const db = {
		companies: companiesData,
		notifications: notificationsData
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	const companyNotifications = db.notifications.filter((n) => n.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase());
	let changed = false;
	companyNotifications.forEach((n) => {
		if (!n.read) {
			n.read = true;
			changed = true;
		}
	});
	if (changed) await updateEntireDatabase(db);
	return { notifications: companyNotifications };
}
//#endregion
export { load };
