import { i as getCollection, l as updateEntireDatabase, o as logAction } from "../../../../chunks/db.js";
import { a as requireRole, i as hashPassword, o as verifyPassword } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
//#region src/routes/student/settings/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	const [studentsData] = await Promise.all([getCollection("students")]);
	const student = { students: studentsData }.students.find((s) => s.id === sessionUser.id);
	return {
		student,
		settings: student.settings || {
			emailNotifications: true,
			smsNotifications: false,
			chatReceipts: true,
			profileVisibility: "public",
			twoFactorAuth: false
		}
	};
}
var actions = {
	changePassword: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["student"]);
		const formData = await request.formData();
		const currentPassword = formData.get("currentPassword")?.toString();
		const newPassword = formData.get("newPassword")?.toString();
		const confirmPassword = formData.get("confirmPassword")?.toString();
		if (!currentPassword || !newPassword || !confirmPassword) return fail(400, {
			success: false,
			error: "Please populate all password fields"
		});
		if (newPassword !== confirmPassword) return fail(400, {
			success: false,
			error: "New passwords do not match"
		});
		if (newPassword.length < 6) return fail(400, {
			success: false,
			error: "Password must be at least 6 characters long"
		});
		const [studentsData] = await Promise.all([getCollection("students")]);
		const db = { students: studentsData };
		const studentIndex = db.students.findIndex((s) => s.id === sessionUser.id);
		if (studentIndex === -1) return fail(404, {
			success: false,
			error: "Student account not found"
		});
		const student = db.students[studentIndex];
		if (!verifyPassword(currentPassword, student.password)) return fail(400, {
			success: false,
			error: "Current password provided is incorrect"
		});
		db.students[studentIndex].password = hashPassword(newPassword);
		await updateEntireDatabase(db);
		logAction("STUDENT_CHANGE_PASSWORD", `Student ${student.fullName} updated their account security credentials.`);
		return {
			success: true,
			message: "Password updated successfully"
		};
	},
	updatePreferences: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["student"]);
		const formData = await request.formData();
		const emailNotifications = formData.get("emailNotifications") === "true";
		const smsNotifications = formData.get("smsNotifications") === "true";
		const chatReceipts = formData.get("chatReceipts") === "true";
		const profileVisibility = formData.get("profileVisibility")?.toString() || "public";
		const twoFactorAuth = formData.get("twoFactorAuth") === "true";
		const [studentsData] = await Promise.all([getCollection("students")]);
		const db = { students: studentsData };
		const studentIndex = db.students.findIndex((s) => s.id === sessionUser.id);
		if (studentIndex === -1) return fail(404, {
			success: false,
			error: "Student account not found"
		});
		db.students[studentIndex].settings = {
			emailNotifications,
			smsNotifications,
			chatReceipts,
			profileVisibility,
			twoFactorAuth
		};
		await updateEntireDatabase(db);
		logAction("STUDENT_UPDATE_SETTINGS", `Student ${db.students[studentIndex].fullName} updated their settings and preferences.`);
		return {
			success: true,
			message: "Settings and privacy controls updated successfully"
		};
	}
};
//#endregion
export { actions, load };
