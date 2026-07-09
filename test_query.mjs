import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

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

async function testQuery() {
    try {
        console.log('Fetching entire admins...');
        const fullSnap = await get(child(dbRef, 'admins'));
        console.log('Full admins:', fullSnap.val());
    } catch(e) {
        console.error(e);
    }
    process.exit(0);
}

testQuery();
