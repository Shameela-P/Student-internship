import { logAction, getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail } from '@sveltejs/kit';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['student']);
	const db = {
		students: await getCollection('students')
	};
	const student = db.students.find(s => s.id === sessionUser.id);
	return {
		student
	};
}

export const actions = {
	updateProfile: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['student']);
		const formData = await request.formData();

		const fullName = formData.get('fullName')?.toString().trim();
		const mobileNumber = formData.get('mobileNumber')?.toString().trim();
		const collegeName = formData.get('collegeName')?.toString().trim();
		const degreeCourse = formData.get('degreeCourse')?.toString().trim();
		const department = formData.get('department')?.toString().trim();
		const yearOfStudy = formData.get('yearOfStudy')?.toString().trim();
		const currentStatus = formData.get('currentStatus')?.toString();
		const skillsRaw = formData.get('skills')?.toString().trim();
		const address = formData.get('address')?.toString().trim();
		const profilePhoto = formData.get('profilePhoto')?.toString().trim() || '';
		const bio = formData.get('bio')?.toString().trim() || '';

		if (!fullName || !mobileNumber || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address) {
			return fail(400, { success: false, error: 'All fields marked with an asterisk are required' });
		}

		const db = {
			students: await getCollection('students')
		};
		const studentIndex = db.students.findIndex(s => s.id === sessionUser.id);
		if (studentIndex === -1) {
			return fail(404, { success: false, error: 'Student profile not found' });
		}

		const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean);

		db.students[studentIndex] = {
			...db.students[studentIndex],
			fullName,
			mobileNumber,
			collegeName,
			degreeCourse,
			department,
			yearOfStudy,
			currentStatus,
			skills,
			address,
			profilePhoto,
			bio
		};

		await updateEntireDatabase(db);
		logAction('STUDENT_UPDATE_PROFILE', `Student ${fullName} (${sessionUser.email}) updated profile details.`);

		return { success: true, message: 'Profile details saved successfully' };
	},

	updateResume: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['student']);
		const formData = await request.formData();
		const resumeUrl = formData.get('resumeUrl')?.toString().trim();

		if (!resumeUrl) {
			return fail(400, { success: false, error: 'Please provide a valid Resume URL' });
		}

		try {
			const parsedUrl = new URL(resumeUrl);
			if (parsedUrl.protocol !== 'https:') {
				return fail(400, { success: false, error: 'Resume URL must use secure HTTPS protocol' });
			}
		} catch (e) {
			return fail(400, { success: false, error: 'Please provide a valid publicly accessible HTTPS Resume URL' });
		}

		const db = {
			students: await getCollection('students')
		};
		const studentIndex = db.students.findIndex(s => s.id === sessionUser.id);
		if (studentIndex === -1) {
			return fail(404, { success: false, error: 'Student profile not found' });
		}

		db.students[studentIndex].resumeUrl = resumeUrl;
		// Clean up old file upload fields if they exist
		delete db.students[studentIndex].resumePath;
		delete db.students[studentIndex].resumeData;
		delete db.students[studentIndex].resumeName;
		delete db.students[studentIndex].resumeMimeType;
		delete db.students[studentIndex].resumeStoragePath;

		await updateEntireDatabase(db);

		logAction('STUDENT_UPDATE_RESUME', `Student ${db.students[studentIndex].fullName} updated resume URL to ${resumeUrl}.`);
		return { success: true, message: 'Resume URL updated successfully' };
	}
};
