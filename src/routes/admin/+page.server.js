import { logAction, getCollection, updateEntireDatabase } from '$lib/db';
import { requireRole } from '$lib/auth';
import { fail, error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['admin']);
		
		// Optimization: Only fetch what is absolutely required for the dashboard overview.
		// Excluded heavy collections like notifications and emailTemplates.
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
			user: sessionUser,
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
			const companyId = data.get('companyId');

			const companies = await getCollection('companies');
			const companyIndex = companies.findIndex(c => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: 'Company not found' });

			companies[companyIndex].status = 'Approved';
			
			const dbPayload = {
				'companies': companies
			};
			await updateEntireDatabase(dbPayload);
			await logAction('APPROVE_COMPANY', `Approved company registration: ${companies[companyIndex].companyName}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

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
			const companyId = data.get('companyId');

			const companies = await getCollection('companies');
			const companyIndex = companies.findIndex(c => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: 'Company not found' });

			companies[companyIndex].status = 'Rejected';
			
			const dbPayload = {
				'companies': companies
			};
			await updateEntireDatabase(dbPayload);
			await logAction('REJECT_COMPANY', `Rejected company registration: ${companies[companyIndex].companyName}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

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
			const companyId = data.get('companyId');

			const companies = await getCollection('companies');
			const companyIndex = companies.findIndex(c => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: 'Company not found' });

			companies[companyIndex].isSuspended = true;
			
			const dbPayload = {
				'companies': companies
			};
			await updateEntireDatabase(dbPayload);
			await logAction('SUSPEND_COMPANY', `Suspended company account: ${companies[companyIndex].companyName}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

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
			const companyId = data.get('companyId');

			const companies = await getCollection('companies');
			const companyIndex = companies.findIndex(c => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: 'Company not found' });

			companies[companyIndex].isSuspended = false;
			
			const dbPayload = {
				'companies': companies
			};
			await updateEntireDatabase(dbPayload);
			await logAction('UNSUSPEND_COMPANY', `Unsuspended company account: ${companies[companyIndex].companyName}`, sessionUser.name, 'Admin', sessionUser.email, 'Admin Board');

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	}
};
