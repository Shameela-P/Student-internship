import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, query, orderByChild, equalTo, limitToLast } from 'firebase/database';

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

async function getPaginated(collectionName, limit = 20) {
    const dbQuery = query(child(dbRef, collectionName), limitToLast(limit));
    const snapshot = await get(dbQuery);
    if (!snapshot.exists()) return [];
    
    const data = snapshot.val();
    let result = [];
    if (Array.isArray(data)) {
        result = data.filter(item => item !== null);
    } else if (typeof data === 'object') {
        result = Object.values(data).filter(item => item !== null);
    }
    return result.reverse(); 
}

async function queryDocumentsPaginated(collectionName, field, value, limit = 20) {
    try {
        const dbQuery = query(child(dbRef, collectionName), orderByChild(field), equalTo(value), limitToLast(limit));
        const snapshot = await get(dbQuery);
        if (!snapshot.exists()) return [];
        
        const data = snapshot.val();
        let result = [];
        if (Array.isArray(data)) {
            result = data.filter(item => item !== null && item[field] === value);
        } else if (typeof data === 'object') {
            result = Object.values(data).filter(item => item !== null && item[field] === value);
        }
        return result.reverse();
    } catch (e) {
        if (e.message && e.message.includes('Index not defined')) {
            console.warn(`Index not defined for ${collectionName} on ${field}. Falling back to manual filter...`);
            const fallbackLimit = 500; 
            const data = await getPaginated(collectionName, fallbackLimit);
            return data.filter(item => item && item[field] === value).slice(0, limit);
        }
        console.error(`Error querying ${collectionName} where ${field} === ${value}`, e);
        return [];
    }
}

async function test() {
    console.log("Fetching admins...");
    const admins = await queryDocumentsPaginated('admins', 'email', 'admin@nexora.com', 1);
    console.log("Admins result:", admins);
    process.exit(0);
}

test();
