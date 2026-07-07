import { json } from '@sveltejs/kit';
<<<<<<< HEAD
import { getCollection, updateDocument, addDocument, logAction } from '$lib/db';
import { createToken } from '$lib/auth';
=======
import { getCollection, updateEntireDatabase, logAction } from '$lib/db';
import { createToken } from '$lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-for-jwt-signing';

>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
import { dev } from '$app/environment';

export async function POST({ request, cookies }) {
	try {
		const { email, name, photoURL, role } = await request.json();

		if (!email || !name || !role) {
			return json({ error: 'Missing required Google Auth payload fields.' }, { status: 400 });
		}

		const [studentsData, companiesData, adminsData] = await Promise.all([
			getCollection('students'),
			getCollection('companies'),
			getCollection('admins')
		]);
		const db = {
			students: studentsData,
			companies: companiesData,
			admins: adminsData
		};
		let user = null;
		let redirectPath = '/';

		// 1. Check if user already exists anywhere in the DB
		const existingStudent = db.students.find(s => s.email === email);
		const existingCompany = db.companies.find(c => c.companyEmail === email);
		const existingAdmin = db.admins.find(a => a.email === email);

		if (existingAdmin) {
			user = { id: existingAdmin.id, role: 'admin', email };
			redirectPath = '/admin';
		} else if (existingStudent) {
			// They signed up as student previously
			if (existingStudent.isBlocked) {
				return json({ error: 'Account has been blocked by administrator.' }, { status: 403 });
			}
			user = { id: existingStudent.id, role: 'student', email };
			redirectPath = '/student';
			
			// Optional: Update photoURL if changed
			if (photoURL && existingStudent.profilePhoto !== photoURL) {
				existingStudent.profilePhoto = photoURL;
				await updateDocument('students', existingStudent.id, { profilePhoto: photoURL });
			}
		} else if (existingCompany) {
			if (existingCompany.isSuspended) {
				return json({ error: 'Company account is suspended.' }, { status: 403 });
			}
			user = { id: existingCompany.id, role: 'company', email };
			redirectPath = '/company';
		} else {
			// 2. User does not exist. Auto-register them based on selected role!
			if (role === 'student') {
				const newStudent = {
					id: `stud_${Date.now()}`,
					fullName: name,
					email: email,
					mobileNumber: '', // Can be filled in profile later
					password: '', // No password since Google Auth
					collegeName: 'Update Profile',
					degreeCourse: 'Update Profile',
					department: 'Update Profile',
					yearOfStudy: '1',
					currentStatus: 'Student',
					skills: [],
					address: 'Update Profile',
					profilePhoto: photoURL || '',
					resumePath: '',
					isBlocked: false,
					createdAt: new Date().toISOString()
				};
				await addDocument('students', newStudent);
				
				user = { id: newStudent.id, role: 'student', email };
				redirectPath = '/student';
			} else if (role === 'company') {
				const newCompany = {
					id: `comp_${Date.now()}`,
					companyName: name, // Using their Google Name as placeholder company name
					companyEmail: email,
					companyContactNumber: '',
					website: '',
					companyAddress: 'Update Profile',
					companyDescription: 'Update Profile',
					industryType: 'Software & IT',
					companyLogo: photoURL || '',
					password: '', // No password since Google Auth
					status: 'Pending', // Pending admin approval
					isSuspended: false,
					createdAt: new Date().toISOString()
				};
				await addDocument('companies', newCompany);

				user = { id: newCompany.id, role: 'company', email };
				redirectPath = '/company';
			} else {
				return json({ error: 'Invalid role selection for new user.' }, { status: 400 });
			}
		}

<<<<<<< HEAD
		// 3. Generate JWT Token using the shared custom implementation
=======
		// 3. Generate Token
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
		const token = createToken({ id: user.id, role: user.role, email: user.email, name: name });

		// 4. Set Session Cookie
		cookies.set('nexora_session', token, {
			path: '/',
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 // 24 hours
		});
		
		const roleFormatted = user.role.charAt(0).toUpperCase() + user.role.slice(1);
		const ip = request.headers.get('x-forwarded-for') || 'Unknown IP';
		logAction(`${user.role.toUpperCase()}_LOGIN`, `Logged in via Google`, name, roleFormatted, email, 'Dashboard', ip);

		return json({ success: true, redirect: redirectPath });

	} catch (err) {
		console.error('Google Auth Handler Error:', err);
		return json({ error: 'Internal Server Error processing Google login.' }, { status: 500 });
	}
}
