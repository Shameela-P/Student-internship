import { i as logAction, o as updateEntireDatabase, r as getCollection, t as DOMAINS } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/student/internships/+page.server.js
async function load({ cookies, url }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData, companiesData, internshipsData, applicationsData, notificationsData, emailTemplatesData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("internships"),
		getCollection("applications"),
		getCollection("notifications"),
		getCollection("emailTemplates")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		internships: internshipsData,
		applications: applicationsData,
		notifications: notificationsData,
		emailTemplates: emailTemplatesData
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
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
	const companyMap = new Map(db.companies.map((c) => [c.id, c]));
	return {
		student,
		internships: db.internships.filter((internship) => {
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
			const hasApplied = db.applications.some((a) => a.studentId === student.id && a.internshipId === internship.id);
			return {
				...internship,
				companyName: company ? company.companyName : "Unknown Company",
				companyLogo: company ? company.companyLogo : "",
				hasApplied
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
	const [studentsData, companiesData, internshipsData, applicationsData, notificationsData, emailTemplatesData] = await Promise.all([
		getCollection("students"),
		getCollection("companies"),
		getCollection("internships"),
		getCollection("applications"),
		getCollection("notifications"),
		getCollection("emailTemplates")
	]);
	const db = {
		students: studentsData,
		companies: companiesData,
		internships: internshipsData,
		applications: applicationsData,
		notifications: notificationsData,
		emailTemplates: emailTemplatesData
	};
	const student = db.students.find((s) => s.id === sessionUser.id);
	const internship = db.internships.find((i) => i.id === internshipId);
	if (!internship || internship.status !== "Active") return fail(404, {
		success: false,
		error: "This internship is no longer active"
	});
	const company = db.companies.find((c) => c.id === internship.companyId);
	if (!company || company.isSuspended) return fail(400, {
		success: false,
		error: "The company hosting this internship has been suspended"
	});
	if (db.applications.some((a) => a.studentId === student.id && a.internshipId === internship.id)) return fail(400, {
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
	db.applications.push(newApp);
	const studentTemplate = db.emailTemplates.find((t) => t.id === "temp_app_submitted");
	let studentSubject = "Application Filed";
	let studentBody = `Hi ${student.fullName}, your application for "${internship.title}" has been submitted.`;
	if (studentTemplate) {
		studentSubject = studentTemplate.subject.replace("{title}", internship.title);
		studentBody = studentTemplate.body.replace("{studentName}", student.fullName).replace("{title}", internship.title).replace("{companyName}", company.companyName);
	}
	db.notifications.unshift({
		id: `notif_${Date.now()}_stud`,
		recipientEmail: student.email,
		recipientRole: "student",
		subject: studentSubject,
		body: studentBody,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	});
	db.notifications.unshift({
		id: `notif_${Date.now()}_comp`,
		recipientEmail: company.companyEmail,
		recipientRole: "company",
		subject: `New Application Received: ${internship.title}`,
		body: `Dear HR Team,\n\nA new student application has been submitted for your opening: "${internship.title}".\n\nApplicant: ${student.fullName}\nCollege: ${student.collegeName}\nDepartment: ${student.department}\n\nPlease log into Nexora to review their profile and resume files.\n\nBest regards,\nNexora Recruiting Services`,
		date: (/* @__PURE__ */ new Date()).toISOString(),
		read: false
	});
	await updateEntireDatabase(db);
	logAction("APPLICATION_SUBMIT", `Student ${student.fullName} applied for internship ${internship.title} (ID: ${internship.id}).`);
	return { success: true };
} };
//#endregion
export { actions, load };
