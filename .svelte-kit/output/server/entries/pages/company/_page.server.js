import { r as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
//#region src/routes/company/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["company"]);
	const [studentsData, companiesData, internshipsData, applicationsData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("internships"),
		getCollection("applications")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		internships: internshipsData,
		applications: applicationsData
	};
	const company = db.companies.find((c) => c.id === sessionUser.id);
	const postedInternships = db.internships.filter((i) => i.companyId === company.id);
	const internshipIds = new Set(postedInternships.map((i) => i.id));
	const companyApps = db.applications.filter((a) => internshipIds.has(a.internshipId)).map((app) => {
		const student = db.students.find((s) => s.id === app.studentId);
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
		const count = db.applications.filter((a) => a.internshipId === internship.id).length;
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
}
//#endregion
export { load };
