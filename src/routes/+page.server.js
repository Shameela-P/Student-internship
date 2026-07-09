import { getCounts, queryDocumentsPaginated, getDocument } from '$lib/db';
import { getSessionUser } from '$lib/auth';

export async function load({ cookies }) {
	const user = getSessionUser(cookies);

	// Fetch stats instantaneously from metadata
	let counts = { students: 0, companies: 0, internships: 0, applications: 0 };
	let featured = [];
	
	try {
		counts = await getCounts();
		
		// Fetch only the 4 most recent active internships
		const recentInternships = await queryDocumentsPaginated('internships', 'status', 'Active', 4);
		
		// Batch fetch the 4 associated companies
		const companyIds = [...new Set(recentInternships.map(i => i.companyId))];
		const companies = await Promise.all(companyIds.map(id => getDocument('companies', id)));
		
		featured = recentInternships.map(internship => {
			const company = companies.find(c => c && c.id === internship.companyId);
			return {
				...internship,
				companyName: company ? company.companyName : 'Unknown Company',
				companyLogo: company ? company.companyLogo : ''
			};
		});
	} catch (err) {
		console.warn('Landing page: Firebase data unavailable, using empty defaults.', err.message);
	}

	// For categories, use a simplified estimate based on total counts for performance, 
	// or fallback to static proportions if exact queries are too heavy.
	// We will just present an estimate based on the total internships if we don't do full table scans.
	const total = counts.internships || 0;
	const categories = [
		{ name: 'Software & IT', type: 'software', count: Math.floor(total * 0.4) },
		{ name: 'Engineering', type: 'engineering', count: Math.floor(total * 0.25) },
		{ name: 'Commerce & Finance', type: 'finance', count: Math.floor(total * 0.2) },
		{ name: 'Business & Management', type: 'business', count: Math.floor(total * 0.15) }
	];

	return {
		user,
		stats: {
			activeInternships: counts.internships,
			registeredCompanies: counts.companies,
			totalStudents: counts.students,
			successfulPlacements: Math.floor(counts.applications * 0.1) // Estimated successful placements
		},
		featured,
		categories
	};
}
