import { i as getCollection, l as updateEntireDatabase, o as logAction } from "../../../chunks/db.js";
import { a as requireRole } from "../../../chunks/auth.js";
import { error, fail } from "@sveltejs/kit";
//#region src/routes/admin/+page.server.js
async function load({ cookies }) {
	try {
		const sessionUser = requireRole(cookies, ["admin"]);
		const [studentsData, companiesData, internshipsData, applicationsData, systemLogsData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("internships"),
			getCollection("applications"),
			getCollection("systemLogs")
		]);
		const totalStudents = studentsData.length;
		const totalCompanies = companiesData.length;
		const pendingCompanies = companiesData.filter((c) => c.status === "Pending");
		const activeInternships = internshipsData.filter((i) => i.status === "Active").length;
		const totalApplications = applicationsData.length;
		const placementsCount = applicationsData.filter((a) => a.status === "Approved").length;
		const certificatesGenerated = applicationsData.filter((a) => a.certificateHash).length;
		const activeCompanies = companiesData.filter((c) => c.status === "Approved" && !c.isSuspended).slice(0, 100).map((c) => ({
			id: c.id,
			companyName: c.companyName,
			companyEmail: c.companyEmail,
			industryType: c.industryType
		}));
		const logs = systemLogsData.slice(0, 30);
		return {
			user: sessionUser,
			stats: {
				totalStudents,
				totalCompanies,
				pendingCompaniesCount: pendingCompanies.length,
				activeInternships,
				totalApplications,
				successfulPlacements: placementsCount,
				certificatesGenerated
			},
			verificationQueue: pendingCompanies.map((c) => ({
				id: c.id,
				companyName: c.companyName,
				companyEmail: c.companyEmail,
				industryType: c.industryType,
				website: c.website,
				createdAt: c.createdAt
			})),
			activeCompanies,
			logs
		};
	} catch (err) {
		console.error("Vercel Load Error:", err);
		throw error(500, err.message || "Internal Server Error fetching admin dashboard");
	}
}
var actions = {
	approveCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ["admin"]);
			const companyId = (await request.formData()).get("companyId");
			const companies = await getCollection("companies");
			const companyIndex = companies.findIndex((c) => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: "Company not found" });
			companies[companyIndex].status = "Approved";
			await updateEntireDatabase({ "companies": companies });
			await logAction("APPROVE_COMPANY", `Approved company registration: ${companies[companyIndex].companyName}`, sessionUser.name, "Admin", sessionUser.email, "Admin Board");
			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	rejectCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ["admin"]);
			const companyId = (await request.formData()).get("companyId");
			const companies = await getCollection("companies");
			const companyIndex = companies.findIndex((c) => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: "Company not found" });
			companies[companyIndex].status = "Rejected";
			await updateEntireDatabase({ "companies": companies });
			await logAction("REJECT_COMPANY", `Rejected company registration: ${companies[companyIndex].companyName}`, sessionUser.name, "Admin", sessionUser.email, "Admin Board");
			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	suspendCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ["admin"]);
			const companyId = (await request.formData()).get("companyId");
			const companies = await getCollection("companies");
			const companyIndex = companies.findIndex((c) => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: "Company not found" });
			companies[companyIndex].isSuspended = true;
			await updateEntireDatabase({ "companies": companies });
			await logAction("SUSPEND_COMPANY", `Suspended company account: ${companies[companyIndex].companyName}`, sessionUser.name, "Admin", sessionUser.email, "Admin Board");
			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	},
	unsuspendCompany: async ({ request, cookies }) => {
		try {
			const sessionUser = requireRole(cookies, ["admin"]);
			const companyId = (await request.formData()).get("companyId");
			const companies = await getCollection("companies");
			const companyIndex = companies.findIndex((c) => c.id === companyId);
			if (companyIndex === -1) return fail(404, { error: "Company not found" });
			companies[companyIndex].isSuspended = false;
			await updateEntireDatabase({ "companies": companies });
			await logAction("UNSUSPEND_COMPANY", `Unsuspended company account: ${companies[companyIndex].companyName}`, sessionUser.name, "Admin", sessionUser.email, "Admin Board");
			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: err.message });
		}
	}
};
//#endregion
export { actions, load };
