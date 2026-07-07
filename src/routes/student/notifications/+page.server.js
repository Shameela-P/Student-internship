import { getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);
	const [studentsData, notificationsData] = await Promise.all([
		getCollection('students'),
		getCollection('notifications')
	]);
	const db = { students: studentsData, notifications: notificationsData };
	const student = db.students.find(s => s.id === sessionUser.id);

	// Get notifications matching student email
	const studentNotifications = db.notifications.filter(
		n => n.recipientEmail.toLowerCase() === student.email.toLowerCase()
	);

	// Mark all as read
	let changed = false;
	studentNotifications.forEach(n => {
		if (!n.read) {
			n.read = true;
			changed = true;
		}
	});

	if (changed) {
		await updateEntireDatabase(db);
	}

	return {
		notifications: studentNotifications
	};
}
