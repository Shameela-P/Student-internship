import { fail, redirect } from '@sveltejs/kit';
import { logAction, getCollection, queryDocumentsPaginated } from '$lib/db';
import { verifyPassword, createToken, createRefreshToken, verifyToken } from '$lib/auth';
import { dev } from '$app/environment';

export async function load({ cookies }) {
	// If already logged in, redirect them away from login page to dashboard
	const sessionCookie = cookies.get('nexora_session');
	if (sessionCookie) {
		const session = verifyToken(sessionCookie);
		if (session) {
			throw redirect(303, `/${session.role}`);
		}
	}
	return {};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();
		const password = formData.get('password')?.toString();
		const role = formData.get('role')?.toString(); // 'student' | 'company' | 'admin'

		if (!email || !password || !role) {
			return fail(400, { success: false, error: 'All fields are required' });
		}

		const setAuthCookies = (payload) => {
			const token = createToken(payload);
			const refresh = createRefreshToken(payload);
			
			const cookieOpts = {
				path: '/',
				httpOnly: true,
				secure: !dev,
				sameSite: 'lax'
			};

			cookies.set('nexora_session', token, { ...cookieOpts, maxAge: 60 * 60 * 24 });
			cookies.set('nexora_refresh', refresh, { ...cookieOpts, maxAge: 60 * 60 * 24 * 7 });
		};

		if (role === 'student') {
			const students = await queryDocumentsPaginated('students', 'email', email, 1);
			const student = students.find(s => s.email.toLowerCase() === email.toLowerCase());
			if (!student) return fail(400, { success: false, error: 'Invalid email or password' });
			if (student.isBlocked) return fail(403, { success: false, error: 'Your student account has been blocked by administrators' });
			if (!verifyPassword(password, student.password)) return fail(400, { success: false, error: 'Invalid email or password' });

			setAuthCookies({ id: student.id, email: student.email, name: student.fullName, role: 'student' });
			const ip = request.headers.get('x-forwarded-for') || 'Unknown IP';
			logAction('STUDENT_LOGIN', 'Logged in via Credentials', student.fullName, 'Student', student.email, 'Dashboard', ip);
			throw redirect(303, '/student');
		} 
		else if (role === 'company') {
			const companies = await queryDocumentsPaginated('companies', 'companyEmail', email, 1);
			const company = companies.find(c => c.companyEmail.toLowerCase() === email.toLowerCase());
			if (!company) return fail(400, { success: false, error: 'Invalid email or password' });
			if (company.isSuspended) return fail(403, { success: false, error: 'Your company profile has been suspended due to fraudulent flag warnings' });
			if (!verifyPassword(password, company.password)) return fail(400, { success: false, error: 'Invalid email or password' });

			setAuthCookies({ id: company.id, email: company.companyEmail, name: company.companyName, role: 'company' });
			const ip = request.headers.get('x-forwarded-for') || 'Unknown IP';
			logAction('COMPANY_LOGIN', 'Logged in via Credentials', company.companyName, 'Company', company.companyEmail, 'Dashboard', ip);
			throw redirect(303, '/company');
		} 
		else if (role === 'admin') {
			import('fs').then(fs => fs.appendFileSync('login_debug.log', `[ADMIN] Logging in: ${email}\n`));
			const admins = await queryDocumentsPaginated('admins', 'email', email, 1);
			import('fs').then(fs => fs.appendFileSync('login_debug.log', `[ADMIN] Admins fetched: ${JSON.stringify(admins)}\n`));
			
			const admin = admins.find(a => a.email.toLowerCase() === email.toLowerCase());
			import('fs').then(fs => fs.appendFileSync('login_debug.log', `[ADMIN] Found admin: ${JSON.stringify(admin)}\n`));
			
			if (!admin) {
				import('fs').then(fs => fs.appendFileSync('login_debug.log', `[ADMIN] Failed: Admin not found\n`));
				return fail(400, { success: false, error: 'Invalid credentials' });
			}
			
			const isPasswordValid = verifyPassword(password, admin.password);
			import('fs').then(fs => fs.appendFileSync('login_debug.log', `[ADMIN] Password valid: ${isPasswordValid}\n`));
			
			if (!isPasswordValid) {
				return fail(400, { success: false, error: 'Invalid credentials' });
			}

			setAuthCookies({ id: admin.id, email: admin.email, name: admin.fullName, role: 'admin' });
			logAction('ADMIN_LOGIN', 'Super administrator logged in.');
			throw redirect(303, '/admin');
		}

		return fail(400, { success: false, error: 'Invalid role selection' });
	}
};
