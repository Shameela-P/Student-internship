import { n as getCollection } from "../../chunks/db.js";
import { r as getSessionUser } from "../../chunks/auth.js";
//#region src/routes/+page.server.js
async function load({ cookies }) {
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		internships: await getCollection("internships"),
		applications: await getCollection("applications")
	};
	const user = getSessionUser(cookies);
	const activeInternships = db.internships.filter((i) => i.status === "Active").length;
	const registeredCompanies = db.companies.filter((c) => c.status === "Approved").length;
	const totalStudents = db.students.length;
	const successfulPlacements = db.applications.filter((a) => a.status === "Approved").length;
	const featured = db.internships.filter((i) => i.status === "Active").slice(-4).map((internship) => {
		const company = db.companies.find((c) => c.id === internship.companyId);
		return {
			...internship,
			companyName: company ? company.companyName : "Unknown Company",
			companyLogo: company ? company.companyLogo : ""
		};
	});
	const categories = [
		{
			name: "Software & IT",
			type: "software",
			count: db.internships.filter((i) => i.domain && i.status === "Active" && db.companies.find((c) => c.id === i.companyId && c.industryType === "Software & IT")).length || 4
		},
		{
			name: "Engineering",
			type: "engineering",
			count: db.internships.filter((i) => i.domain && i.status === "Active" && db.companies.find((c) => c.id === i.companyId && c.industryType === "Engineering")).length || 1
		},
		{
			name: "Commerce & Finance",
			type: "finance",
			count: db.internships.filter((i) => i.domain && i.status === "Active" && db.companies.find((c) => c.id === i.companyId && c.industryType === "Commerce & Finance")).length || 1
		},
		{
			name: "Business & Management",
			type: "business",
			count: db.internships.filter((i) => i.domain && i.status === "Active" && db.companies.find((c) => c.id === i.companyId && c.industryType === "Business & Management")).length || 0
		}
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
//#endregion
export { load };
