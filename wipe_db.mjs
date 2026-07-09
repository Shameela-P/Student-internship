import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC715JP8BkK9qOweYcyZpdGRwmHJByvB6o",
  authDomain: "student-internship-porta-80f95.firebaseapp.com",
  databaseURL: "https://student-internship-porta-80f95-default-rtdb.firebaseio.com",
  projectId: "student-internship-porta-80f95",
  storageBucket: "student-internship-porta-80f95.firebasestorage.app",
  messagingSenderId: "625371325248",
  appId: "1:625371325248:web:e52c508c9e0cb56598d0a5",
  measurementId: "G-QB5S260BFM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, '/');

async function wipeDatabase() {
    try {
        console.log('Wiping database...');
        await set(dbRef, null);
        console.log('Database successfully wiped.');
    } catch(e) {
        console.error('Failed to wipe database:', e);
    }
    process.exit(0);
}

wipeDatabase();
