import { getDatabase, ref, get, child, update, set, remove, query, orderByChild, equalTo, limitToFirst, limitToLast, startAt, startAfter } from "firebase/database";
import { app } from "./firebase.js";
import crypto from 'crypto';

const database = getDatabase(app);
const dbRef = ref(database, '/');

// Hashing helper
export function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

// 150+ Domains data
export const DOMAINS = [
	{ id: 1, name: 'Full Stack Development', category: 'Software & IT' },
	{ id: 2, name: 'Frontend Development', category: 'Software & IT' },
	{ id: 3, name: 'Backend Development', category: 'Software & IT' },
	{ id: 4, name: 'Mobile App Development', category: 'Software & IT' },
	{ id: 5, name: 'Android Development', category: 'Software & IT' },
	{ id: 6, name: 'iOS Development', category: 'Software & IT' },
	{ id: 7, name: 'Software Testing', category: 'Software & IT' },
	{ id: 8, name: 'Quality Assurance', category: 'Software & IT' },
	{ id: 9, name: 'Web Development', category: 'Software & IT' },
	{ id: 10, name: 'Game Development', category: 'Software & IT' },
	{ id: 11, name: 'DevOps Engineering', category: 'Software & IT' },
	{ id: 12, name: 'Cloud Computing', category: 'Software & IT' },
	{ id: 13, name: 'Cyber Security', category: 'Software & IT' },
	{ id: 14, name: 'Ethical Hacking', category: 'Software & IT' },
	{ id: 15, name: 'Blockchain Development', category: 'Software & IT' },
	{ id: 16, name: 'Internet of Things (IoT)', category: 'Software & IT' },
	{ id: 17, name: 'Embedded Systems', category: 'Software & IT' },
	{ id: 18, name: 'Artificial Intelligence', category: 'Software & IT' },
	{ id: 19, name: 'Machine Learning', category: 'Software & IT' },
	{ id: 20, name: 'Deep Learning', category: 'Software & IT' },
	{ id: 21, name: 'Data Science', category: 'Software & IT' },
	{ id: 22, name: 'Data Analytics', category: 'Software & IT' },
	{ id: 23, name: 'Business Analytics', category: 'Software & IT' },
	{ id: 24, name: 'Big Data Engineering', category: 'Software & IT' },
	{ id: 25, name: 'Database Administration', category: 'Software & IT' },
	{ id: 26, name: 'Network Administration', category: 'Software & IT' },
	{ id: 27, name: 'UI/UX Design', category: 'Software & IT' },
	{ id: 28, name: 'Product Design', category: 'Software & IT' },
	{ id: 29, name: 'AR/VR Development', category: 'Software & IT' },
	{ id: 30, name: 'Robotics', category: 'Software & IT' },

	{ id: 31, name: 'Mechanical Engineering', category: 'Engineering' },
	{ id: 32, name: 'Civil Engineering', category: 'Engineering' },
	{ id: 33, name: 'Electrical Engineering', category: 'Engineering' },
	{ id: 34, name: 'Electronics Engineering', category: 'Engineering' },
	{ id: 35, name: 'Mechatronics Engineering', category: 'Engineering' },
	{ id: 36, name: 'Automobile Engineering', category: 'Engineering' },
	{ id: 37, name: 'Aerospace Engineering', category: 'Engineering' },
	{ id: 38, name: 'Industrial Engineering', category: 'Engineering' },
	{ id: 39, name: 'Manufacturing Engineering', category: 'Engineering' },
	{ id: 40, name: 'Renewable Energy Engineering', category: 'Engineering' },

	{ id: 41, name: 'Accounting', category: 'Commerce & Finance' },
	{ id: 42, name: 'Auditing', category: 'Commerce & Finance' },
	{ id: 43, name: 'Finance', category: 'Commerce & Finance' },
	{ id: 44, name: 'Investment Banking', category: 'Commerce & Finance' },
	{ id: 45, name: 'Financial Analysis', category: 'Commerce & Finance' },
	{ id: 46, name: 'Taxation', category: 'Commerce & Finance' },
	{ id: 47, name: 'Banking Operations', category: 'Commerce & Finance' },
	{ id: 48, name: 'Insurance', category: 'Commerce & Finance' },
	{ id: 49, name: 'Stock Market Research', category: 'Commerce & Finance' },
	{ id: 50, name: 'Wealth Management', category: 'Commerce & Finance' },

	{ id: 51, name: 'Business Development', category: 'Business & Management' },
	{ id: 52, name: 'Human Resources', category: 'Business & Management' },
	{ id: 53, name: 'Operations Management', category: 'Business & Management' },
	{ id: 54, name: 'Project Management', category: 'Business & Management' },
	{ id: 55, name: 'Supply Chain Management', category: 'Business & Management' },
	{ id: 56, name: 'Logistics Management', category: 'Business & Management' },
	{ id: 57, name: 'Entrepreneurship', category: 'Business & Management' },
	{ id: 58, name: 'Strategic Management', category: 'Business & Management' },
	{ id: 59, name: 'Retail Management', category: 'Business & Management' },
	{ id: 60, name: 'Customer Relationship Management', category: 'Business & Management' },

	{ id: 61, name: 'Digital Marketing', category: 'Marketing & Sales' },
	{ id: 62, name: 'Social Media Marketing', category: 'Marketing & Sales' },
	{ id: 63, name: 'Search Engine Optimization (SEO)', category: 'Marketing & Sales' },
	{ id: 64, name: 'Search Engine Marketing (SEM)', category: 'Marketing & Sales' },
	{ id: 65, name: 'Email Marketing', category: 'Marketing & Sales' },
	{ id: 66, name: 'Affiliate Marketing', category: 'Marketing & Sales' },
	{ id: 67, name: 'Content Marketing', category: 'Marketing & Sales' },
	{ id: 68, name: 'Brand Management', category: 'Marketing & Sales' },
	{ id: 69, name: 'Market Research', category: 'Marketing & Sales' },
	{ id: 70, name: 'Sales & Lead Generation', category: 'Marketing & Sales' },

	{ id: 71, name: 'Graphic Design', category: 'Design & Creative Arts' },
	{ id: 72, name: 'Motion Graphics', category: 'Design & Creative Arts' },
	{ id: 73, name: 'Animation', category: 'Design & Creative Arts' },
	{ id: 74, name: 'Video Editing', category: 'Design & Creative Arts' },
	{ id: 75, name: 'Photography', category: 'Design & Creative Arts' },
	{ id: 76, name: 'Cinematography', category: 'Design & Creative Arts' },
	{ id: 77, name: 'Visual Effects (VFX)', category: 'Design & Creative Arts' },
	{ id: 78, name: 'Interior Design', category: 'Design & Creative Arts' },
	{ id: 79, name: 'Fashion Design', category: 'Design & Creative Arts' },
	{ id: 80, name: 'Product Design', category: 'Design & Creative Arts' },

	{ id: 81, name: 'Journalism', category: 'Media & Communication' },
	{ id: 82, name: 'Mass Communication', category: 'Media & Communication' },
	{ id: 83, name: 'Public Relations', category: 'Media & Communication' },
	{ id: 84, name: 'Corporate Communication', category: 'Media & Communication' },
	{ id: 85, name: 'Technical Writing', category: 'Media & Communication' },
	{ id: 86, name: 'Content Writing', category: 'Media & Communication' },
	{ id: 87, name: 'Copywriting', category: 'Media & Communication' },
	{ id: 88, name: 'Blogging', category: 'Media & Communication' },
	{ id: 89, name: 'Podcast Production', category: 'Media & Communication' },
	{ id: 90, name: 'Broadcasting', category: 'Media & Communication' },

	{ id: 91, name: 'Nursing', category: 'Healthcare & Medical' },
	{ id: 92, name: 'Pharmacy', category: 'Healthcare & Medical' },
	{ id: 93, name: 'Physiotherapy', category: 'Healthcare & Medical' },
	{ id: 94, name: 'Medical Coding', category: 'Healthcare & Medical' },
	{ id: 95, name: 'Clinical Research', category: 'Healthcare & Medical' },
	{ id: 96, name: 'Healthcare Administration', category: 'Healthcare & Medical' },
	{ id: 97, name: 'Public Health', category: 'Healthcare & Medical' },
	{ id: 98, name: 'Nutrition & Dietetics', category: 'Healthcare & Medical' },
	{ id: 99, name: 'Medical Laboratory Technology', category: 'Healthcare & Medical' },
	{ id: 100, name: 'Hospital Management', category: 'Healthcare & Medical' },

	{ id: 101, name: 'Teaching Assistant', category: 'Education & Research' },
	{ id: 102, name: 'Educational Technology', category: 'Education & Research' },
	{ id: 103, name: 'Academic Research', category: 'Education & Research' },
	{ id: 104, name: 'Curriculum Development', category: 'Education & Research' },
	{ id: 105, name: 'E-Learning Development', category: 'Education & Research' },

	{ id: 106, name: 'Tamil Literature', category: 'Arts, Literature & Languages' },
	{ id: 107, name: 'English Literature', category: 'Arts, Literature & Languages' },
	{ id: 108, name: 'Hindi Literature', category: 'Arts, Literature & Languages' },
	{ id: 109, name: 'Linguistics', category: 'Arts, Literature & Languages' },
	{ id: 110, name: 'Translation Services', category: 'Arts, Literature & Languages' },
	{ id: 111, name: 'Creative Writing', category: 'Arts, Literature & Languages' },

	{ id: 112, name: 'History', category: 'Social Sciences' },
	{ id: 113, name: 'Geography', category: 'Social Sciences' },
	{ id: 114, name: 'Political Science', category: 'Social Sciences' },
	{ id: 115, name: 'Sociology', category: 'Social Sciences' },
	{ id: 116, name: 'Psychology', category: 'Social Sciences' },
	{ id: 117, name: 'Anthropology', category: 'Social Sciences' },
	{ id: 118, name: 'Economics', category: 'Social Sciences' },

	{ id: 119, name: 'Legal Research', category: 'Law & Governance' },
	{ id: 120, name: 'Corporate Law', category: 'Law & Governance' },
	{ id: 121, name: 'Intellectual Property Rights', category: 'Law & Governance' },
	{ id: 122, name: 'Compliance Management', category: 'Law & Governance' },
	{ id: 123, name: 'Public Administration', category: 'Law & Governance' },

	{ id: 124, name: 'Agriculture', category: 'Agriculture & Environment' },
	{ id: 125, name: 'Agribusiness', category: 'Agriculture & Environment' },
	{ id: 126, name: 'Horticulture', category: 'Agriculture & Environment' },
	{ id: 127, name: 'Environmental Science', category: 'Agriculture & Environment' },
	{ id: 128, name: 'Sustainability Studies', category: 'Agriculture & Environment' },
	{ id: 129, name: 'Forestry', category: 'Agriculture & Environment' },
	{ id: 130, name: 'Wildlife Conservation', category: 'Agriculture & Environment' },

	{ id: 131, name: 'Hotel Management', category: 'Hospitality & Tourism' },
	{ id: 132, name: 'Tourism Management', category: 'Hospitality & Tourism' },
	{ id: 133, name: 'Travel Operations', category: 'Hospitality & Tourism' },
	{ id: 134, name: 'Event Management', category: 'Hospitality & Tourism' },
	{ id: 135, name: 'Culinary Arts', category: 'Hospitality & Tourism' },

	{ id: 136, name: 'Generative AI', category: 'Emerging Domains' },
	{ id: 137, name: 'Prompt Engineering', category: 'Emerging Domains' },
	{ id: 138, name: 'AI Automation', category: 'Emerging Domains' },
	{ id: 139, name: 'Low-Code Development', category: 'Emerging Domains' },
	{ id: 140, name: 'No-Code Development', category: 'Emerging Domains' },
	{ id: 141, name: 'Quantum Computing', category: 'Emerging Domains' },
	{ id: 142, name: 'Digital Transformation', category: 'Emerging Domains' },
	{ id: 143, name: 'Smart City Technologies', category: 'Emerging Domains' },
	{ id: 144, name: 'Green Technology', category: 'Emerging Domains' },
	{ id: 145, name: 'Space Technology', category: 'Emerging Domains' },

	{ id: 146, name: 'E-Governance', category: 'Government & Public Services' },
	{ id: 147, name: 'Rural Development', category: 'Government & Public Services' },
	{ id: 148, name: 'Urban Planning', category: 'Government & Public Services' },
	{ id: 149, name: 'Public Policy', category: 'Government & Public Services' },
	{ id: 150, name: 'Social Work', category: 'Government & Public Services' }
];

