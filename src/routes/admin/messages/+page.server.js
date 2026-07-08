import { getCollection, addDocument, updateDocument } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['admin']);
	const [studentsData, companiesData, messagesData] = await Promise.all([
		getCollection('students'),
		getCollection('companies'),
		getCollection('messages')
	]);
	const db = { students: studentsData, companies: companiesData, messages: messagesData };

	if (!db.messages) {
		db.messages = [];
	}

	const adminEmail = 'admin@nexora.com';

	// Filter messages involving admin
	const userMessages = db.messages.filter(m => 
		m.senderEmail.toLowerCase() === adminEmail.toLowerCase() || 
		m.recipientEmail.toLowerCase() === adminEmail.toLowerCase()
	);

	// Automatically mark incoming messages as read
	for (const m of db.messages) {
		if (m.recipientEmail.toLowerCase() === adminEmail.toLowerCase() && !m.read) {
			m.read = true;
			await updateDocument('messages', m.id, { read: true });
		}
	}

	// Contacts list: All approved companies + all non-blocked students
	const companies = db.companies.filter(c => c.status === 'Approved' && !c.isSuspended)
		.slice(0, 100)
		.map(c => ({
			name: c.companyName,
			email: c.companyEmail,
			role: 'company'
		}));

	const students = db.students.filter(s => !s.isBlocked)
		.slice(0, 100)
		.map(s => ({
			name: s.fullName,
			email: s.email,
			role: 'student'
		}));

	const contacts = [
		...companies,
		...students
	];

	return {
		messages: userMessages,
		contacts
	};
}

export const actions = {
	sendMessage: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['admin']);
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
			senderEmail: 'admin@nexora.com',
			senderRole: 'admin',
			senderName: 'Nexora Admin',
			recipientEmail,
			recipientRole,
			recipientName: recipientName || 'User',
			content: content,
			timestamp: new Date().toISOString(),
			read: false
		};

		await addDocument('messages', newMessage);

		return { success: true };
	}
};
