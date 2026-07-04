//#region src/lib/messages.js
function normalizeEmail(value = "") {
	return value.trim().toLowerCase();
}
function buildThreadSummaries(messages = [], currentUserEmail = "") {
	const normalizedUserEmail = normalizeEmail(currentUserEmail);
	const map = /* @__PURE__ */ new Map();
	for (const message of messages) {
		const isSender = normalizeEmail(message.senderEmail) === normalizedUserEmail;
		const contactEmail = isSender ? message.recipientEmail : message.senderEmail;
		const contactName = isSender ? message.recipientName : message.senderName;
		const contactRole = isSender ? message.recipientRole : message.senderRole;
		const normalizedContactEmail = normalizeEmail(contactEmail);
		const existing = map.get(normalizedContactEmail);
		const unread = !isSender && !message.read ? 1 : 0;
		if (!existing || new Date(message.timestamp) > new Date(existing.lastTimestamp)) map.set(normalizedContactEmail, {
			email: contactEmail,
			name: contactName || contactEmail,
			role: contactRole || "support",
			lastMessage: message.content || (message.attachmentPath ? "Attachment shared" : ""),
			lastTimestamp: message.timestamp,
			unreadCount: (existing?.unreadCount || 0) + unread
		});
		else if (unread) existing.unreadCount += 1;
	}
	return Array.from(map.values()).sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));
}
function markMessagesRead(messages = [], currentUserEmail = "", contactEmail = "") {
	const normalizedUserEmail = normalizeEmail(currentUserEmail);
	const normalizedContactEmail = normalizeEmail(contactEmail);
	let changed = false;
	for (const message of messages) {
		const isIncoming = normalizeEmail(message.recipientEmail) === normalizedUserEmail;
		if ((normalizedContactEmail ? isIncoming && normalizeEmail(message.senderEmail) === normalizedContactEmail : isIncoming) && !message.read) {
			message.read = true;
			changed = true;
		}
	}
	return changed;
}
//#endregion
export { markMessagesRead as n, normalizeEmail as r, buildThreadSummaries as t };
