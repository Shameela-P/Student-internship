import { i as updateEntireDatabase, n as getCollection } from "../../../../../chunks/db.js";
import { n as markMessagesRead, r as normalizeEmail } from "../../../../../chunks/messages.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/messages/read/+server.js
async function POST({ request }) {
	try {
		const { contactEmail, currentUserEmail } = await request.json();
		if (!contactEmail || !currentUserEmail) return json({ error: "Missing emails" }, { status: 400 });
		const messages = await getCollection("messages");
		const notifications = await getCollection("notifications");
		let changed = false;
		changed = markMessagesRead(messages, currentUserEmail, contactEmail) || changed;
		notifications.forEach((n) => {
			if (normalizeEmail(n.recipientEmail) === normalizeEmail(currentUserEmail) && !n.read && n.subject?.includes("New Message") && n.body?.toLowerCase().includes(normalizeEmail(contactEmail))) {
				n.read = true;
				changed = true;
			}
		});
		if (changed) await updateEntireDatabase({
			messages,
			notifications
		});
		return json({ success: true });
	} catch (err) {
		console.error("Error marking messages as read:", err);
		return json({ error: "Internal server error" }, { status: 500 });
	}
}
//#endregion
export { POST };
