import { i as updateEntireDatabase, n as getCollection } from "../../../../../chunks/db.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/notifications/read/+server.js
async function POST({ request }) {
	try {
		const { notificationId } = await request.json();
		if (!notificationId) return json({ error: "Missing notificationId" }, { status: 400 });
		const notifications = await getCollection("notifications");
		if (!notifications) return json({ error: "Notifications collection not found" }, { status: 404 });
		const notifIndex = notifications.findIndex((n) => n.id === notificationId);
		if (notifIndex === -1) return json({ error: "Notification not found" }, { status: 404 });
		notifications[notifIndex].read = true;
		await updateEntireDatabase({ notifications });
		return json({ success: true });
	} catch (err) {
		console.error("Error marking notification as read:", err);
		return json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
export { POST };