// Firebase Async Utilities

// In-memory cache for large collections to avoid Firebase timeouts
let cache = {};
let cacheTimestamps = {};
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export function invalidateCache(collectionName = null) {
	if (collectionName) {
		delete cache[collectionName];
		delete cacheTimestamps[collectionName];
	} else {
		cache = {};
		cacheTimestamps = {};
	}
}

/**
 * Gets an entire collection (array of items)
 * Stored as an array in Firebase, but might be fetched as an object with numeric keys.
 * We normalize it back to an array.
 */
export async function getCollection(collectionName) {
	const now = Date.now();
	if (cache[collectionName] && cacheTimestamps[collectionName] && now - cacheTimestamps[collectionName] < CACHE_DURATION) {
		return [...cache[collectionName]]; // Return copy to prevent accidental mutation
	}

	// 15 second timeout to prevent indefinite hangs on Firebase permission errors
	const timeout = new Promise((_, reject) =>
		setTimeout(() => reject(new Error(`Firebase timeout fetching '${collectionName}'`)), 15000)
	);

	let snapshot;
	try {
        let dbQuery = child(dbRef, collectionName);
        
        // Safety guard: prevent fetching entire massive collections at once if using getCollection directly
        const massiveCollections = ['internships', 'companies', 'students', 'applications', 'notifications', 'messages', 'systemLogs'];
        if (massiveCollections.includes(collectionName)) {
            console.warn(`WARNING: getCollection('${collectionName}') called on a large collection. Limiting to 500 records to prevent OOM/timeouts. Use getPaginated() or queryDocumentsPaginated() instead.`);
            dbQuery = query(child(dbRef, collectionName), limitToLast(500));
        }

		snapshot = await Promise.race([get(dbQuery), timeout]);
	} catch (err) {
		console.error(`getCollection('${collectionName}') failed:`, err.message);
		return []; // Return empty array — do not crash the page
	}

	if (!snapshot.exists()) return [];
	const data = snapshot.val();
	
	let result = [];
	// Normalize to array (Firebase might return an object or array)
	if (Array.isArray(data)) {
		result = data.filter(item => item !== null);
	} else if (typeof data === 'object') {
		result = Object.values(data).filter(item => item !== null);
	}
	
	cache[collectionName] = result;
	cacheTimestamps[collectionName] = now;
	return [...result];
}

