import { getCollection } from '$lib/db';

export async function load() {
	const companies = await getCollection('companies');
	
	// Only expose approved, non-suspended companies for public browsing
	const approvedCompanies = companies
		.filter(c => c.status === 'Approved' && !c.isSuspended)
		.map(c => ({
			id: c.id,
			companyName: c.companyName,
			industryType: c.industryType,
			website: c.website,
			companyAddress: c.companyAddress,
			companyDescription: c.companyDescription,
			createdAt: c.createdAt
		}));

	return {
		companies: approvedCompanies
	};
}
