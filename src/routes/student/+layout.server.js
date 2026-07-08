import { requireRole } from '$lib/auth';
import { getDocument, queryDocuments } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);

	// Fetch only the student document directly — no full collection scan
	const student = await getDocument('students', sessionUser.id);

	if (!student) {
		cookies.delete('nexora_session', { path: '/' });
		throw redirect(303, '/login');
	}

	// Query unread counts using indexed queries
	const [unreadNotifs, unreadMsgs] = await Promise.all([
		queryDocuments('notifications', 'recipientEmail', student.email),
		queryDocuments('messages', 'recipientEmail', student.email)
	]);

	const unreadNotifications = unreadNotifs.filter(n => !n.read).length;
	const unreadMessages = unreadMsgs.filter(m => !m.read).length;

	return {
		user: sessionUser,
		student,
		unreadNotifications,
		unreadMessages
	};
}