/**
 * Fetch a specific item from a collection by its array index OR by its unique 'id' property.
 */
export async function getDocument(collectionName, id) {
	const results = await queryDocumentsPaginated(collectionName, 'id', id, 1);
    if (results.length > 0) return results[0];
    
    // Fallback in case it's actually an index or different schema
    const snap = await get(child(dbRef, `${collectionName}/${id}`));
    if (snap.exists()) return snap.val();

    return null;
}

export async function getCachedCompanies() {
    return await getCollection('companies');
}

/**
 * Add a new item to an array collection.
 */
export async function addDocument(collectionName, data) {
    // Determine count to append
    const snap = await get(child(dbRef, collectionName));
    let newIndex = 0;
    if (snap.exists()) {
        const val = snap.val();
        if (Array.isArray(val)) newIndex = val.length;
        else if (typeof val === 'object') newIndex = Math.max(...Object.keys(val).map(Number)) + 1;
    }
    
	await set(child(dbRef, `${collectionName}/${newIndex}`), data);
	invalidateCache(collectionName);
    
    // Update counts
    if (['companies', 'students', 'internships', 'applications'].includes(collectionName)) {
        await updateCount(collectionName, 1);
    }
}

/**
 * Update an existing item in a collection.
 */
export async function updateDocument(collectionName, id, updates) {
	const collection = await getCollection(collectionName);
	const index = collection.findIndex(item => item && item.id === id);
	if (index !== -1) {
		collection[index] = { ...collection[index], ...updates };
		// Partial update using index
		await set(child(dbRef, `${collectionName}/${index}`), collection[index]);
		invalidateCache(collectionName);
	}
}

