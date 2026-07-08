import { requireRole } from '$lib/auth';
import { getDocument, queryDocuments } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['admin']);

	// Fetch admin document directly — no full collection scan
	const admin = await getDocument('admins', sessionUser.id);

	if (!admin) {
		cookies.delete('nexora_session', { path: '/' });
		throw redirect(303, '/login');
	}

	// Count unread notifications for admin
	const notifications = await queryDocuments('notifications', 'recipientEmail', admin.email);
	const unreadMessages = notifications.filter(n => !n.read).length;

	return {
		user: sessionUser,
		admin,
		unreadMessages
	};
}
