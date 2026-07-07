import { getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);
	const db = {
		students: await getCollection('students'),
		companies: await getCollection('companies'),
		messages: await getCollection('messages')
	};
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
	let dbChanged = false;
	db.messages.forEach(m => {
		if (m.recipientEmail.toLowerCase() === student.email.toLowerCase() && !m.read) {
			m.read = true;
			dbChanged = true;
		}
	});
	if (dbChanged) {
		await updateEntireDatabase(db);
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
		const db = {
		students: await getCollection('students'),
		companies: await getCollection('companies'),
		messages: await getCollection('messages')
	};
		const student = db.students.find(s => s.id === sessionUser.id);

		const formData = await request.formData();
		const recipientEmail = formData.get('recipientEmail')?.toString().trim();
		const recipientRole = formData.get('recipientRole')?.toString().trim();
		const recipientName = formData.get('recipientName')?.toString().trim();
		const content = formData.get('content')?.toString().trim();

		if (!recipientEmail || !recipientRole || !content) {
			return fail(400, { success: false, error: 'Recipient details or content is required' });
		}

		if (!db.messages) {
			db.messages = [];
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

		db.messages.push(newMessage);
		await updateEntireDatabase(db);

		return { success: true };
	}
};
