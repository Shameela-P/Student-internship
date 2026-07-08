import { getCollection } from '$lib/db';

export async function load() {
	const [internships, companies] = await Promise.all([
		getCollection('internships'),
		getCollection('companies')
	]);

	// Join with company details
	const activeInternships = internships
		.filter(i => i.status === 'Active')
		.map(i => {
			const company = companies.find(c => c.id === i.companyId);
			return {
				...i,
				companyName: company ? company.companyName : 'Verified Employer'
			};
		});

	return {
		internships: activeInternships
	};
}
