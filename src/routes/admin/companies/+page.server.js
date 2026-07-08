import { logAction, getCollection, updateDocument } from '$lib/db';
import { requireRole } from '$lib/auth';

export async function load({ cookies }) {
	requireRole(cookies, ['admin']);
	const companiesData = await getCollection('companies');

	// Reverse to show newest first
	const companies = [...companiesData].reverse();

	return {
		companies
	};
}

export const actions = {
	updateStatus: async ({ request, cookies }) => {
		requireRole(cookies, ['admin']);
		const data = await request.formData();
		const companyId = data.get('companyId');
		const newStatus = data.get('status');

		const updates = { status: newStatus };
		if (newStatus === 'Suspended') updates.isSuspended = true;
		else if (newStatus === 'Approved') updates.isSuspended = false;

		await updateDocument('companies', companyId, updates);
		await logAction('UPDATE_COMPANY_STATUS', `Admin changed company ${companyId} status to ${newStatus}`);
		
		return { success: true };
	}
};
