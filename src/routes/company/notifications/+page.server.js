import { getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['company']);
	const [companiesData, notificationsData] = await Promise.all([
		getCollection('companies'),
		getCollection('notifications')
	]);
	const db = { companies: companiesData, notifications: notificationsData };
	const company = db.companies.find(c => c.id === sessionUser.id);

	// Load notifications matching company email
	const companyNotifications = db.notifications.filter(
		n => n.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase()
	);

	// Mark all as read
	let changed = false;
	companyNotifications.forEach(n => {
		if (!n.read) {
			n.read = true;
			changed = true;
		}
	});

	if (changed) {
		await updateEntireDatabase(db);
	}

	return {
		notifications: companyNotifications
	};
}
