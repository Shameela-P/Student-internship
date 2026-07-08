import { getDocument, queryDocuments, getCollection } from '$lib/db';
import { requireRole } from '$lib/auth';
import { error } from '@sveltejs/kit';

export async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ['student']);
		
		// 1. Fetch Student Profile directly
		const student = await getDocument('students', sessionUser.id);
		if (!student) throw new Error("Student profile not found");

		// 2. Query only applications submitted by this student
		const rawApps = await queryDocuments('applications', 'studentId', student.id);

		// 3. Resolve Internship and Company details for these applications
		const internshipIds = [...new Set(rawApps.map(a => a.internshipId))];
		const internshipPromises = internshipIds.map(id => getDocument('internships', id));
		const internshipsArray = await Promise.all(internshipPromises);
		const internshipsMap = Object.fromEntries(internshipsArray.filter(Boolean).map(i => [i.id, i]));

		const companyIds = [...new Set(Object.values(internshipsMap).map(i => i.companyId))];
		const companyPromises = companyIds.map(id => getDocument('companies', id));
		const companiesArray = await Promise.all(companyPromises);
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

		// Sort applications: newest first
		studentApps.reverse();

		// Compute Dashboard statistics
		const totalApplied = studentApps.length;
		const pendingCount = studentApps.filter(a => a.status === 'Pending' || a.status === 'Shortlisted').length;
		const approvedCount = studentApps.filter(a => a.status === 'Approved').length;
		const rejectedCount = studentApps.filter(a => a.status === 'Rejected').length;
		const certificatesCount = studentApps.filter(a => a.status === 'Approved' && a.certificateHash).length;

		// 4. Recommendation System (requires scanning active internships, so we must fetch collection, but cache it)
		// To avoid memory blowing up, we could optimize this later by fetching only 'Active' internships if we add an index,
		// but since active internships might be small enough to fit in cache, we'll use getCollection.
		const allInternships = await getCollection('internships');
		const studentSkills = student.skills.map(s => s.toLowerCase());
		
		const recommendationsPromises = allInternships
			.filter(internship => {
				if (internship.status !== 'Active') return false;
				const alreadyApplied = studentApps.some(a => a.internshipId === internship.id);
				return !alreadyApplied;
			})
			.map(async internship => {
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
		const recommendations = rawRecommendations
			.filter(Boolean)
			.sort((a, b) => b.matchScore - a.matchScore)
			.slice(0, 3);

		return {
			student,
			applications: studentApps,
			stats: {
				totalApplied,
				pendingCount,
				approvedCount,
				rejectedCount,
				certificatesCount
			},
			recommendations
		};
	} catch (err) {
		console.error('Vercel Load Error:', err);
		throw error(500, err.message || 'Internal Server Error fetching student dashboard');
	}
}
