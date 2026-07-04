import { n as getCollection } from "../../../chunks/db.js";
//#region src/routes/verify/+page.server.js
async function load({ url }) {
	const db = {
		students: await getCollection("students"),
		companies: await getCollection("companies"),
		internships: await getCollection("internships"),
		applications: await getCollection("applications")
	};
	const hash = url.searchParams.get("hash")?.trim() || "";
	let activeCertificate = null;
	let hashError = null;
	if (hash) {
		const cleanInput = hash.replace(/^NX-/i, "").toLowerCase();
		const app = db.applications.find((a) => {
			if (!a.certificateHash) return false;
			const certHashLower = a.certificateHash.toLowerCase();
			const certHashNoPrefix = certHashLower.replace(/^cert_/i, "");
			return certHashLower === cleanInput || certHashNoPrefix === cleanInput || certHashLower.startsWith(cleanInput) || certHashNoPrefix.startsWith(cleanInput);
		});
		if (!app) hashError = "No verified completion record matches the query parameter credentials.";
		else {
			const student = db.students.find((s) => s.id === app.studentId);
			const internship = db.internships.find((i) => i.id === app.internshipId);
			const company = internship ? db.companies.find((c) => c.id === internship.companyId) : null;
			activeCertificate = {
				id: app.id,
				hash: app.certificateHash,
				issueDate: app.actionDate || app.appliedDate,
				internshipTitle: internship ? internship.title : "Placement Program",
				duration: internship ? internship.duration : "N/A",
				companyName: company ? company.companyName : "Verified Corporate Partner",
				companyLogo: company ? company.companyLogo : "",
				studentName: student ? student.fullName : "Verified Candidate"
			};
		}
	}
	return {
		activeCertificate,
		hashError,
		hash
	};
}
//#endregion
export { load };
