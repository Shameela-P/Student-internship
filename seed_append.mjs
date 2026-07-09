import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, update } from 'firebase/database';
import crypto from 'crypto';

// ─── Firebase Config ───────────────────────────────────────────────────────────
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

// ─── Helpers ───────────────────────────────────────────────────────────────────
function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString('hex');
	const hash = crypto.scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) {
	const shuffled = [...arr].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, n);
}
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function uid(prefix) { return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`; }
function dateAgo(days) { const d = new Date(); d.setDate(d.getDate() - days); return d.toISOString(); }
function dateFuture(days) { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().split('T')[0]; }

// ─── Data Banks ────────────────────────────────────────────────────────────────
const COMPANY_PREFIXES = ['Global', 'Prime', 'Apex', 'Nexus', 'Alpha', 'Sigma', 'Nova', 'Zenith', 'Vertex', 'Pinnacle', 'Stellar', 'Titan', 'Atlas', 'Omega', 'Summit', 'Horizon', 'Catalyst', 'Frontier', 'Velocity', 'Quantum', 'Fusion', 'Synergy', 'Vanguard', 'Clarity', 'Aurora', 'Insight', 'Momentum', 'Strategic', 'Elevated', 'Advanced', 'Intellect', 'BlueSky', 'GreenPath', 'InnoTech', 'BrightEdge', 'CoreLogic', 'DataPath', 'NetForce', 'CloudPeak', 'SmartHub', 'TechPilot', 'DigitalWave', 'ByteForge', 'CyberCore', 'SwiftCode', 'DeepMind', 'OpenBridge', 'MetaBase', 'NexGen', 'ProVector', 'ClearVision', 'RapidScale', 'TrueNorth', 'IronBridge', 'SilverLine', 'RedHaven', 'BlueChip', 'GoldMine', 'PurePath', 'SafeHarbor', 'FastTrack', 'BroadReach', 'DeepRoot', 'HighPoint', 'LongBridge', 'SharpMind', 'QuickFlow', 'Bright', 'Smart', 'Sure', 'Pure', 'Fast', 'Bold', 'True', 'Real', 'First', 'NextGen', 'ProTech', 'MaxBuild', 'ZeroTo', 'InfinityEdge', 'PoweredBy', 'FutureMade'];
const COMPANY_TYPES = ['Solutions', 'Technologies', 'Systems', 'Ventures', 'Labs', 'Innovations', 'Consulting', 'Services', 'Enterprises', 'Corporation', 'Holdings', 'Group', 'Agency', 'Studio', 'Dynamics', 'Analytics', 'Digital', 'Networks', 'Partners', 'Associates', 'Global', 'Worldwide', 'International', 'Industries', 'Works', 'Soft', 'Bytes', 'Codes', 'Build', 'Media', 'Hub', 'Base', 'Co', 'Inc', 'Ltd'];
const COMPANY_CORES = ['Tech', 'Data', 'Cloud', 'Cyber', 'AI', 'Net', 'Web', 'Mobile', 'Dev', 'Code', 'Soft', 'Biz', 'Info', 'Finance', 'Market', 'Design', 'Research', 'Build', 'Scale', 'Logic', 'Sync', 'Link', 'Bridge', 'Flow', 'Stream', 'Core', 'Edge', 'Base', 'Wave', 'Pulse', 'Spark', 'Forge', 'Craft', 'Path', 'Point', 'Source', 'Force', 'Mind', 'Vision', 'Brand', 'Sales', 'Growth', 'Health', 'Bio', 'Agro', 'Eco', 'Media', 'Content', 'Pixel', 'Frame', 'Space', 'Time', 'Value', 'Smart', 'Rapid'];
const INDUSTRIES = ['Software & IT', 'Software & IT', 'Software & IT', 'Software & IT', 'Engineering', 'Engineering', 'Commerce & Finance', 'Commerce & Finance', 'Business & Management', 'Business & Management', 'Marketing & Sales', 'Healthcare & Medical', 'Education & Research', 'Media & Communication', 'Design & Creative Arts', 'Emerging Domains', 'Agriculture & Environment', 'Hospitality & Tourism', 'Government & Public Services', 'Law & Governance'];
const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore', 'Indore', 'Nagpur', 'Bhopal', 'Visakhapatnam', 'Vadodara', 'Surat', 'Chandigarh', 'Noida', 'Gurgaon', 'Mysuru', 'Thiruvananthapuram', 'Patna', 'Bhubaneswar', 'Ranchi', 'Raipur', 'Goa', 'Mohali', 'Mangaluru', 'Hubli', 'Nashik', 'Aurangabad', 'Remote', 'Remote', 'Remote', 'Remote', 'Remote'];

const DOMAINS_BY_INDUSTRY = {
	'Software & IT': ['Full Stack Development', 'Frontend Development', 'Backend Development', 'Mobile App Development', 'Android Development', 'iOS Development', 'DevOps Engineering', 'Cloud Computing', 'Cyber Security', 'Artificial Intelligence', 'Machine Learning', 'Data Science', 'Data Analytics', 'UI/UX Design', 'Software Testing', 'Blockchain Development', 'Web Development', 'Embedded Systems', 'Internet of Things (IoT)', 'AR/VR Development'],
	'Engineering': ['Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering', 'Electronics Engineering', 'Mechatronics Engineering', 'Automobile Engineering', 'Aerospace Engineering', 'Industrial Engineering', 'Manufacturing Engineering', 'Renewable Energy Engineering'],
	'Commerce & Finance': ['Accounting', 'Finance', 'Investment Banking', 'Financial Analysis', 'Taxation', 'Banking Operations', 'Insurance', 'Stock Market Research', 'Wealth Management', 'Auditing'],
	'Business & Management': ['Business Development', 'Human Resources', 'Operations Management', 'Project Management', 'Supply Chain Management', 'Entrepreneurship', 'Strategic Management', 'Retail Management', 'Customer Relationship Management', 'Logistics Management'],
	'Marketing & Sales': ['Digital Marketing', 'Social Media Marketing', 'Search Engine Optimization (SEO)', 'Content Marketing', 'Brand Management', 'Market Research', 'Sales & Lead Generation', 'Email Marketing', 'Affiliate Marketing', 'Search Engine Marketing (SEM)'],
	'Healthcare & Medical': ['Nursing', 'Pharmacy', 'Physiotherapy', 'Medical Coding', 'Clinical Research', 'Healthcare Administration', 'Public Health', 'Medical Laboratory Technology', 'Hospital Management', 'Nutrition & Dietetics'],
	'Education & Research': ['Teaching Assistant', 'Educational Technology', 'Academic Research', 'Curriculum Development', 'E-Learning Development'],
	'Media & Communication': ['Journalism', 'Mass Communication', 'Public Relations', 'Corporate Communication', 'Technical Writing', 'Content Writing', 'Copywriting', 'Blogging', 'Podcast Production', 'Broadcasting'],
	'Design & Creative Arts': ['Graphic Design', 'Motion Graphics', 'Animation', 'Video Editing', 'Photography', 'Cinematography', 'Interior Design', 'Fashion Design', 'UI/UX Design', 'Visual Effects (VFX)'],
	'Emerging Domains': ['Generative AI', 'Prompt Engineering', 'AI Automation', 'Low-Code Development', 'No-Code Development', 'Quantum Computing', 'Digital Transformation', 'Smart City Technologies', 'Green Technology', 'Space Technology'],
	'Agriculture & Environment': ['Agriculture', 'Agribusiness', 'Horticulture', 'Environmental Science', 'Sustainability Studies', 'Forestry', 'Wildlife Conservation'],
	'Hospitality & Tourism': ['Hotel Management', 'Tourism Management', 'Travel Operations', 'Event Management', 'Culinary Arts'],
	'Government & Public Services': ['E-Governance', 'Rural Development', 'Urban Planning', 'Public Policy', 'Social Work'],
	'Law & Governance': ['Legal Research', 'Corporate Law', 'Intellectual Property Rights', 'Compliance Management', 'Public Administration']
};

const SKILLS_MAP = {
	'Full Stack Development': ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Next.js', 'PostgreSQL'],
	'Frontend Development': ['React', 'Vue.js', 'Angular', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
	'Backend Development': ['Node.js', 'Python', 'Java', 'Django', 'REST APIs', 'PostgreSQL', 'MongoDB'],
	'Mobile App Development': ['Flutter', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'Android SDK'],
	'Android Development': ['Kotlin', 'Java', 'Android SDK', 'Firebase', 'REST APIs', 'Jetpack Compose'],
	'iOS Development': ['Swift', 'Objective-C', 'Xcode', 'SwiftUI', 'Core Data', 'Firebase'],
	'DevOps Engineering': ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'AWS', 'Linux', 'Terraform'],
	'Cloud Computing': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Serverless'],
	'Cyber Security': ['Penetration Testing', 'SIEM', 'Firewalls', 'Network Security', 'OWASP', 'Linux'],
	'Artificial Intelligence': ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Scikit-learn'],
	'Machine Learning': ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Deep Learning'],
	'Data Science': ['Python', 'R', 'SQL', 'Tableau', 'Machine Learning', 'Statistics', 'Pandas'],
	'Data Analytics': ['Excel', 'SQL', 'Power BI', 'Tableau', 'Python', 'Google Analytics'],
	'UI/UX Design': ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing'],
	'Digital Marketing': ['Google Ads', 'Meta Ads', 'SEO', 'Content Strategy', 'Analytics', 'Email Marketing'],
	'Social Media Marketing': ['Instagram', 'Facebook', 'LinkedIn', 'Content Creation', 'Analytics', 'Canva'],
	'Mechanical Engineering': ['SolidWorks', 'AutoCAD', 'ANSYS', 'CATIA', 'Matlab', 'Manufacturing'],
	'Civil Engineering': ['AutoCAD', 'STAAD Pro', 'Revit', 'Survey', 'Structural Analysis', 'Estimation'],
	'Electrical Engineering': ['Circuit Design', 'PLC', 'MATLAB', 'AutoCAD Electrical', 'Power Systems'],
	'Finance': ['Financial Modeling', 'Excel', 'Bloomberg', 'Valuation', 'Accounting', 'Risk Analysis'],
	'Accounting': ['Tally', 'Excel', 'GST', 'Accounting', 'Financial Statements', 'Tax Filing'],
	'Graphic Design': ['Adobe Photoshop', 'Illustrator', 'Figma', 'InDesign', 'Typography', 'Branding'],
	'Content Writing': ['SEO Writing', 'Blogging', 'Research', 'MS Word', 'Grammar', 'Copywriting'],
	'Human Resources': ['HR Policies', 'Recruitment', 'Excel', 'Payroll', 'Training', 'HRIS'],
	'Business Development': ['Sales', 'CRM', 'Market Research', 'Negotiation', 'Excel', 'Presentation'],
	'default': ['Communication', 'MS Office', 'Research', 'Problem Solving', 'Teamwork', 'Excel']
};

const DESCRIPTIONS = [
	'Join our fast-growing team and work on real-world projects that impact thousands of users. Gain hands-on experience in a collaborative environment with mentorship from senior professionals.',
	'Be part of an innovative team that is disrupting the industry. You will work alongside domain experts and contribute to cutting-edge product development from day one.',
	'This internship offers you the chance to develop critical skills while working on high-impact projects. Our mentors will guide you through every step of your professional growth.',
	'An exciting opportunity to work with a dynamic team on challenging problems. You will be given real responsibilities and your contributions will directly affect our product roadmap.',
	'We are looking for passionate interns who are eager to learn and grow. You will receive one-on-one mentorship, attend team meetings, and contribute to live production systems.',
	'Kick-start your career with us. This role provides hands-on exposure to industry-standard tools and practices, preparing you for a successful professional career.',
	'This is a structured internship program where you will solve real business challenges. Regular feedback sessions and a dedicated mentor ensure a transformative learning experience.',
	'Work with our expert team on client-facing deliverables. You will attend client meetings, contribute to strategy, and present your findings to senior leadership.',
	'A premier internship for high-achievers who want to make an impact. We offer a supportive culture, competitive stipend, and the possibility of a pre-placement offer.',
	'Experience the thrill of building products from scratch. Our engineering culture values curiosity, ownership, and collaboration — we want you to think like a co-founder.'
];

const LEARNING_OUTCOMES = [
	'Gain proficiency in industry-standard tools and frameworks. Build a strong portfolio of real projects. Develop professional communication and collaboration skills.',
	'Understand the end-to-end product development lifecycle. Learn agile methodologies and version control practices. Develop domain-specific technical expertise.',
	'Master the fundamentals of your chosen domain through practical application. Build a professional network and receive a verified completion certificate.',
	'Develop problem-solving abilities in a professional setting. Learn to write clean, maintainable code (or structured work). Improve your ability to manage deadlines.',
	'Work with cross-functional teams to understand how businesses operate. Gain exposure to client management, stakeholder communication, and project delivery.',
	'Understand best practices, industry standards, and compliance requirements. Learn to analyze data and derive actionable insights for business decisions.'
];

const DURATIONS = ['1 Month', '2 Months', '3 Months', '4 Months', '6 Months', '1 Year'];
const MODES = ['Online', 'Offline', 'Hybrid'];
const TYPES = ['Free', 'Free + Stipend', 'Paid', 'Paid + Stipend'];

// ─── Student Data ──────────────────────────────────────────────────────────────
const FIRST_NAMES = ['Aarav', 'Aditya', 'Akash', 'Akshay', 'Aman', 'Ananya', 'Anjali', 'Ankit', 'Ansh', 'Arjun', 'Aryan', 'Deepak', 'Dhruv', 'Divya', 'Gaurav', 'Hardik', 'Harsh', 'Ishaan', 'Jatin', 'Kabir', 'Kartik', 'Kavya', 'Kiran', 'Kriti', 'Kunal', 'Lakshmi', 'Manish', 'Meera', 'Mihir', 'Mohit', 'Naman', 'Neha', 'Nikhil', 'Nikita', 'Nisha', 'Palak', 'Parth', 'Pooja', 'Priya', 'Rahul', 'Ravi', 'Ritesh', 'Riya', 'Rohan', 'Rohit', 'Sachin', 'Sahil', 'Sandhya', 'Sanjay', 'Sanya', 'Sara', 'Shikha', 'Shivam', 'Shreya', 'Siddharth', 'Simran', 'Sneha', 'Sonam', 'Srishti', 'Suresh', 'Tanvi', 'Tarun', 'Uday', 'Umesh', 'Varun', 'Vedant', 'Vibha', 'Vikram', 'Virat', 'Vishwas', 'Yash', 'Yogesh', 'Zara', 'Zubin'];
const LAST_NAMES = ['Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Mehta', 'Shah', 'Reddy', 'Nair', 'Pillai', 'Iyer', 'Rao', 'Naidu', 'Mishra', 'Pandey', 'Tiwari', 'Srivastava', 'Agarwal', 'Bansal', 'Chopra', 'Desai', 'Dubey', 'Garg', 'Khanna', 'Mahajan', 'Malhotra', 'Murthy', 'Nanda', 'Oberoi', 'Prasad', 'Qureshi', 'Rastogi', 'Saxena', 'Tandon', 'Upadhyay', 'Vyas', 'Yadav'];
const COLLEGES = ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur', 'NIT Trichy', 'NIT Warangal', 'NIT Calicut', 'BITS Pilani', 'VIT University', 'Manipal University', 'SRM Institute of Technology', 'Amity University', 'Symbiosis University', 'Christ University', 'Anna University', 'Pune University', 'Mumbai University', 'Delhi University', 'Osmania University'];
const DEPARTMENTS = ['Computer Science', 'Information Technology', 'Electronics and Communication', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Data Science', 'Artificial Intelligence', 'Cybersecurity', 'Business Administration', 'Commerce', 'Finance', 'Marketing', 'Human Resources', 'Design', 'Mass Communication', 'Biotechnology', 'Chemical Engineering', 'Mathematics', 'Physics'];
const DEGREE_COURSES = ['Bachelor of Technology', 'Master of Technology', 'Bachelor of Engineering', 'Bachelor of Commerce', 'Master of Commerce', 'Bachelor of Business Administration', 'Master of Business Administration', 'Bachelor of Science', 'Master of Science', 'Bachelor of Arts', 'Bachelor of Computer Applications', 'Master of Computer Applications'];
const YEARS = ['1', '2', '3', '4'];

// ─── Generator Functions ───────────────────────────────────────────────────────
function generateCompanyName(industry) {
	const style = rand(0, 2);
	if (style === 0) return `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_TYPES)}`;
	if (style === 1) return `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_CORES)} ${pick(COMPANY_TYPES)}`;
	return `${pick(COMPANY_CORES)}${pick(COMPANY_TYPES)}`;
}

function generateCompany(index) {
	const industry = pick(INDUSTRIES);
	const name = generateCompanyName(industry);
	const city = pick(CITIES);
	const id = `comp_${index + 1}`;
	const statusRoll = rand(1, 10);
	const status = statusRoll <= 7 ? 'Approved' : statusRoll <= 9 ? 'Pending' : 'Rejected';
	const isSuspended = status === 'Approved' && rand(1, 20) === 1;

	const emailDomains = ['gmail.com', 'company.com', 'corp.in', 'solutions.io', 'tech.co', 'group.in', 'ventures.com'];
	const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 12);

	return {
		id,
		companyName: name,
		companyEmail: `hr@${slug}.${pick(emailDomains.slice(1))}`,
		companyContactNumber: `9${rand(100000000, 999999999)}`,
		website: `https://www.${slug}.com`,
		companyAddress: `${rand(1, 500)} ${pick(['Tech Park', 'Business Hub', 'Commercial Complex', 'Industrial Area', 'Corporate Tower'])}, ${city}`,
		companyDescription: `${name} is a ${pick(['leading', 'pioneering', 'rapidly growing', 'innovative', 'established'])} ${industry} company based in ${city}.`,
		industryType: industry,
		companyLogo: '',
		password: hashPassword('company123'),
		status,
		isSuspended: isSuspended,
		createdAt: dateAgo(rand(30, 730))
	};
}

