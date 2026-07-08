import { logAction, getCollection, updateEntireDatabase, updateDocument } from '$lib/db';
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
					const [studentsData, companiesData, internshipsData, applicationsData, systemLogsData] = await Promise.all([
						getCollection('students'),
						getCollection('companies'),
						getCollection('internships'),
						getCollection('applications'),
						getCollection('systemLogs')
					]);

					const totalStudents = studentsData.length;
					const totalCompanies = companiesData.length;
					const pendingCompanies = companiesData.filter(c => c.status === 'Pending');
					const activeInternships = internshipsData.filter(i => i.status === 'Active').length;
					const totalApplications = applicationsData.length;
					
					const placementsCount = applicationsData.filter(a => a.status === 'Approved').length;
					const certificatesGenerated = applicationsData.filter(a => a.certificateHash).length;

					// Active companies for moderation (limit to 100 for memory)
					const activeCompanies = companiesData.filter(c => c.status === 'Approved' && !c.isSuspended).slice(0, 100).map(c => ({
						id: c.id,
						companyName: c.companyName,
						companyEmail: c.companyEmail,
						industryType: c.industryType
					}));

					// Audit Logs stream (only top 30)
					const logs = systemLogsData.slice(0, 30);

					return {
						stats: {
							totalStudents,
							totalCompanies,
							pendingCompaniesCount: pendingCompanies.length,
							activeInternships,
							totalApplications,
							successfulPlacements: placementsCount,
							certificatesGenerated
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
						logs
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
