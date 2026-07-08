import { a as getDocument, s as queryDocuments } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { error } from "@sveltejs/kit";
//#region src/routes/company/+page.server.js
async function load({ cookies }) {
	try {
		const company = await getDocument("companies", requireRole(cookies, ["company"]).id);
		if (!company) throw new Error("Company profile not found");
		const postedInternships = await queryDocuments("internships", "companyId", company.id);
		const applicationsPromises = postedInternships.map((i) => i.id).map((id) => queryDocuments("applications", "internshipId", id));
		let companyApps = (await Promise.all(applicationsPromises)).flat();
		const studentPromises = [...new Set(companyApps.map((a) => a.studentId))].map((id) => getDocument("students", id));
		const studentsArray = await Promise.all(studentPromises);
		const studentsMap = Object.fromEntries(studentsArray.filter(Boolean).map((s) => [s.id, s]));
		companyApps = companyApps.map((app) => {
			const student = studentsMap[app.studentId];
			const internship = postedInternships.find((i) => i.id === app.internshipId);
			return {
				...app,
				studentName: student ? student.fullName : "Blocked Student",
				studentCollege: student ? student.collegeName : "N/A",
				studentDepartment: student ? student.department : "N/A",
				internshipTitle: internship ? internship.title : "Deleted Internship",
				domain: internship ? internship.domain : "N/A"
			};
		});
		companyApps.reverse();
		const activePostingsCount = postedInternships.filter((i) => i.status === "Active").length;
		const totalAppsCount = companyApps.length;
		const pendingCount = companyApps.filter((a) => a.status === "Pending").length;
		const shortlistedCount = companyApps.filter((a) => a.status === "Shortlisted").length;
		const approvedCount = companyApps.filter((a) => a.status === "Approved").length;
		const rejectedCount = companyApps.filter((a) => a.status === "Rejected").length;
		const barChartData = postedInternships.filter((i) => i.status === "Active").map((internship) => {
			const count = companyApps.filter((a) => a.internshipId === internship.id).length;
			return {
				title: internship.title.length > 20 ? internship.title.slice(0, 18) + ".." : internship.title,
				value: count
			};
		}).slice(0, 5);
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
		console.error("Vercel Load Error:", err);
		throw error(500, err.message || "Internal Server Error fetching company dashboard");
	}
}
//#endregion
export { load };
