import { getDocument, queryDocuments, getCollection, queryDocumentsPaginated } from '$lib/db';
import { requireRole } from '$lib/auth';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['student']);
		
		// 1. Fetch Student Profile directly (critical config data)
		const student = await getDocument('students', sessionUser.id);
		if (!student) throw new Error("Student profile not found");

		// Defer heavy queries to prevent blocking Vercel SSR rendering
		return {
			student,
			lazy: {
				applications: (async () => {
					const rawApps = await queryDocuments('applications', 'studentId', student.id);
					const internshipIds = [...new Set(rawApps.map(a => a.internshipId))];
					
					// Batch fetch matching internship details
					const internshipsArray = await Promise.all(internshipIds.map(id => getDocument('internships', id)));
					const internshipsMap = Object.fromEntries(internshipsArray.filter(Boolean).map(i => [i.id, i]));

					const companyIds = [...new Set(Object.values(internshipsMap).map(i => i.companyId))];
					// Batch fetch matching company details
					const companiesArray = await Promise.all(companyIds.map(id => getDocument('companies', id)));
					const companiesMap = Object.fromEntries(companiesArray.filter(Boolean).map(c => [c.id, c]));

					const studentApps = rawApps.map(app => {
						const internship = internshipsMap[app.internshipId];
						const company = internship ? companiesMap[internship.companyId] : null;
						return {
							...app,
							internshipTitle: internship ? internship.title : 'Deleted Internship',
							domain: internship ? internship.domain : 'N/A',
							companyName: company ? company.companyName : 'Unknown Company',
							companyLogo: company ? company.companyLogo : '',
							duration: internship ? internship.duration : 'N/A',
							mode: internship ? internship.mode : 'N/A'
						};
					});
					studentApps.reverse();
					return studentApps;
				})(),
				recommendations: (async () => {
					// Use a paginated query to get a slice of active internships for recommendations
					const activeInternships = await queryDocumentsPaginated('internships', 'status', 'Active', 50);
					const studentSkills = student.skills.map(s => s.toLowerCase());
					
					const recommendationsPromises = activeInternships.slice(0, 100).map(async internship => {
						const company = await getDocument('companies', internship.companyId);
						if (!company || company.isSuspended || company.status !== 'Approved') return null;

						const requiredSkills = internship.skillsRequired.map(s => s.toLowerCase());
						let matchedCount = 0;
						
						requiredSkills.forEach(reqSkill => {
							if (studentSkills.some(studSkill => studSkill.includes(reqSkill) || reqSkill.includes(studSkill))) {
								matchedCount++;
							}
						});

						let matchScore = 0;
						if (requiredSkills.length > 0) {
							matchScore = Math.round((matchedCount / requiredSkills.length) * 100);
						} else {
							matchScore = 50;
						}

						const deptMatch = student.department && internship.domain.toLowerCase().includes(student.department.toLowerCase());
						if (deptMatch) {
							matchScore += 20;
						}
						matchScore = Math.min(matchScore, 100);

						return {
							id: internship.id,
							title: internship.title,
							domain: internship.domain,
							companyName: company.companyName,
							mode: internship.mode,
							type: internship.type,
							stipendAmount: internship.stipendAmount,
							lastDateToApply: internship.lastDateToApply,
							matchScore
						};
					});

					const rawRecommendations = await Promise.all(recommendationsPromises);
					return rawRecommendations
						.filter(Boolean)
						.sort((a, b) => b.matchScore - a.matchScore)
						.slice(0, 3);
				})()
			}
		};
	} catch (err) {
		console.error('Vercel Load Error:', err);
		throw error(500, err.message || 'Internal Server Error fetching student dashboard');
	}
}
