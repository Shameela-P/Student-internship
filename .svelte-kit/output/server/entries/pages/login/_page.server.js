import { i as getCollection, o as logAction } from "../../../chunks/db.js";
import { n as createToken, o as verifyPassword, s as verifyToken, t as createRefreshToken } from "../../../chunks/auth.js";
import { fail, redirect } from "@sveltejs/kit";
//#region src/routes/login/+page.server.js
async function load({ cookies }) {
	const sessionCookie = cookies.get("nexora_session");
	if (sessionCookie) {
		const session = verifyToken(sessionCookie);
		if (session) throw redirect(303, `/${session.role}`);
	}
	return {};
}
var actions = { default: async ({ request, cookies }) => {
	const formData = await request.formData();
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString();
	const role = formData.get("role")?.toString();
	if (!email || !password || !role) return fail(400, {
		success: false,
		error: "All fields are required"
	});
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
	const setAuthCookies = (payload) => {
		const token = createToken(payload);
		const refresh = createRefreshToken(payload);
		const cookieOpts = {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "lax"
		};
		cookies.set("nexora_session", token, {
			...cookieOpts,
			maxAge: 3600 * 24
		});
		cookies.set("nexora_refresh", refresh, {
			...cookieOpts,
			maxAge: 3600 * 24 * 7
		});
	};
	if (role === "student") {
		const student = db.students.find((s) => s.email.toLowerCase() === email.toLowerCase());
		if (!student) return fail(400, {
			success: false,
			error: "Invalid email or password"
		});
		if (student.isBlocked) return fail(403, {
			success: false,
			error: "Your student account has been blocked by administrators"
		});
		if (!verifyPassword(password, student.password)) return fail(400, {
			success: false,
			error: "Invalid email or password"
		});
		setAuthCookies({
			id: student.id,
			email: student.email,
			name: student.fullName,
			role: "student"
		});
		const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
		logAction("STUDENT_LOGIN", "Logged in via Credentials", student.fullName, "Student", student.email, "Dashboard", ip);
		throw redirect(303, "/student");
	} else if (role === "company") {
		const company = db.companies.find((c) => c.companyEmail.toLowerCase() === email.toLowerCase());
		if (!company) return fail(400, {
			success: false,
			error: "Invalid email or password"
		});
		if (company.isSuspended) return fail(403, {
			success: false,
			error: "Your company profile has been suspended due to fraudulent flag warnings"
		});
		if (!verifyPassword(password, company.password)) return fail(400, {
			success: false,
			error: "Invalid email or password"
		});
		setAuthCookies({
			id: company.id,
			email: company.companyEmail,
			name: company.companyName,
			role: "company"
		});
		const ip = request.headers.get("x-forwarded-for") || "Unknown IP";
		logAction("COMPANY_LOGIN", "Logged in via Credentials", company.companyName, "Company", company.companyEmail, "Dashboard", ip);
		throw redirect(303, "/company");
	} else if (role === "admin") {
		const admin = db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
		if (!admin) return fail(400, {
			success: false,
			error: "Invalid credentials"
		});
		if (!verifyPassword(password, admin.password)) return fail(400, {
			success: false,
			error: "Invalid credentials"
		});
		setAuthCookies({
			id: admin.id,
			email: admin.email,
			name: admin.fullName,
			role: "admin"
		});
		logAction("ADMIN_LOGIN", "Super administrator logged in.");
		throw redirect(303, "/admin");
	}
	return fail(400, {
		success: false,
		error: "Invalid role selection"
	});
} };
//#endregion
export { actions, load };
