import { fail, redirect } from '@sveltejs/kit';
import { logAction, getCollection, updateEntireDatabase, addDocument, queryDocumentsPaginated, getDocument } from '$lib/db';
import { hashPassword, createToken } from '$lib/auth';
import { uploadFileBuffer } from '$lib/storageHelper';
import path from 'path';

import { verifyToken } from '$lib/auth';

export async function load({ url, cookies }) {
	const sessionCookie = cookies.get('nexora_session');
	if (sessionCookie) {
		const session = verifyToken(sessionCookie);
		if (session) {
			throw redirect(303, `/${session.role}`);
		}
	}

	const role = url.searchParams.get('role') || 'student';
	return {
		role
	};
}

export const actions = {
	registerStudent: async ({ request, cookies }) => {
		const formData = await request.formData();
		
		const fullName = formData.get('fullName')?.toString().trim();
		const email = formData.get('email')?.toString().trim().toLowerCase();
		const mobileNumber = formData.get('mobileNumber')?.toString().trim();
		const password = formData.get('password')?.toString();
		const collegeName = formData.get('collegeName')?.toString().trim();
		const degreeCourse = formData.get('degreeCourse')?.toString().trim();
		const department = formData.get('department')?.toString().trim();
		const yearOfStudy = formData.get('yearOfStudy')?.toString().trim();
		const currentStatus = formData.get('currentStatus')?.toString(); // Student | Graduate
		const skillsRaw = formData.get('skills')?.toString().trim();
		const address = formData.get('address')?.toString().trim();
		const profilePhoto = formData.get('profilePhoto')?.toString().trim() || '';
		const resumeUrl = formData.get('resumeUrl')?.toString().trim();

		// Basic validations
		if (!fullName || !email || !mobileNumber || !password || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address || !resumeUrl) {
			return fail(400, { success: false, error: 'Please fill out all required student profile fields' });
		}

		// URL validation
		try {
			const parsedUrl = new URL(resumeUrl);
			if (parsedUrl.protocol !== 'https:') {
				return fail(400, { success: false, error: 'Resume URL must use a secure HTTPS protocol' });
			}
		} catch (e) {
			return fail(400, { success: false, error: 'Please provide a valid publicly accessible HTTPS Resume URL' });
		}

		const [students, companies, admins, emailTemplatesData] = await Promise.all([
			queryDocumentsPaginated('students', 'email', email, 1),
			queryDocumentsPaginated('companies', 'companyEmail', email, 1),
			queryDocumentsPaginated('admins', 'email', email, 1),
			getCollection('emailTemplates') // small collection, safe to get
		]);
		
		const emailUsed = students.length > 0 || companies.length > 0 || admins.length > 0;
		if (emailUsed) {
			return fail(400, { success: false, error: 'This email is already registered on Nexora' });
		}

		// Format skills array
		const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

		const newStudent = {
			id: `stud_${Date.now()}`,
			fullName,
			email,
			mobileNumber,
			password: hashPassword(password),
			collegeName,
			degreeCourse,
			department,
			yearOfStudy,
			currentStatus,
			skills,
			address,
			profilePhoto,
			resumeUrl,
			isBlocked: false,
			createdAt: new Date().toISOString()
		};

		await addDocument('students', newStudent);

		// Send Automated Email Notification using template
		const template = emailTemplatesData.find(t => t.id === 'temp_student_reg');
		let subject = 'Welcome to Nexora';
		let body = `Hi ${fullName}, welcome to Nexora! Your profile has been registered.`;

		if (template) {
			subject = template.subject;
			body = template.body
				.replace('{name}', fullName)
				.replace('{degree}', degreeCourse)
				.replace('{college}', collegeName);
		}

		await addDocument('notifications', {
			id: `notif_${Date.now()}`,
			recipientEmail: email,
			recipientRole: 'student',
			subject,
			body,
			date: new Date().toISOString(),
			read: false
		});
		logAction('STUDENT_REGISTER', `New student ${fullName} (${email}) registered.`);

		throw redirect(303, '/login?registered=true');
	},

	registerCompany: async ({ request, cookies }) => {
		const formData = await request.formData();

		const companyName = formData.get('companyName')?.toString().trim();
		const companyEmail = formData.get('companyEmail')?.toString().trim().toLowerCase();
		const companyContactNumber = formData.get('companyContactNumber')?.toString().trim();
		const website = formData.get('website')?.toString().trim();
		const companyAddress = formData.get('companyAddress')?.toString().trim();
		const companyDescription = formData.get('companyDescription')?.toString().trim();
		const industryType = formData.get('industryType')?.toString();
		const companyLogo = formData.get('companyLogo')?.toString().trim() || '';
		const password = formData.get('password')?.toString();

		if (!companyName || !companyEmail || !companyContactNumber || !website || !companyAddress || !companyDescription || !industryType || !password) {
			return fail(400, { success: false, error: 'Please fill out all required company profile fields' });
		}

		const [students, companies, admins, emailTemplatesData] = await Promise.all([
			queryDocumentsPaginated('students', 'email', companyEmail, 1),
			queryDocumentsPaginated('companies', 'companyEmail', companyEmail, 1),
			queryDocumentsPaginated('admins', 'email', companyEmail, 1),
			getCollection('emailTemplates')
		]);

		const emailUsed = students.length > 0 || companies.length > 0 || admins.length > 0;
		
		if (emailUsed) {
			return fail(400, { success: false, error: 'This email is already registered on Nexora' });
		}

		const newCompany = {
			id: `comp_${Date.now()}`,
			companyName,
			companyEmail,
			companyContactNumber,
			website,
			companyAddress,
			companyDescription,
			industryType,
			companyLogo,
			password: hashPassword(password),
			status: 'Approved', // Auto-approved for immediate visibility
			isSuspended: false,
			createdAt: new Date().toISOString()
		};

		await addDocument('companies', newCompany);

		// Send Automated Email Notification using template
		const template = emailTemplatesData.find(t => t.id === 'temp_company_reg');
		let subject = 'Nexora Company Application';
		let body = `Dear HR at ${companyName}, your registration is pending review.`;

		if (template) {
			subject = template.subject;
			body = template.body.replace('{companyName}', companyName);
		}

		await addDocument('notifications', {
			id: `notif_${Date.now()}`,
			recipientEmail: companyEmail,
			recipientRole: 'company',
			subject,
			body,
			date: new Date().toISOString(),
			read: false
		});
		logAction('COMPANY_REGISTER', `New company ${companyName} (${companyEmail}) submitted for approval.`);

		throw redirect(303, '/login?registered=true');
	}
};
