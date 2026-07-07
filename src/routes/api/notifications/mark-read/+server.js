import { json } from '@sveltejs/kit';
import { getCollection, updateEntireDatabase } from '$lib/db';

export async function POST({ request }) {
	try {
		const { id } = await request.json();

		if (!id) {
			return json({ success: false, error: 'Notification ID required' }, { status: 400 });
		}

		const db = {
			notifications: await getCollection('notifications')
		};

		const notifIndex = db.notifications.findIndex(n => n.id === id);
		
		if (notifIndex !== -1 && !db.notifications[notifIndex].read) {
			db.notifications[notifIndex].read = true;
			await updateEntireDatabase({ notifications: db.notifications });
		}

		return json({ success: true });
	} catch (err) {
		console.error('Mark read error:', err);
		return json({ success: false, error: err.message }, { status: 500 });
	}
}
