import { n as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
//#region src/routes/admin/students/+page.server.js
async function load({ cookies }) {
	requireRole(cookies, ["admin"]);
	return { students: { students: await getCollection("students") }.students.map((s) => {
		return {
			id: s.id,
			fullName: s.fullName,
			email: s.email,
			collegeName: s.collegeName,
			department: s.department,
			isSuspended: s.isSuspended || false
		};
	}) };
}
//#endregion
export { load };
