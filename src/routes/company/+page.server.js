import { getDocument, queryDocuments, getCollection } from '$lib/db';
import { requireRole } from '$lib/auth';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['company']);
		
		// 1. Fetch Company Profile directly
		const company = await getDocument('companies', sessionUser.id);
		if (!company) throw new Error("Company profile not found");

		// 2. Query only internships posted by this company
		const postedInternships = await queryDocuments('internships', 'companyId', company.id);
		const internshipIds = postedInternships.map(i => i.id);

		// 3. Query applications for these specific internships concurrently
		const applicationsPromises = internshipIds.map(id => queryDocuments('applications', 'internshipId', id));
		const applicationsResults = await Promise.all(applicationsPromises);
		let companyApps = applicationsResults.flat();

		// 4. Resolve Student Profiles for these applications
		const studentIds = [...new Set(companyApps.map(a => a.studentId))];
		const studentPromises = studentIds.map(id => getDocument('students', id));
		const studentsArray = await Promise.all(studentPromises);
		const studentsMap = Object.fromEntries(studentsArray.filter(Boolean).map(s => [s.id, s]));

		companyApps = companyApps.map(app => {
			const student = studentsMap[app.studentId];
			const internship = postedInternships.find(i => i.id === app.internshipId);
			return {
				...app,
				studentName: student ? student.fullName : 'Blocked Student',
				studentCollege: student ? student.collegeName : 'N/A',
				studentDepartment: student ? student.department : 'N/A',
				internshipTitle: internship ? internship.title : 'Deleted Internship',
				domain: internship ? internship.domain : 'N/A'
			};
		});

		// Sort applications: newest first
		companyApps.reverse();

		// Calculate counts
		const activePostingsCount = postedInternships.filter(i => i.status === 'Active').length;
		const totalAppsCount = companyApps.length;
		const pendingCount = companyApps.filter(a => a.status === 'Pending').length;
		const shortlistedCount = companyApps.filter(a => a.status === 'Shortlisted').length;
		const approvedCount = companyApps.filter(a => a.status === 'Approved').length;
		const rejectedCount = companyApps.filter(a => a.status === 'Rejected').length;

		// Build chart data: number of applications per active internship (limit to top 5)
		const barChartData = postedInternships
			.filter(i => i.status === 'Active')
			.map(internship => {
				const count = companyApps.filter(a => a.internshipId === internship.id).length;
				return {
					title: internship.title.length > 20 ? internship.title.slice(0, 18) + '..' : internship.title,
					value: count
				};
			})
			.slice(0, 5);

		// Get 5 most recent applications
		const recentApplications = companyApps.slice(0, 5);

		return {
			company,
			stats: {
				activePostings: activePostingsCount,
				totalApplications: totalAppsCount,
				pendingApplications: pendingCount,
				shortlistedCandidates: shortlistedCount,
				approvedHires: approvedCount,
				rejectedApplications: rejectedCount
			},
			barChartData,
			recentApplications
		};
	} catch (err) {
		console.error('Vercel Load Error:', err);
		throw error(500, err.message || 'Internal Server Error fetching company dashboard');
	}
}