/**
 * Delete an item from a collection
 */
export async function deleteDocument(collectionName, id) {
	const collection = await getCollection(collectionName);
	const index = collection.findIndex(item => item && item.id === id);
	if (index !== -1) {
		await remove(child(dbRef, `${collectionName}/${index}`));
		invalidateCache(collectionName);
	}
}

/**
 * Update multiple collections at once (used by refactored routes)
 */
export async function updateEntireDatabase(data) {
	await update(dbRef, data);
	invalidateCache();
}

/**
 * Fetch documents where a specific field equals a value
 */
export async function queryDocuments(collectionName, field, value) {
    try {
        const dbQuery = query(child(dbRef, collectionName), orderByChild(field), equalTo(value));
        const snapshot = await get(dbQuery);
        if (!snapshot.exists()) return [];
        
        const data = snapshot.val();
        let result = [];
        if (Array.isArray(data)) {
            result = data.filter(item => item !== null && item[field] === value);
        } else if (typeof data === 'object') {
            result = Object.values(data).filter(item => item !== null && item[field] === value);
        }
        return result;
    } catch (e) {
        if (e.message && e.message.includes('Index not defined')) {
            console.warn(`Index not defined for ${collectionName} on ${field}. Falling back to manual filter...`);
            // Fetch everything and filter
            const snapshot = await get(child(dbRef, collectionName));
            if (!snapshot.exists()) return [];
            const data = snapshot.val();
            let result = [];
            if (Array.isArray(data)) result = data;
            else if (typeof data === 'object') result = Object.values(data);
            return result.filter(item => item && item[field] === value);
        }
        console.error(`Error querying ${collectionName} where ${field} === ${value}`, e);
        return [];
    }
}

