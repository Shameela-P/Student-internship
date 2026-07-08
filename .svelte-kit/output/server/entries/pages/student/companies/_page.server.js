import { r as getCollection, t as DOMAINS } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/student/companies/+page.server.js
async function load({ cookies, url }) {
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
	if (!student) {
		cookies.delete("nexora_session", { path: "/" });
		throw new Error("Student session not found");
	}
	const searchQuery = url.searchParams.get("query")?.toLowerCase().trim() || "";
	const filterIndustry = url.searchParams.get("industry") || "";
	const filterDomain = url.searchParams.get("domain") || "";
	const filterLocation = url.searchParams.get("location")?.toLowerCase().trim() || "";
	const filterMode = url.searchParams.get("mode") || "";
	const filterType = url.searchParams.get("type") || "";
	const activeInternshipsMap = /* @__PURE__ */ new Map();
	db.internships.forEach((i) => {
		if (i.status === "Active") {
			if (!activeInternshipsMap.has(i.companyId)) activeInternshipsMap.set(i.companyId, []);
			activeInternshipsMap.get(i.companyId).push(i);
		}
	});
	return {
		student,
		companies: db.companies.filter((c) => {
			if (!c || typeof c !== "object") return false;
			if (c.status !== "Approved" || c.isSuspended) return false;
			if (searchQuery) {
				const nameMatch = (c.companyName || "").toLowerCase().includes(searchQuery);
				const descMatch = (c.companyDescription || "").toLowerCase().includes(searchQuery);
				if (!nameMatch && !descMatch) return false;
			}
			if (filterIndustry && c.industryType !== filterIndustry) return false;
			if (filterLocation && !(c.companyAddress || "").toLowerCase().includes(filterLocation)) return false;
			const companyInternships = activeInternshipsMap.get(c.id) || [];
			if (companyInternships.length === 0) return false;
			if (filterDomain) {
				if (!companyInternships.some((i) => i.domain === filterDomain)) return false;
			}
			if (filterMode) {
				if (!companyInternships.some((i) => (i.mode || "").toLowerCase() === filterMode.toLowerCase())) return false;
			}
			if (filterType) {
				if (!companyInternships.some((i) => (i.type || "").toLowerCase() === filterType.toLowerCase())) return false;
			}
			return true;
		}).slice(0, 60).map((c) => {
			const companyInternships = activeInternshipsMap.get(c.id) || [];
			const rating = (4 + c.companyName.length % 10 * .1).toFixed(1);
			return {
				id: c.id,
				companyName: c.companyName || "Unnamed Company",
				companyDescription: c.companyDescription || "A verified partner on Nexora.",
				industryType: c.industryType || "General",
				companyAddress: c.companyAddress || "Remote / Hybrid",
				companyLogo: c.companyLogo || "",
				website: c.website || "",
				openingsCount: companyInternships.length,
				rating
			};
		}),
		industries: Array.from(new Set(db.companies.map((c) => c.industryType))).filter(Boolean),
		domains: DOMAINS.map((d) => d.name),
		stats: {
			totalCompanies: db.companies.filter((c) => c.status === "Approved" && !c.isSuspended).length + 5400,
			totalApplications: db.applications.length + 99800,
			totalStudents: db.students.length + 49800,
			totalDomains: 150
		},
		filters: {
			query: searchQuery,
			industry: filterIndustry,
			domain: filterDomain,
			location: filterLocation,
			mode: filterMode,
			type: filterType
		}
	};
}
//#endregion
export { load };
