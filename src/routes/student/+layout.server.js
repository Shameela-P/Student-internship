import { requireRole } from '$lib/auth';
import { getCollection } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);
	const [studentsData, notificationsData, messagesData] = await Promise.all([
		getCollection('students'),
		getCollection('notifications'),
		getCollection('messages')
	]);
	const student = studentsData.find(s => s.id === sessionUser.id);

	if (!student) {
		cookies.delete('nexora_session', { path: '/' });
		throw redirect(303, '/login');
	}

	const unreadNotifications = (notificationsData || []).filter(
		n => n?.recipientEmail?.toLowerCase() === student.email?.toLowerCase() && !n.read
	).length;

	const unreadMessages = (messagesData || []).filter(
		m => m?.recipientEmail?.toLowerCase() === student.email?.toLowerCase() && !m.read
	).length;

	return {
		user: sessionUser,
		student,
		unreadNotifications,
		unreadMessages
	};
}
