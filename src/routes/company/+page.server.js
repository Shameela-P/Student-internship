import { getDocument, queryDocuments } from '$lib/db';
import { requireRole } from '$lib/auth';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['company']);
		
		// 1. Fetch Company Profile directly (critical layout/config data)
		const company = await getDocument('companies', sessionUser.id);
		if (!company) throw new Error("Company profile not found");

		// Defer heavy dashboard queries to prevent blocking Vercel SSR rendering
		return {
			company,
			lazy: {
				dashboardData: (async () => {
					const postedInternships = await queryDocuments('internships', 'companyId', company.id);
					const internshipIds = postedInternships.map(i => i.id);

					// Query applications for these specific internships concurrently
					const applicationsPromises = internshipIds.map(id => queryDocuments('applications', 'internshipId', id));
					const applicationsResults = await Promise.all(applicationsPromises);
					let companyApps = applicationsResults.flat();

					// Resolve Student Profiles for these applications
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
					companyApps.reverse();

					const activePostingsCount = postedInternships.filter(i => i.status === 'Active').length;
					const totalAppsCount = companyApps.length;
					const pendingCount = companyApps.filter(a => a.status === 'Pending').length;
					const shortlistedCount = companyApps.filter(a => a.status === 'Shortlisted').length;
					const approvedCount = companyApps.filter(a => a.status === 'Approved').length;
					const rejectedCount = companyApps.filter(a => a.status === 'Rejected').length;

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

					const recentApplications = companyApps.slice(0, 5);

					return {
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
				})()
			}
		};
	} catch (err) {
		console.error('Vercel Load Error:', err);
		throw error(500, err.message || 'Internal Server Error fetching company dashboard');
	}
}