function generateInternship(company, index) {
	const domainList = DOMAINS_BY_INDUSTRY[company.industryType] || DOMAINS_BY_INDUSTRY['Software & IT'];
	const domain = pick(domainList);
	const skills = SKILLS_MAP[domain] || SKILLS_MAP['default'];
	const selectedSkills = pickN(skills, rand(3, 5));
	const mode = pick(MODES);
	const type = pick(TYPES);
	const duration = pick(DURATIONS);
	const location = mode === 'Online' ? 'Remote' : pick(CITIES.filter(c => c !== 'Remote'));
	const fee = type.includes('Paid') ? pick([500, 1000, 1500, 2000, 3000, 5000, 6500]) : 0;
	const stipend = type.includes('Stipend') ? pick([3000, 5000, 8000, 10000, 12000, 15000, 20000]) : 0;
	const startDays = rand(10, 60);
	const id = `intern_${company.id}_${index}`;

	const jobTitles = [`${domain} Intern`, `Junior ${domain} Associate`, `${domain} Trainee`, `${domain} Apprentice`, `${domain} Research Intern`, `${domain} Project Intern`, `${domain} Analyst Intern`, `${domain} Development Intern`, `Assistant ${domain} Specialist`];

	return {
		id,
		companyId: company.id,
		title: pick(jobTitles),
		domain,
		skillsRequired: selectedSkills,
		description: pick(DESCRIPTIONS),
		learningOutcomes: pick(LEARNING_OUTCOMES),
		responsibilities: `Collaborate with the ${domain} team to deliver high-quality work. Participate in daily standups, code reviews, and team sprints.`,
		eligibilityCriteria: `Pursuing ${pick(DEGREE_COURSES)} in ${pick(DEPARTMENTS)} or related field. Good understanding of ${selectedSkills[0]} and ${selectedSkills[1] || 'related tools'}.`,
		duration,
		startDate: dateFuture(startDays),
		lastDateToApply: dateFuture(startDays - 7),
		mode,
		type,
		fee,
		stipendAmount: stipend,
		openings: rand(1, 10),
		location,
		certificateAvailable: pick(['Yes', 'Yes', 'Yes', 'No']),
		jobOpportunity: pick(['Yes', 'Yes', 'No']),
		status: rand(1, 10) <= 8 ? 'Active' : 'Closed',
		bannerPath: '',
		subCategory: domain,
		createdAt: dateAgo(rand(5, 90))
	};
}

