import { logAction, getCollection, updateEntireDatabase, updateDocument, getCounts, getPaginated, queryDocumentsPaginated } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail, error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['admin']);
		
		// Return admin profile synchronously, but defer heavy listings/stats
		return {
			user: sessionUser,
			lazy: {
				dashboardData: (async () => {
					const [counts, pendingCompanies, systemLogsData] = await Promise.all([
						getCounts(),
						queryDocumentsPaginated('companies', 'status', 'Pending', 50),
						getPaginated('systemLogs', 30)
					]);

					// We can fetch a sample of active companies for moderation (e.g. latest 20)
					const activeCompaniesFull = await queryDocumentsPaginated('companies', 'status', 'Approved', 20);
					const activeCompanies = activeCompaniesFull.filter(c => !c.isSuspended).map(c => ({
						id: c.id,
						companyName: c.companyName,
						companyEmail: c.companyEmail,
						industryType: c.industryType
					}));

					return {
						stats: {
							totalStudents: counts.students || 0,
							totalCompanies: counts.companies || 0,
							pendingCompaniesCount: pendingCompanies.length,
							activeInternships: counts.internships || 0,
							totalApplications: counts.applications || 0,
							successfulPlacements: 0, // In a real system, track this in metadata/counts as well
							certificatesGenerated: 0
						},
						verificationQueue: pendingCompanies.map(c => ({
							id: c.id,
							companyName: c.companyName,
							companyEmail: c.companyEmail,
							industryType: c.industryType,
							website: c.website,
							createdAt: c.createdAt
						})),
						activeCompanies,
						logs: systemLogsData
					};
				})()
			}
		};
	} catch (err) {
		console.error('Vercel Load Error:', err);
		throw error(500, err.message || 'Internal Server Error fetching admin dashboard');
	}
}

export const actions = {
	approveCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ['admin']);
			const data = await request.formData();
			const companyId = data.get('companyId')?.toString();

			if (!companyId) return fail(400, { error: 'Company ID is required' });

			await updateDocument('companies', companyId, { status: 'Approved' });
			await logAction('APPROVE_COMPANY', `Approved company registration: ${companyId}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	rejectCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ['admin']);
			const data = await request.formData();
			const companyId = data.get('companyId')?.toString();

			if (!companyId) return fail(400, { error: 'Company ID is required' });

			await updateDocument('companies', companyId, { status: 'Rejected' });
			await logAction('REJECT_COMPANY', `Rejected company registration: ${companyId}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	suspendCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ['admin']);
			const data = await request.formData();
			const companyId = data.get('companyId')?.toString();

			if (!companyId) return fail(400, { error: 'Company ID is required' });

			await updateDocument('companies', companyId, { isSuspended: true });
			await logAction('SUSPEND_COMPANY', `Suspended company account: ${companyId}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	unsuspendCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ['admin']);
			const data = await request.formData();
			const companyId = data.get('companyId')?.toString();

			if (!companyId) return fail(400, { error: 'Company ID is required' });

			await updateDocument('companies', companyId, { isSuspended: false });
			await logAction('UNSUSPEND_COMPANY', `Unsuspended company account: ${companyId}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	}
};
