import { getDocument, queryDocumentsPaginated } from '$lib/db';

export async function load({ url }) {
    // Only load latest 100 active internships to prevent OOM
	const internships = await queryDocumentsPaginated('internships', 'status', 'Active', 100);

	// Join with company details by fetching only the needed companies
    const companyIds = [...new Set(internships.map(i => i.companyId))];
    const companiesArray = await Promise.all(companyIds.map(id => getDocument('companies', id)));
    const companiesMap = Object.fromEntries(companiesArray.filter(Boolean).map(c => [c.id, c]));

	const activeInternships = internships.map(i => {
        const company = companiesMap[i.companyId];
        return {
            ...i,
            companyName: company ? company.companyName : 'Verified Employer'
        };
    });

	return {
		internships: activeInternships
	};
}