function generateStudent(index) {
	const firstName = pick(FIRST_NAMES);
	const lastName = pick(LAST_NAMES);
	const fullName = `${firstName} ${lastName}`;
	const college = pick(COLLEGES);
	const department = pick(DEPARTMENTS);
	const allSkillSets = Object.values(SKILLS_MAP).flat();
	const skills = pickN(allSkillSets, rand(3, 8));
	const id = `stud_${index + 1}`;
	const emailSlug = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${rand(10, 999)}`;

	return {
		id,
		fullName,
		email: `${emailSlug}@gmail.com`,
		mobileNumber: `9${rand(100000000, 999999999)}`,
		password: hashPassword('student123'),
		collegeName: college,
		degreeCourse: pick(DEGREE_COURSES),
		department,
		yearOfStudy: pick(YEARS),
		currentStatus: 'Student',
		skills,
		address: `${rand(1, 200)}, ${pick(['Gandhi Nagar', 'MG Road', 'Nehru Street', 'Park Avenue'])}, ${pick(CITIES.filter(c => c !== 'Remote'))}`,
		profilePhoto: '',
		resumePath: '',
		isBlocked: false,
		createdAt: dateAgo(rand(1, 365))
	};
}

async function seedAppend() {
	console.log('Fetching current database lengths...');
	
	// Fetch existing lists lengths
	const getArrayLen = async (coll) => {
		const snap = await get(child(dbRef, coll));
		if (!snap.exists()) return 0;
		const val = snap.val();
		if (Array.isArray(val)) return val.length;
		if (typeof val === 'object') return Math.max(...Object.keys(val).map(Number)) + 1;
		return 0;
	};

	const [companiesLen, studentsLen, internshipsLen] = await Promise.all([
		getArrayLen('companies'),
		getArrayLen('students'),
		getArrayLen('internships')
	]);

	console.log(`Current companies: ${companiesLen}, students: ${studentsLen}, internships: ${internshipsLen}`);

	const COMPANY_COUNT = 450;
	const STUDENT_COUNT = 400;
	const INTERNSHIPS_PER_COMPANY = 11; // 10 or more

	const updatePayload = {};

	// Generate and append companies
	console.log('Generating additional companies and internships...');
	let internshipOffset = internshipsLen;
	
	for (let i = 0; i < COMPANY_COUNT; i++) {
		const compIdx = companiesLen + i;
		const company = generateCompany(compIdx);
		updatePayload[`companies/${compIdx}`] = company;

		for (let j = 0; j < INTERNSHIPS_PER_COMPANY; j++) {
			const internIdx = internshipOffset++;
			updatePayload[`internships/${internIdx}`] = generateInternship(company, internIdx);
		}
	}

	// Generate and append students
	console.log('Generating additional students...');
	for (let i = 0; i < STUDENT_COUNT; i++) {
		const studIdx = studentsLen + i;
		updatePayload[`students/${studIdx}`] = generateStudent(studIdx);
	}

	console.log(`Updating Firebase with ${Object.keys(updatePayload).length} keys...`);
	await update(dbRef, updatePayload);

	console.log('Data successfully appended!');
	process.exit(0);
}

seedAppend().catch(err => {
	console.error('Failed to append data:', err);
	process.exit(1);
});
