import { i as logAction, o as updateEntireDatabase, r as getCollection } from "../../../../chunks/db.js";
import { a as requireRole } from "../../../../chunks/auth.js";
import { fail } from "@sveltejs/kit";
import "fs";
import path from "path";
//#region src/routes/student/profile/+page.server.js
async function load({ cookies }) {
	const sessionUser = requireRole(cookies, ["student"]);
	return { student: { students: await getCollection("students") }.students.find((s) => s.id === sessionUser.id) };
}
var actions = {
	updateProfile: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["student"]);
		const formData = await request.formData();
		const fullName = formData.get("fullName")?.toString().trim();
		const mobileNumber = formData.get("mobileNumber")?.toString().trim();
		const collegeName = formData.get("collegeName")?.toString().trim();
		const degreeCourse = formData.get("degreeCourse")?.toString().trim();
		const department = formData.get("department")?.toString().trim();
		const yearOfStudy = formData.get("yearOfStudy")?.toString().trim();
		const currentStatus = formData.get("currentStatus")?.toString();
		const skillsRaw = formData.get("skills")?.toString().trim();
		const address = formData.get("address")?.toString().trim();
		const profilePhoto = formData.get("profilePhoto")?.toString().trim() || "";
		const bio = formData.get("bio")?.toString().trim() || "";
		if (!fullName || !mobileNumber || !collegeName || !degreeCourse || !department || !yearOfStudy || !currentStatus || !skillsRaw || !address) return fail(400, {
			success: false,
			error: "All fields marked with an asterisk are required"
		});
		const db = { students: await getCollection("students") };
		const studentIndex = db.students.findIndex((s) => s.id === sessionUser.id);
		if (studentIndex === -1) return fail(404, {
			success: false,
			error: "Student profile not found"
		});
		const skills = skillsRaw.split(",").map((s) => s.trim()).filter(Boolean);
		db.students[studentIndex] = {
			...db.students[studentIndex],
			fullName,
			mobileNumber,
			collegeName,
			degreeCourse,
			department,
			yearOfStudy,
			currentStatus,
			skills,
			address,
			profilePhoto,
			bio
		};
		await updateEntireDatabase(db);
		logAction("STUDENT_UPDATE_PROFILE", `Student ${fullName} (${sessionUser.email}) updated profile details.`);
		return {
			success: true,
			message: "Profile details saved successfully"
		};
	},
	updateResume: async ({ request, cookies }) => {
		const sessionUser = requireRole(cookies, ["student"]);
		const resumeFile = (await request.formData()).get("resume");
		if (!resumeFile || !(resumeFile instanceof File) || resumeFile.size === 0) return fail(400, {
			success: false,
			error: "Please select a valid PDF/DOC resume file"
		});
		const db = { students: await getCollection("students") };
		const studentIndex = db.students.findIndex((s) => s.id === sessionUser.id);
		if (studentIndex === -1) return fail(404, {
			success: false,
			error: "Student profile not found"
		});
		const ext = path.extname(resumeFile.name) || ".pdf";
		const filename = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 6)}${ext}`;
		path.resolve("uploads/resumes", filename);
		try {
			const base64Data = Buffer.from(await resumeFile.arrayBuffer()).toString("base64");
			db.students[studentIndex].resumeData = base64Data;
			db.students[studentIndex].resumeName = resumeFile.name;
			db.students[studentIndex].resumeMimeType = resumeFile.type || "application/pdf";
			db.students[studentIndex].resumePath = db.students[studentIndex].id;
			await updateEntireDatabase(db);
			logAction("STUDENT_UPDATE_RESUME", `Student ${db.students[studentIndex].fullName} uploaded a new resume.`);
			return {
				success: true,
				message: "Resume file updated successfully"
			};
		} catch (err) {
			console.error("Resume swap error:", err);
			return fail(500, {
				success: false,
				error: "Failed to save resume. Please try again."
			});
		}
	}
};
//#endregion
export { actions, load };