/**
 * For the seed script. Overwrites everything.
 */
export async function overwriteEntireDatabase(data) {
	await set(dbRef, data);
	invalidateCache();
}

/**
 * Fetch database metadata counts
 */
export async function getCounts() {
    const snapshot = await get(child(dbRef, 'metadata/counts'));
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return { companies: 0, students: 0, internships: 0, applications: 0 };
}

/**
 * Increment or decrement counts in metadata
 */
export async function updateCount(type, amount) {
    const counts = await getCounts();
    counts[type] = (counts[type] || 0) + amount;
    if (counts[type] < 0) counts[type] = 0;
    await set(child(dbRef, 'metadata/counts'), counts);
}

/**
 * Fetch a paginated chunk of a collection
 */
export async function getPaginated(collectionName, limit = 20) {
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
    return result.reverse(); // newest first typically
}

/**
 * Fetch documents where a specific field equals a value, with pagination limit
 */
export async function queryDocumentsPaginated(collectionName, field, value, limit = 20) {
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
            // Fallback: fetch latest limited records (or full if small) to filter manually
            const fallbackLimit = 500; 
            const data = await getPaginated(collectionName, fallbackLimit);
            return data.filter(item => item && item[field] === value).slice(0, limit);
        }
        console.error(`Error querying ${collectionName} where ${field} === ${value}`, e);
        return [];
    }
}

/**
 * Unified Logger for System Audits
 */
export async function logAction(action, details, user = 'System', role = 'System', email = 'N/A', target = 'N/A', ip = 'N/A') {
	const newLog = {
		id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
		action,
		details,
		user,
		role,
		email,
		target,
		ip,
		timestamp: new Date().toISOString()
	};
	
	// Instead of getting the whole collection, just append and rely on a cron or limit logic later if needed
    // But since it's an array, we must fetch the length or just use getPaginated to manage.
    // For now, we'll fetch only the last 50, prepend, and overwrite the array from start (not ideal for scale)
    // Actually, writing directly with push/append is better, but since it's an array based schema:
	const logs = await getPaginated('systemLogs', 50);
	logs.unshift(newLog);
	if (logs.length > 50) {
		logs.length = 50; // truncate
	}
	await set(child(dbRef, 'systemLogs'), logs);
}

// Ensure Mock resumes exist on disk locally for tests/downloads (Vercel won't persist this, but needed for dev)
import fs from 'fs';
import path from 'path';
export function ensureMockResumes() {
	try {
        const isServerless = !!(process.env.VERCEL || process.env.AWS_REGION || process.env.AWS_EXECUTION_ENV);
        const RESUMES_DIR = isServerless ? '/tmp/resumes' : path.resolve('uploads/resumes');
        if (!fs.existsSync(RESUMES_DIR)) {
            fs.mkdirSync(RESUMES_DIR, { recursive: true });
        }
		const resume1 = path.join(RESUMES_DIR, 'mock-resume.pdf');
		const resume2 = path.join(RESUMES_DIR, 'mock-resume-2.pdf');
		if (!fs.existsSync(resume1)) {
			fs.writeFileSync(resume1, 'This is a mock PDF resume for John Doe.', 'utf-8');
		}
		if (!fs.existsSync(resume2)) {
			fs.writeFileSync(resume2, 'This is a mock PDF resume for Jane Smith.', 'utf-8');
		}
	} catch (e) {
		console.error('Error writing mock resumes:', e);
	}
}
ensureMockResumes();
