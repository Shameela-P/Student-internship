import { c as updateDocument, i as getCollection, n as addDocument, o as logAction } from "../../../../chunks/db.js";
import { n as createToken } from "../../../../chunks/auth.js";
import { json } from "@sveltejs/kit";
//#region src/routes/login/google/+server.js
async function POST({ request, cookies }) {
	try {
		const { email, name, photoURL, role } = await request.json();
		if (!email || !name || !role) return json({ error: "Missing required Google Auth payload fields." }, { status: 400 });
		const [studentsData, companiesData, adminsData] = await Promise.all([
			getCollection("students"),
			getCollection("companies"),
			getCollection("admins")
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			admins: adminsData
		};
		let user = null;
		let redirectPath = "/";
		const existingStudent = db.students.find((s) => s.email === email);
		const existingCompany = db.companies.find((c) => c.companyEmail === email);
		const existingAdmin = db.admins.find((a) => a.email === email);
		if (existingAdmin) {
			user = {
				id: existingAdmin.id,
				role: "admin",
				email
			};
			redirectPath = "/admin";
		} else if (existingStudent) {
			if (existingStudent.isBlocked) return json({ error: "Account has been blocked by administrator." }, { status: 403 });
			user = {
				id: existingStudent.id,
				role: "student",
				email
			};
			redirectPath = "/student";
			if (photoURL && existingStudent.profilePhoto !== photoURL) {
				existingStudent.profilePhoto = photoURL;
				await updateDocument("students", existingStudent.id, { profilePhoto: photoURL });
			}
		} else if (existingCompany) {
			if (existingCompany.isSuspended) return json({ error: "Company account is suspended." }, { status: 403 });
			user = {
				id: existingCompany.id,
				role: "company",
				email
			};
			redirectPath = "/company";
		} else if (role === "student") {
			const newStudent = {
				id: `stud_${Date.now()}`,
				fullName: name,
				email,
				mobileNumber: "",
				password: "",
				collegeName: "Update Profile",
				degreeCourse: "Update Profile",
				department: "Update Profile",
				yearOfStudy: "1",
				currentStatus: "Student",
				skills: [],
				address: "Update Profile",
				profilePhoto: photoURL || "",
				resumePath: "",
				isBlocked: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			await addDocument("students", newStudent);
			user = {
				id: newStudent.id,
				role: "student",
				email
			};
			redirectPath = "/student";
		} else if (role === "company") {
			const newCompany = {
				id: `comp_${Date.now()}`,
				companyName: name,
				companyEmail: email,
				companyContactNumber: "",
				website: "",
				companyAddress: "Update Profile",
				companyDescription: "Update Profile",
				industryType: "Software & IT",
				companyLogo: photoURL || "",
				password: "",
				status: "Pending",
				isSuspended: false,
				createdAt: (/* @__PURE__ */ new Date()).toISOString()
			};
			await addDocument("companies", newCompany);
			user = {
				id: newCompany.id,
				role: "company",
				email
			};
			redirectPath = "/company";
		} else return json({ error: "Invalid role selection for new user." }, { status: 400 });
		const token = createToken({
			id: user.id,
			role: user.role,
			email: user.email,
			name
		});
		cookies.set("nexora_session", token, {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			maxAge: 3600 * 24
		});
		const roleFormatted = user.role.charAt(0).toUpperCase() + user.role.slice(1);
		const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
		logAction(`${user.role.toUpperCase()}_LOGIN`, `Logged in via Google`, name, roleFormatted, email, "Dashboard", ip);
		return json({
			success: true,
			redirect: redirectPath
		});
	} catch (err) {
		console.error("Google Auth Handler Error:", err);
		return json({ error: "Internal Server Error processing Google login." }, { status: 500 });
	}
}
//#endregion
export { POST };
