import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC715JP8BkK9qOweYcyZpdGRwmHJByvB6o",
  authDomain: "student-internship-porta-80f95.firebaseapp.com",
  databaseURL: "https://student-internship-porta-80f95-default-rtdb.firebaseio.com",
  projectId: "student-internship-porta-80f95",
  storageBucket: "student-internship-porta-80f95.firebasestorage.app",
  messagingSenderId: "625371325248",
  appId: "1:625371325248:web:73c2e817a9b0b87c98d0a5",
  measurementId: "G-E282DD0QSC"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, '/');

async function initCounts() {
	const getArrayLen = async (coll) => {
		const snap = await get(child(dbRef, coll));
		if (!snap.exists()) return 0;
		const val = snap.val();
		if (Array.isArray(val)) return val.length;
		if (typeof val === 'object') return Math.max(...Object.keys(val).map(Number)) + 1;
		return 0;
	};

	const [companiesLen, studentsLen, internshipsLen, applicationsLen] = await Promise.all([
		getArrayLen('companies'),
		getArrayLen('students'),
		getArrayLen('internships'),
		getArrayLen('applications')
	]);

    const counts = {
        companies: companiesLen,
        students: studentsLen,
        internships: internshipsLen,
        applications: applicationsLen
    };

    await set(child(dbRef, 'metadata/counts'), counts);
    console.log('Initialized counts:', counts);
    process.exit(0);
}

initCounts();
