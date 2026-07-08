import { logAction, DOMAINS, getDocument, queryDocuments, updateDocument, addDocument, deleteDocument } from '$lib/db';
import { requireRole } from '$lib/auth';
import { buildInternshipPayload } from '$lib/internship-utils';
import { fail } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ['company']);
	
	// Optimized: fetch company profile and their internships using targeted queries
	const [company, companyInternships] = await Promise.all([
		getDocument('companies', sessionUser.id),
		queryDocuments('internships', 'companyId', sessionUser.id)
	]);

	return {
		company,
		internships: companyInternships,
		domains: DOMAINS
	};
}

export const actions = {
	postInternship: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const company = await getDocument('companies', sessionUser.id);

		// Account approval gate
		if (company.status !== 'Approved') {
			return fail(403, { success: false, error: 'Your corporate profile must be approved by an administrator before posting new opportunities' });
		}

		const formData = await request.formData();
		const title = formData.get('title')?.toString().trim();
		const domain = formData.get('domain')?.toString();
		const subCategory = formData.get('subCategory')?.toString().trim();
		const skillsRaw = formData.get('skillsRequired')?.toString().trim();
		const description = formData.get('description')?.toString().trim();
		const learningOutcomes = formData.get('learningOutcomes')?.toString().trim();
		const responsibilities = formData.get('responsibilities')?.toString().trim();
		const eligibilityCriteria = formData.get('eligibilityCriteria')?.toString().trim();
		const duration = formData.get('duration')?.toString();
		const startDate = formData.get('startDate')?.toString();
		const lastDateToApply = formData.get('lastDateToApply')?.toString();
		const mode = formData.get('mode')?.toString(); // Online | Offline | Hybrid
		const type = formData.get('type')?.toString(); // Free | Paid | Free + Stipend | Paid + Stipend
		const fee = parseFloat(formData.get('fee')?.toString() || '0');
		const stipendAmount = parseFloat(formData.get('stipendAmount')?.toString() || '0');
		const openings = parseInt(formData.get('openings')?.toString() || '1');
		const location = formData.get('location')?.toString().trim();
		const certificateAvailable = formData.get('certificateAvailable')?.toString() || 'No';
		const jobOpportunity = formData.get('jobOpportunity')?.toString() || 'No';
		
		const bannerFile = formData.get('banner');

		// Validations
		if (!title || !domain || !subCategory || !skillsRaw || !description || !responsibilities || !eligibilityCriteria || !duration || !startDate || !lastDateToApply || !mode || !type || !location) {
			return fail(400, { success: false, error: 'Please populate all required details' });
		}

		// Internship Fee Maximum validation (Requirement: Maximum ₹6500)
		if ((type.includes('Paid')) && fee > 6500) {
			return fail(400, { success: false, error: 'Registration and program fees must not exceed ₹6,500' });
		}
		if ((type.includes('Paid')) && fee < 0) {
			return fail(400, { success: false, error: 'Registration fee cannot be negative' });
		}

		// Date Validation
		if (new Date(startDate) <= new Date(lastDateToApply)) {
			return fail(400, { success: false, error: 'Internship start date must be after the last date to apply' });
		}

		// Handle Banner Upload
		let bannerPath = '';
		if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
			const ext = path.extname(bannerFile.name) || '.jpg';
			const filename = `banner_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
			const dest = path.resolve('uploads/banners', filename);
			
			try {
				if (!fs.existsSync(path.resolve('uploads/banners'))) {
					fs.mkdirSync(path.resolve('uploads/banners'), { recursive: true });
				}
				const buffer = Buffer.from(await bannerFile.arrayBuffer());
				fs.writeFileSync(dest, buffer);
				bannerPath = filename;
			} catch (err) {
				console.error('Banner upload error:', err);
				return fail(500, { success: false, error: 'Failed to save banner image' });
			}
		}

		const newInternship = buildInternshipPayload({
			companyId: company.id,
			bannerPath,
			formValues: {
				title,
				domain,
				subCategory,
				skillsRequired: skillsRaw,
				description,
				learningOutcomes,
				responsibilities,
				eligibilityCriteria,
				duration,
				startDate,
				lastDateToApply,
				mode,
				type,
				fee,
				stipendAmount,
				openings,
				location,
				certificateAvailable,
				jobOpportunity
			}
		});

		await addDocument('internships', newInternship);
		await logAction('INTERNSHIP_CREATE', `Company ${company.companyName} posted new internship: "${title}" (ID: ${newInternship.id})`);

		return { success: true, message: 'Internship opportunity published successfully' };
	},

	editInternship: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const company = await getDocument('companies', sessionUser.id);

		const formData = await request.formData();
		const id = formData.get('id')?.toString();
		const title = formData.get('title')?.toString().trim();
		const domain = formData.get('domain')?.toString();
		const subCategory = formData.get('subCategory')?.toString().trim();
		const skillsRaw = formData.get('skillsRequired')?.toString().trim();
		const description = formData.get('description')?.toString().trim();
		const learningOutcomes = formData.get('learningOutcomes')?.toString().trim();
		const responsibilities = formData.get('responsibilities')?.toString().trim();
		const eligibilityCriteria = formData.get('eligibilityCriteria')?.toString().trim();
		const duration = formData.get('duration')?.toString();
		const startDate = formData.get('startDate')?.toString();
		const lastDateToApply = formData.get('lastDateToApply')?.toString();
		const mode = formData.get('mode')?.toString();
		const type = formData.get('type')?.toString();
		const fee = parseFloat(formData.get('fee')?.toString() || '0');
		const stipendAmount = parseFloat(formData.get('stipendAmount')?.toString() || '0');
		const openings = parseInt(formData.get('openings')?.toString() || '1');
		const location = formData.get('location')?.toString().trim();
		const certificateAvailable = formData.get('certificateAvailable')?.toString() || 'No';
		const jobOpportunity = formData.get('jobOpportunity')?.toString() || 'No';
		
		const bannerFile = formData.get('banner');

		if (!id || !title || !domain || !subCategory || !skillsRaw || !description || !responsibilities || !eligibilityCriteria || !duration || !startDate || !lastDateToApply || !mode || !type || !location) {
			return fail(400, { success: false, error: 'Please populate all fields' });
		}

		if ((type.includes('Paid')) && fee > 6500) {
			return fail(400, { success: false, error: 'Registration and program fees must not exceed ₹6,500' });
		}
		if ((type.includes('Paid')) && fee < 0) {
			return fail(400, { success: false, error: 'Registration fee cannot be negative' });
		}

		// Date Validation
		if (new Date(startDate) <= new Date(lastDateToApply)) {
			return fail(400, { success: false, error: 'Internship start date must be after the last date to apply' });
		}

		const internshipIndex = 0; // kept for compatibility — we use updateDocument instead
		const existingInternship = await getDocument('internships', id);
		if (!existingInternship || existingInternship.companyId !== company.id) {
			return fail(404, { success: false, error: 'Internship posting not found' });
		}

		// Handle Banner Upload on Edit
		let bannerPath = existingInternship.bannerPath || '';
		if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
			const ext = path.extname(bannerFile.name) || '.jpg';
			const filename = `banner_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
			const dest = path.resolve('uploads/banners', filename);
			
			try {
				if (!fs.existsSync(path.resolve('uploads/banners'))) {
					fs.mkdirSync(path.resolve('uploads/banners'), { recursive: true });
				}
				const buffer = Buffer.from(await bannerFile.arrayBuffer());
				fs.writeFileSync(dest, buffer);
				bannerPath = filename;
			} catch (err) {
				console.error('Banner upload error on edit:', err);
			}
		}

		const updatedPayload = buildInternshipPayload({
			companyId: company.id,
			bannerPath,
			existingId: id,
			formValues: {
				title,
				domain,
				subCategory,
				skillsRequired: skillsRaw,
				description,
				learningOutcomes,
				responsibilities,
				eligibilityCriteria,
				duration,
				startDate,
				lastDateToApply,
				mode,
				type,
				fee,
				stipendAmount,
				openings,
				location,
				certificateAvailable,
				jobOpportunity
			}
		});

		await updateDocument('internships', id, updatedPayload);
		await logAction('INTERNSHIP_EDIT', `Company ${company.companyName} updated internship details for "${title}" (ID: ${id})`);

		return { success: true, message: 'Internship details updated successfully' };
	},

	deleteInternship: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const formData = await request.formData();
		const id = formData.get('id')?.toString();

		if (!id) {
			return fail(400, { success: false, error: 'Reference ID is missing' });
		}

		// Verify ownership before deleting
		const internship = await getDocument('internships', id);
		if (!internship || internship.companyId !== sessionUser.id) {
			return fail(404, { success: false, error: 'Internship listing not found' });
		}

		const deletedTitle = internship.title;
		await deleteDocument('internships', id);
		await logAction('INTERNSHIP_DELETE', `Company ID ${sessionUser.id} deleted internship: "${deletedTitle}" (ID: ${id})`);

		return { success: true, message: 'Internship posting removed successfully' };
	},

	archiveInternship: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ['company']);
		const formData = await request.formData();
		const id = formData.get('id')?.toString();

		if (!id) {
			return fail(400, { success: false, error: 'Reference ID is missing' });
		}

		// Verify ownership before archiving
		const internship = await getDocument('internships', id);
		if (!internship || internship.companyId !== sessionUser.id) {
			return fail(404, { success: false, error: 'Internship listing not found' });
		}

		await updateDocument('internships', id, { status: 'Archived' });
		await logAction('INTERNSHIP_ARCHIVE', `Company ID ${sessionUser.id} archived internship: "${internship.title}" (ID: ${id})`);

		return { success: true, message: 'Internship archived successfully' };
	}
};
