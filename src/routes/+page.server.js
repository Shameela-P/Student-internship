import { getCollection } from '$lib/db';
import { getSessionUser } from '$lib/auth';

export async function load({ cookies }) {
	const user = getSessionUser(cookies);

	// Fetch stats for the landing page — gracefully handle empty or inaccessible Firebase DB
	let studentsData = [];
	let companiesData = [];
	let internshipsData = [];
	let applicationsData = [];

	try {
		[studentsData, companiesData, internshipsData, applicationsData] = await Promise.all([
			getCollection('students'),
			getCollection('companies'),
			getCollection('internships'),
			getCollection('applications')
		]);
	} catch (err) {
		// Database may be empty or rules not configured yet — degrade gracefully
		console.warn('Landing page: Firebase data unavailable, using empty defaults.', err.message);
	}

	// Calculate statistics (all default to 0 if DB is empty)
	const activeInternships = internshipsData.filter(i => i.status === 'Active').length;
	const registeredCompanies = companiesData.filter(c => c.status === 'Approved').length;
	const totalStudents = studentsData.length;
	const successfulPlacements = applicationsData.filter(a => a.status === 'Approved').length;

	// Fetch 4 featured internships (newest active)
	const featured = internshipsData
		.filter(i => i.status === 'Active')
		.slice(-4)
		.map(internship => {
			const company = companiesData.find(c => c.id === internship.companyId);
			return {
				...internship,
				companyName: company ? company.companyName : 'Unknown Company',
				companyLogo: company ? company.companyLogo : ''
			};
		});

	// Get domain categories summary (fall back to 0 if no data)
	const categories = [
		{ name: 'Software & IT', type: 'software', count: internshipsData.filter(i => i.domain && i.status === 'Active' && companiesData.find(c => c.id === i.companyId && c.industryType === 'Software & IT')).length || 0 },
		{ name: 'Engineering', type: 'engineering', count: internshipsData.filter(i => i.domain && i.status === 'Active' && companiesData.find(c => c.id === i.companyId && c.industryType === 'Engineering')).length || 0 },
		{ name: 'Commerce & Finance', type: 'finance', count: internshipsData.filter(i => i.domain && i.status === 'Active' && companiesData.find(c => c.id === i.companyId && c.industryType === 'Commerce & Finance')).length || 0 },
		{ name: 'Business & Management', type: 'business', count: internshipsData.filter(i => i.domain && i.status === 'Active' && companiesData.find(c => c.id === i.companyId && c.industryType === 'Business & Management')).length || 0 }
	];

	return {
		user,
		stats: {
			activeInternships,
			registeredCompanies,
			totalStudents,
			successfulPlacements
		},
		featured,
		categories
	};
}
