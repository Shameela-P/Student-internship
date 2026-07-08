import { requireRole } from '$lib/auth';
import { getDocument, queryDocuments } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['company']);
	
	// Fetch only the company document directly — no full collection scan
	const company = await getDocument('companies', sessionUser.id);

	if (!company) {
		cookies.delete('nexora_session', { path: '/' });
		throw redirect(303, '/login');
	}

	if (company.isSuspended) {
		cookies.delete('nexora_session', { path: '/' });
		throw redirect(303, '/login');
	}

	// Query unread counts using indexed queries
	const [unreadNotifs, unreadMsgs] = await Promise.all([
		queryDocuments('notifications', 'recipientEmail', company.companyEmail),
		queryDocuments('messages', 'recipientEmail', company.companyEmail)
	]);

	const unreadNotifications = unreadNotifs.filter(n => !n.read).length;
	const unreadMessages = unreadMsgs.filter(m => !m.read).length;

	return {
		user: sessionUser,
		company,
		pendingApproval: company.status === 'Pending',
		unreadNotifications,
		unreadMessages
	};
}
