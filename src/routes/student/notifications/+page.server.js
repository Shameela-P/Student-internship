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

	// Do NOT mark all as read immediately.
	// Notifications will be marked as read when the user opens them.

	return {
		notifications: studentNotifications,
		student: { email: student.email }
	};
}
