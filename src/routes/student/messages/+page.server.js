import { getCollection, addDocument, updateDocument } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);
	const [studentsData, companiesData, messagesData, notificationsData] = await Promise.all([
		getCollection('students'),
		getCollection('companies'),
		getCollection('messages'),
		getCollection('notifications')
	]);
	const db = { students: studentsData, companies: companiesData, messages: messagesData, notifications: notificationsData };
	const student = db.students.find(s => s.id === sessionUser.id);

	if (!db.messages) {
		db.messages = [];
	}

	// Filter messages involving this student
	const userMessages = db.messages.filter(m => 
		m.senderEmail.toLowerCase() === student.email.toLowerCase() || 
		m.recipientEmail.toLowerCase() === student.email.toLowerCase()
	);

	// Automatically mark incoming messages as read
	for (const m of db.messages) {
		if (m.recipientEmail.toLowerCase() === student.email.toLowerCase() && !m.read) {
			m.read = true;
			await updateDocument('messages', m.id, { read: true });
		}
	}

	// Contacts list: All verified companies + Admin Support
	const companies = db.companies.filter(c => c.status === 'Approved' && !c.isSuspended)
		.slice(0, 100)
		.map(c => ({
			name: c.companyName,
			email: c.companyEmail,
			role: 'company'
		}));

	const contacts = [
		{ name: 'Nexora Admin Support', email: 'admin@nexora.com', role: 'admin' },
		...companies
	];

	return {
		student,
		messages: userMessages,
		contacts
	};
}

export const actions = {
	sendMessage: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['student']);
		const [studentsData, companiesData, messagesData, notificationsData] = await Promise.all([
			getCollection('students'),
			getCollection('companies'),
			getCollection('messages'),
			getCollection('notifications')
		]);
		const db = { students: studentsData, companies: companiesData, messages: messagesData, notifications: notificationsData };
		const student = db.students.find(s => s.id === sessionUser.id);

		const formData = await request.formData();
		const recipientEmail = formData.get('recipientEmail')?.toString().trim();
		const recipientRole = formData.get('recipientRole')?.toString().trim();
		const recipientName = formData.get('recipientName')?.toString().trim();
		const content = formData.get('content')?.toString().trim();

		if (!recipientEmail || !recipientRole || !content) {
			return fail(400, { success: false, error: 'Recipient details or content is required' });
		}

		const newMessage = {
			id: `msg_${Date.now()}`,
			senderEmail: student.email,
			senderRole: 'student',
			senderName: student.fullName,
			recipientEmail,
			recipientRole,
			recipientName: recipientName || 'User',
			content: content,
			timestamp: new Date().toISOString(),
			read: false
		};

		await addDocument('messages', newMessage);
		await addDocument('notifications', {
			id: 'notif_' + Date.now(),
			recipientEmail,
			recipientRole: recipientRole,
			subject: 'New Message from ' + newMessage.senderName,
			body: 'You received a new message: "' + content.substring(0, 50) + '..."',
			date: new Date().toISOString(),
			read: false
		});

		return { success: true };
	}
};
