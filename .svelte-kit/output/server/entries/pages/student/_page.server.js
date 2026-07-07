import { r as getCollection } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
//#region src/routes/student/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
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
	const student = db.students.find((s) => s.id === sessionUser.id);
	const studentApps = db.applications.filter((a) => a.studentId === student.id).map((app) => {
		const internship = db.internships.find((i) => i.id === app.internshipId);
		const company = internship ? db.companies.find((c) => c.id === internship.companyId) : null;
		return {
			...app,
			internshipTitle: internship ? internship.title : "Deleted Internship",
			domain: internship ? internship.domain : "N/A",
			companyName: company ? company.companyName : "Unknown Company",
			companyLogo: company ? company.companyLogo : "",
			duration: internship ? internship.duration : "N/A",
			mode: internship ? internship.mode : "N/A"
		};
	});
	studentApps.reverse();
	const totalApplied = studentApps.length;
	const pendingCount = studentApps.filter((a) => a.status === "Pending" || a.status === "Shortlisted").length;
	const approvedCount = studentApps.filter((a) => a.status === "Approved").length;
	const rejectedCount = studentApps.filter((a) => a.status === "Rejected").length;
	const certificatesCount = studentApps.filter((a) => a.status === "Approved" && a.certificateHash).length;
	const studentSkills = student.skills.map((s) => s.toLowerCase());
	const recommendations = db.internships.filter((internship) => {
		if (internship.status !== "Active") return false;
		return !db.applications.some((a) => a.studentId === student.id && a.internshipId === internship.id);
	}).map((internship) => {
		const company = db.companies.find((c) => c.id === internship.companyId);
		if (!company || company.isSuspended || company.status !== "Approved") return null;
		const requiredSkills = internship.skillsRequired.map((s) => s.toLowerCase());
		let matchedCount = 0;
		requiredSkills.forEach((reqSkill) => {
			if (studentSkills.some((studSkill) => studSkill.includes(reqSkill) || reqSkill.includes(studSkill))) matchedCount++;
		});
		let matchScore = 0;
		if (requiredSkills.length > 0) matchScore = Math.round(matchedCount / requiredSkills.length * 100);
		else matchScore = 50;
		if (student.department && internship.domain.toLowerCase().includes(student.department.toLowerCase())) matchScore += 20;
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
	}).filter(Boolean).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
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
}
//#endregion
export { load };
