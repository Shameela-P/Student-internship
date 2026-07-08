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

	// Defer unread counts to prevent blocking page render
	return {
		user: sessionUser,
		company,
		pendingApproval: company.status === 'Pending',
		lazy: {
			unreadNotifications: (async () => {
				const unreadNotifs = await queryDocuments('notifications', 'recipientEmail', company.companyEmail);
				return unreadNotifs.filter(n => !n.read).length;
			})(),
			unreadMessages: (async () => {
				const unreadMsgs = await queryDocuments('messages', 'recipientEmail', company.companyEmail);
				return unreadMsgs.filter(m => !m.read).length;
			})()
		}
	};
}
