import { a as getDocument, i as getCollection, n as addDocument, o as logAction, t as DOMAINS } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/student/internships/+page.server.js
async function load({ cookies, url }) {
	const student = await getDocument("students", requireRole(cookies, ["student"]).id);
	if (!student) {
		cookies.delete("nexora_session", { path: "/" });
		throw new Error("Student session not found");
	}
	const searchQuery = url.searchParams.get("query")?.toLowerCase().trim() || "";
	const filterDomain = url.searchParams.get("domain") || "";
	const filterLocation = url.searchParams.get("location")?.toLowerCase().trim() || "";
	const filterMode = url.searchParams.get("mode") || "";
	const filterType = url.searchParams.get("type") || "";
	const filterDuration = url.searchParams.get("duration") || "";
	const filterJobOpp = url.searchParams.get("jobOpportunity") || "";
	const filterCert = url.searchParams.get("certificateAvailable") || "";
	const [internshipsData, companiesData] = await Promise.all([getCollection("internships"), getCollection("companies")]);
	const studentApps = await getCollection("applications").then((apps) => apps.filter((a) => a.studentId === student.id).map((a) => a.internshipId));
	const appliedSet = new Set(studentApps);
	const companyMap = new Map(companiesData.map((c) => [c.id, c]));
	return {
		student,
		internships: internshipsData.filter((internship) => {
			if (internship.status !== "Active") return false;
			const company = companyMap.get(internship.companyId);
			if (!company || company.isSuspended || company.status !== "Approved") return false;
			if (searchQuery) {
				if (!searchQuery.split(/\s+/).filter(Boolean).every((token) => {
					const titleMatch = internship.title.toLowerCase().includes(token);
					const descMatch = internship.description.toLowerCase().includes(token);
					const skillMatch = internship.skillsRequired.some((s) => s.toLowerCase().includes(token));
					const companyMatch = company.companyName.toLowerCase().includes(token);
					return titleMatch || descMatch || skillMatch || companyMatch;
				})) return false;
			}
			if (filterDomain && internship.domain !== filterDomain) return false;
			if (filterLocation && !internship.location.toLowerCase().includes(filterLocation)) return false;
			if (filterMode && internship.mode !== filterMode) return false;
			if (filterType && internship.type !== filterType) return false;
			if (filterDuration && internship.duration !== filterDuration) return false;
			if (filterJobOpp && internship.jobOpportunity !== filterJobOpp) return false;
			if (filterCert && internship.certificateAvailable !== filterCert) return false;
			return true;
		}).slice(0, 60).map((internship) => {
			const company = companyMap.get(internship.companyId);
			return {
				...internship,
				companyName: company ? company.companyName : "Unknown Company",
				companyLogo: company ? company.companyLogo : "",
				hasApplied: appliedSet.has(internship.id)
			};
		}).slice(0, 50),
		domains: DOMAINS,
		filters: {
			query: searchQuery,
			domain: filterDomain,
			location: filterLocation,
			mode: filterMode,
			type: filterType,
			duration: filterDuration,
			jobOpportunity: filterJobOpp,
			certificateAvailable: filterCert
		}
	};
}
var actions = { apply: async ({ request, cookies }) => {
	const sessionUser = requireRole(cookies, ["student"]);
	const internshipId = (await request.formData()).get("internshipId")?.toString();
	if (!internshipId) return fail(400, {
		success: false,
		error: "Internship reference is missing"
	});
	const [student, internship] = await Promise.all([getDocument("students", sessionUser.id), getDocument("internships", internshipId)]);
	if (!internship || internship.status !== "Active") return fail(404, {
		success: false,
		error: "This internship is no longer active"
	});
	const company = await getDocument("companies", internship.companyId);
	if (!company || company.isSuspended) return fail(400, {
		success: false,
		error: "The company hosting this internship has been suspended"
	});
	if ((await getCollection("applications").then((apps) => apps.filter((a) => a.studentId === student.id && a.internshipId === internship.id))).length > 0) return fail(400, {
		success: false,
		error: "You have already applied to this internship"
	});
	if (!student.resumePath) return fail(400, {
		success: false,
		error: "You must upload a resume before applying. Update it in your Profile Settings."
	});
	const newApp = {
		id: `app_${Date.now()}`,
		studentId: student.id,
		internshipId: internship.id,
		status: "Pending",
		appliedDate: (/* @__PURE__ */ new Date()).toISOString(),
		actionDate: "",
		resumePath: student.resumePath,
		certificateHash: ""
	};
	await Promise.all([
		addDocument("applications", newApp),
		addDocument("notifications", {
			id: `notif_${Date.now()}_stud`,
			recipientEmail: student.email,
			recipientRole: "student",
			subject: `Application Filed: ${internship.title}`,
			body: `Hi ${student.fullName},\n\nYour application for "${internship.title}" at ${company.companyName} has been successfully submitted.\n\nWe'll notify you when the company reviews your application.\n\nBest of luck!\nNexora Team`,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		}),
		addDocument("notifications", {
			id: `notif_${Date.now()}_comp`,
			recipientEmail: company.companyEmail,
			recipientRole: "company",
			subject: `New Application Received: ${internship.title}`,
			body: `Dear HR Team,\n\nA new student application has been submitted for your opening: "${internship.title}".\n\nApplicant: ${student.fullName}\nCollege: ${student.collegeName}\nDepartment: ${student.department}\n\nPlease log into Nexora to review their profile and resume.\n\nBest regards,\nNexora Recruiting Services`,
			date: (/* @__PURE__ */ new Date()).toISOString(),
			read: false
		})
	]);
	await logAction("APPLICATION_SUBMIT", `Student ${student.fullName} applied for internship ${internship.title} (ID: ${internship.id}).`);
	return { success: true };
} };
//#endregion
export { actions, load };
