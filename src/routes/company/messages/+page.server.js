import { getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['company']);
	const [studentsData, companiesData, internshipsData, applicationsData, messagesData] = await Promise.all([
		getCollection('students'),
		getCollection('companies'),
		getCollection('internships'),
		getCollection('applications'),
		getCollection('messages'),
		getCollection('notifications')
	]);
	const db = { students: studentsData, companies: companiesData, internships: internshipsData, applications: applicationsData, messages: messagesData, notifications: notificationsData };
	const company = db.companies.find(c => c.id === sessionUser.id);

	if (!db.messages) {
		db.messages = [];
	}

	// Filter messages involving this company
	const userMessages = db.messages.filter(m => 
		m.senderEmail.toLowerCase() === company.companyEmail.toLowerCase() || 
		m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase()
	);

	// Automatically mark incoming messages as read
	let dbChanged = false;
	db.messages.forEach(m => {
		if (m.recipientEmail.toLowerCase() === company.companyEmail.toLowerCase() && !m.read) {
			m.read = true;
			dbChanged = true;
		}
	});
	if (dbChanged) {
		await updateEntireDatabase(db);
	}

	// Contacts list: Students who have applied to this company's internships + Admin Support
	const companyInternshipIds = db.internships
		.filter(i => i.companyId === company.id)
		.map(i => i.id);

	const appliedStudentIds = Array.from(
		new Set(
			db.applications
				.filter(a => companyInternshipIds.includes(a.internshipId))
				.map(a => a.studentId)
		)
	);

	const applicants = db.students
		.filter(s => appliedStudentIds.includes(s.id) && !s.isBlocked)
		.map(s => ({
			name: s.fullName,
			email: s.email,
			role: 'student'
		}));

	const contacts = [
		{ name: 'Nexora Admin Support', email: 'admin@nexora.com', role: 'admin' },
		...applicants
	];

	return {
		company,
		messages: userMessages,
		contacts
	};
}

export const actions = {
	sendMessage: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const [studentsData, companiesData, internshipsData, applicationsData, messagesData] = await Promise.all([
		getCollection('students'),
		getCollection('companies'),
		getCollection('internships'),
		getCollection('applications'),
		getCollection('messages'),
		getCollection('notifications')
	]);
	const db = { students: studentsData, companies: companiesData, internships: internshipsData, applications: applicationsData, messages: messagesData, notifications: notificationsData };
		const company = db.companies.find(c => c.id === sessionUser.id);

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
			senderEmail: company.companyEmail,
			senderRole: 'company',
			senderName: company.companyName,
			recipientEmail,
			recipientRole,
			recipientName: recipientName || 'User',
			content: content,
			timestamp: new Date().toISOString(),
			read: false
		};

		db.messages.push(newMessage);
		if (!db.notifications) db.notifications = [];
		db.notifications.unshift({
			id: 'notif_' + Date.now(),
			recipientEmail,
			recipientRole: recipientRole,
			subject: 'New Message from ' + newMessage.senderName,
			body: 'You received a new message: "' + content.substring(0, 50) + '..."',
			date: new Date().toISOString(),
			read: false
		});

		await updateEntireDatabase(db);

		return { success: true };
	}
};
