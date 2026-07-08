import { logAction, getDocument, queryDocuments, addDocument, updateDocument, getCollection } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';
import crypto from 'crypto';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['company']);

	// Fetch company profile and their internships using targeted queries
	const [company, postedInternships] = await Promise.all([
		getDocument('companies', sessionUser.id),
		queryDocuments('internships', 'companyId', sessionUser.id)
	]);

	const internshipIds = postedInternships.map(i => i.id);

	// Fetch applications for this company's internships concurrently
	const applicationsNested = await Promise.all(internshipIds.map(id => queryDocuments('applications', 'internshipId', id)));
	const rawApps = applicationsNested.flat();

	// Resolve unique students
	const studentIds = [...new Set(rawApps.map(a => a.studentId))];
	const studentsArray = await Promise.all(studentIds.map(id => getDocument('students', id)));
	const studentsMap = Object.fromEntries(studentsArray.filter(Boolean).map(s => [s.id, s]));

	const applications = rawApps.map(app => {
		const student = studentsMap[app.studentId];
		const internship = postedInternships.find(i => i.id === app.internshipId);
		return {
			...app,
			student: student ? {
				id: student.id,
				fullName: student.fullName,
				email: student.email,
				mobileNumber: student.mobileNumber,
				collegeName: student.collegeName,
				degreeCourse: student.degreeCourse,
				department: student.department,
				yearOfStudy: student.yearOfStudy,
				skills: student.skills,
				address: student.address,
				profilePhoto: student.profilePhoto,
				resumePath: student.resumePath
			} : null,
			internshipTitle: internship ? internship.title : 'Deleted Internship',
			domain: internship ? internship.domain : 'N/A'
		};
	});

	// Sort: newest first
	applications.reverse();

	return {
		company,
		applications
	};
}

export const actions = {
	updateStatus: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const formData = await request.formData();
		const appId = formData.get('applicationId')?.toString();
		const newStatus = formData.get('status')?.toString();

		if (!appId || !newStatus) {
			return fail(400, { success: false, error: 'Reference ID and Status are required' });
		}

		// Fetch only what we need using direct queries
		const application = await getDocument('applications', appId);
		if (!application) {
			return fail(404, { success: false, error: 'Application entry not found' });
		}

		const [internship, student] = await Promise.all([
			getDocument('internships', application.internshipId),
			getDocument('students', application.studentId)
		]);

		if (!internship || internship.companyId !== sessionUser.id) {
			return fail(403, { success: false, error: 'Access denied: You do not own this internship posting' });
		}

		if (!student) {
			return fail(404, { success: false, error: 'Applicant student profile not found' });
		}

		// Update application status
		await updateDocument('applications', appId, {
			status: newStatus,
			actionDate: new Date().toISOString()
		});

		// Build and send notification
		const notifId = `notif_${Date.now()}_${newStatus.toLowerCase()}`;
		let subject = '';
		let body = '';

		if (newStatus === 'Approved') {
			subject = `Internship Selection: ${internship.title}`;
			body = `Dear ${student.fullName},\n\nCongratulations! Your application for "${internship.title}" has been APPROVED.\n\nBest regards,\n${sessionUser.name} Recruiting Office`;
			await logAction('APPLICATION_APPROVE', `Company approved application (ID: ${appId}) for student ${student.fullName}.`);
		} else if (newStatus === 'Rejected') {
			subject = `Application Update: ${internship.title}`;
			body = `Dear ${student.fullName},\n\nThank you for your interest in "${internship.title}". We will not be moving forward with your application at this time.\n\nBest regards,\n${sessionUser.name} Recruiting Office`;
			await logAction('APPLICATION_REJECT', `Company rejected application (ID: ${appId}) for student ${student.fullName}.`);
		} else if (newStatus === 'Shortlisted') {
			subject = `Application Shortlisted: ${internship.title}`;
			body = `Dear ${student.fullName},\n\nWe are pleased to inform you that your application for "${internship.title}" has been SHORTLISTED.\n\nBest regards,\n${sessionUser.name} Recruiting Office`;
			await logAction('APPLICATION_SHORTLIST', `Company shortlisted application (ID: ${appId}) for student ${student.fullName}.`);
		} else {
			await logAction('APPLICATION_PENDING', `Company set application (ID: ${appId}) to pending.`);
		}

		if (subject) {
			await addDocument('notifications', {
				id: notifId,
				recipientEmail: student.email,
				recipientRole: 'student',
				subject,
				body,
				date: new Date().toISOString(),
				read: false
			});
		}

		return { success: true };
	},

	issueCertificate: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const formData = await request.formData();
		const appId = formData.get('applicationId')?.toString();

		if (!appId) {
			return fail(400, { success: false, error: 'Reference ID is required' });
		}

		const application = await getDocument('applications', appId);
		if (!application) {
			return fail(404, { success: false, error: 'Application entry not found' });
		}

		const internship = await getDocument('internships', application.internshipId);
		if (!internship || internship.companyId !== sessionUser.id) {
			return fail(403, { success: false, error: 'Access denied: You do not own this internship posting' });
		}

		if (application.status !== 'Approved') {
			return fail(400, { success: false, error: 'Application must be approved before issuing a certificate' });
		}

		if (!application.certificateHash) {
			const uniqueSeed = `${appId}_${application.studentId}_${Date.now()}`;
			const certificateHash = `cert_${crypto.createHash('sha256').update(uniqueSeed).digest('hex').substr(0, 20)}`;

			await updateDocument('applications', appId, {
				certificateHash,
				status: 'Completed'
			});

			await logAction('CERTIFICATE_ISSUE', `Company issued completion certificate for application (ID: ${appId}).`);
		}

		return { success: true };
	}
};
