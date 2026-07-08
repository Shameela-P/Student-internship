import { getCollection } from '$lib/db';
import { requireRole } from '$lib/auth';
import { error } from '@sveltejs/kit';

export async function load({ cookies, params }) {
	const sessionUser = requireRole(cookies, ['student', 'admin']);
	const companyId = params.id;

	const [companies, internships] = await Promise.all([
		getCollection('companies'),
		getCollection('internships')
	]);

	const company = companies.find(c => c.id === companyId);
	if (!company) {
		throw error(404, 'Company not found');
	}

	// For students, ensure they only see approved companies
	if (sessionUser.role === 'student') {
		if (company.status !== 'Approved' || company.isSuspended) {
			throw error(404, 'Company not available');
		}
	}

	const activeInternships = internships.filter(i => 
		i.companyId === company.id && i.status === 'Active'
	);

	return {
		company,
		internships: activeInternships,
		sessionUser
	};
}
