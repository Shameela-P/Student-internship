import { getCollection } from '$lib/db';
import { requireRole } from '$lib/auth';

export async function load({ cookies }) {
	requireRole(cookies, ['admin']);
	const [studentsData] = await Promise.all([
		getCollection('students')
	]);
	const db = { students: studentsData };
	
	const students = db.students.map(s => {
		// Calculate stats if needed, or just pass data
		return {
			id: s.id,
			fullName: s.fullName,
			email: s.email,
			collegeName: s.collegeName,
			department: s.department,
			isSuspended: s.isSuspended || false
		};
	});

	return {
		students
	};
}
