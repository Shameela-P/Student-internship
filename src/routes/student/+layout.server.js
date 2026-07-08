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

	// Defer unread counts to prevent blocking page render
	return {
		user: sessionUser,
		student,
		lazy: {
			unreadNotifications: (async () => {
				const unreadNotifs = await queryDocuments('notifications', 'recipientEmail', student.email);
				return unreadNotifs.filter(n => !n.read).length;
			})(),
			unreadMessages: (async () => {
				const unreadMsgs = await queryDocuments('messages', 'recipientEmail', student.email);
				return unreadMsgs.filter(m => !m.read).length;
			})()
		}
	};
}
