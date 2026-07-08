/**
 * Nexora Internship Portal — Bulk Seed Script
 * Generates: 1000 companies, 10-12 internships each, 200 students
 * Run from project root: node seed.mjs
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update } from 'firebase/database';
import crypto from 'crypto';

// ─── Firebase Config ───────────────────────────────────────────────────────────
const firebaseConfig = {
	apiKey: "AIzaSyDPr1lV-ChuWz91HhfReg8L21WKqmH0s-g",
	authDomain: "internship-portal-705f1.firebaseapp.com",
	databaseURL: "https://internship-portal-705f1-default-rtdb.firebaseio.com",
	projectId: "internship-portal-705f1",
	storageBucket: "internship-portal-705f1.firebasestorage.app",
	messagingSenderId: "784418638868",
	appId: "1:784418638868:web:bbddff4d4780fd758d2b01"
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

const COMPANY_PREFIXES = [
	'Global', 'Prime', 'Apex', 'Nexus', 'Alpha', 'Sigma', 'Nova', 'Zenith', 'Vertex',
	'Pinnacle', 'Stellar', 'Titan', 'Atlas', 'Omega', 'Summit', 'Horizon', 'Catalyst',
	'Frontier', 'Velocity', 'Quantum', 'Fusion', 'Synergy', 'Vanguard', 'Clarity',
	'Aurora', 'Insight', 'Momentum', 'Strategic', 'Elevated', 'Advanced', 'Intellect',
	'BlueSky', 'GreenPath', 'InnoTech', 'BrightEdge', 'CoreLogic', 'DataPath',
	'NetForce', 'CloudPeak', 'SmartHub', 'TechPilot', 'DigitalWave', 'ByteForge',
	'CyberCore', 'SwiftCode', 'DeepMind', 'OpenBridge', 'MetaBase', 'NexGen',
	'ProVector', 'ClearVision', 'RapidScale', 'TrueNorth', 'IronBridge', 'SilverLine',
	'RedHaven', 'BlueChip', 'GoldMine', 'PurePath', 'SafeHarbor', 'FastTrack',
	'BroadReach', 'DeepRoot', 'HighPoint', 'LongBridge', 'SharpMind', 'QuickFlow',
	'Bright', 'Smart', 'Sure', 'Pure', 'Fast', 'Bold', 'True', 'Real', 'First',
	'NextGen', 'ProTech', 'MaxBuild', 'ZeroTo', 'InfinityEdge', 'PoweredBy', 'FutureMade'
];

const COMPANY_TYPES = [
	'Solutions', 'Technologies', 'Systems', 'Ventures', 'Labs', 'Innovations',
	'Consulting', 'Services', 'Enterprises', 'Corporation', 'Holdings', 'Group',
	'Agency', 'Studio', 'Dynamics', 'Analytics', 'Digital', 'Networks', 'Partners',
	'Associates', 'Global', 'Worldwide', 'International', 'Industries', 'Works',
	'Soft', 'Bytes', 'Codes', 'Build', 'Media', 'Hub', 'Base', 'Co', 'Inc', 'Ltd'
];

const COMPANY_CORES = [
	'Tech', 'Data', 'Cloud', 'Cyber', 'AI', 'Net', 'Web', 'Mobile', 'Dev', 'Code',
	'Soft', 'Biz', 'Info', 'Finance', 'Market', 'Design', 'Research', 'Build', 'Scale',
	'Logic', 'Sync', 'Link', 'Bridge', 'Flow', 'Stream', 'Core', 'Edge', 'Base',
	'Wave', 'Pulse', 'Spark', 'Forge', 'Craft', 'Path', 'Point', 'Source', 'Force',
	'Mind', 'Vision', 'Brand', 'Sales', 'Growth', 'Health', 'Bio', 'Agro', 'Eco',
	'Media', 'Content', 'Pixel', 'Frame', 'Space', 'Time', 'Value', 'Smart', 'Rapid'
];

const INDUSTRIES = [
	'Software & IT', 'Software & IT', 'Software & IT', 'Software & IT', // weighted higher
	'Engineering', 'Engineering',
	'Commerce & Finance', 'Commerce & Finance',
	'Business & Management', 'Business & Management',
	'Marketing & Sales',
	'Healthcare & Medical',
	'Education & Research',
	'Media & Communication',
	'Design & Creative Arts',
	'Emerging Domains',
	'Agriculture & Environment',
	'Hospitality & Tourism',
	'Government & Public Services',
	'Law & Governance'
];

const CITIES = [
	'Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
	'Ahmedabad', 'Jaipur', 'Lucknow', 'Kochi', 'Coimbatore', 'Indore', 'Nagpur',
	'Bhopal', 'Visakhapatnam', 'Vadodara', 'Surat', 'Chandigarh', 'Noida',
	'Gurgaon', 'Mysuru', 'Thiruvananthapuram', 'Patna', 'Bhubaneswar', 'Ranchi',
	'Raipur', 'Goa', 'Mohali', 'Mangaluru', 'Hubli', 'Nashik', 'Aurangabad',
	'Remote', 'Remote', 'Remote', 'Remote', 'Remote' // remote is common
];

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

const FIRST_NAMES = [
	'Aarav', 'Aditya', 'Akash', 'Akshay', 'Aman', 'Ananya', 'Anjali', 'Ankit', 'Ansh', 'Arjun',
	'Aryan', 'Deepak', 'Dhruv', 'Divya', 'Gaurav', 'Hardik', 'Harsh', 'Ishaan', 'Jatin', 'Kabir',
	'Kartik', 'Kavya', 'Kiran', 'Kriti', 'Kunal', 'Lakshmi', 'Manish', 'Meera', 'Mihir', 'Mohit',
	'Naman', 'Neha', 'Nikhil', 'Nikita', 'Nisha', 'Palak', 'Parth', 'Pooja', 'Priya', 'Rahul',
	'Ravi', 'Ritesh', 'Riya', 'Rohan', 'Rohit', 'Sachin', 'Sahil', 'Sandhya', 'Sanjay', 'Sanya',
	'Sara', 'Shikha', 'Shivam', 'Shreya', 'Siddharth', 'Simran', 'Sneha', 'Sonam', 'Srishti', 'Suresh',
	'Tanvi', 'Tarun', 'Uday', 'Umesh', 'Varun', 'Vedant', 'Vibha', 'Vikram', 'Virat', 'Vishwas',
	'Yash', 'Yogesh', 'Zara', 'Zubin', 'Aishwarya', 'Amrita', 'Bhavana', 'Chahat', 'Devanshi', 'Eesha',
	'Faisal', 'Geeta', 'Hemant', 'Ishan', 'Jhanvi', 'Keerthi', 'Lavanya', 'Madhav', 'Navya', 'Omkar',
	'Pankaj', 'Ramesh', 'Smita', 'Tarini', 'Urvashi', 'Vivek', 'Wamiq', 'Xavier', 'Yamini', 'Zunaira'
];

const LAST_NAMES = [
	'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Joshi', 'Mehta', 'Shah', 'Reddy',
	'Nair', 'Pillai', 'Iyer', 'Rao', 'Naidu', 'Mishra', 'Pandey', 'Tiwari', 'Srivastava', 'Agarwal',
	'Bansal', 'Chopra', 'Desai', 'Dubey', 'Garg', 'Khanna', 'Mahajan', 'Malhotra', 'Murthy', 'Nanda',
	'Oberoi', 'Prasad', 'Qureshi', 'Rastogi', 'Saxena', 'Tandon', 'Upadhyay', 'Vyas', 'Yadav', 'Bose',
	'Chatterjee', 'Das', 'Dey', 'Ghosh', 'Mukherjee', 'Roy', 'Sen', 'Chaudhary', 'Jain', 'Kapoor'
];

const COLLEGES = [
	'IIT Delhi', 'IIT Bombay', 'IIT Madras', 'IIT Kanpur', 'IIT Kharagpur', 'NIT Trichy',
	'NIT Warangal', 'NIT Calicut', 'BITS Pilani', 'VIT University', 'Manipal University',
	'SRM Institute of Technology', 'Amity University', 'Symbiosis University', 'Christ University',
	'Anna University', 'Pune University', 'Mumbai University', 'Delhi University', 'Osmania University',
	'Jadavpur University', 'Calcutta University', 'Banaras Hindu University', 'AMU', 'Jamia Millia Islamia',
	'PSG College of Technology', 'Coimbatore Institute of Technology', 'College of Engineering Pune',
	'Thapar University', 'Chandigarh University', 'Lovely Professional University', 'GLA University',
	'Kalinga Institute of Industrial Technology', 'SASTRA University', 'Karunya University',
	'Vellore Institute of Technology', 'Sri Ramachandra University', 'Meenakshi College',
	'RVCE Bengaluru', 'MSRIT Bengaluru', 'BMS College of Engineering', 'PES University',
	'Dayananda Sagar University', 'Jain University', 'Reva University', 'Alliance University'
];

const DEPARTMENTS = [
	'Computer Science', 'Information Technology', 'Electronics and Communication',
	'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering',
	'Data Science', 'Artificial Intelligence', 'Cybersecurity', 'Business Administration',
	'Commerce', 'Finance', 'Marketing', 'Human Resources', 'Design',
	'Mass Communication', 'Biotechnology', 'Chemical Engineering', 'Mathematics', 'Physics'
];

const DEGREE_COURSES = [
	'Bachelor of Technology', 'Master of Technology', 'Bachelor of Engineering',
	'Bachelor of Commerce', 'Master of Commerce', 'Bachelor of Business Administration',
	'Master of Business Administration', 'Bachelor of Science', 'Master of Science',
	'Bachelor of Arts', 'Bachelor of Computer Applications', 'Master of Computer Applications'
];

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
	const isSuspended = status === 'Approved' && rand(1, 20) === 1; // 5% chance

	const emailDomains = ['gmail.com', 'company.com', 'corp.in', 'solutions.io', 'tech.co', 'group.in', 'ventures.com'];
	const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 12);

	return {
		id,
		companyName: name,
		companyEmail: `hr@${slug}.${pick(emailDomains.slice(1))}`,
		companyContactNumber: `9${rand(100000000, 999999999)}`,
		website: `https://www.${slug}.com`,
		companyAddress: `${rand(1, 500)} ${pick(['Tech Park', 'Business Hub', 'Commercial Complex', 'Industrial Area', 'Corporate Tower'])}, ${city}`,
		companyDescription: `${name} is a ${pick(['leading', 'pioneering', 'rapidly growing', 'innovative', 'established'])} ${industry} company based in ${city}. We are committed to excellence, innovation, and creating meaningful career opportunities for students and professionals.`,
		industryType: industry,
		companyLogo: '',
		password: hashPassword('company123'),
		status,
		isSuspended: isSuspended,
		createdAt: dateAgo(rand(30, 730))
	};
}

function generateInternship(company, internshipIndex) {
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
	const id = `intern_${company.id}_${internshipIndex}`;

	const jobTitles = [
		`${domain} Intern`, `Junior ${domain} Associate`, `${domain} Trainee`,
		`${domain} Apprentice`, `${domain} Research Intern`, `${domain} Project Intern`,
		`${domain} Analyst Intern`, `${domain} Development Intern`, `Assistant ${domain} Specialist`
	];

	return {
		id,
		companyId: company.id,
		title: pick(jobTitles),
		domain,
		skillsRequired: selectedSkills,
		description: pick(DESCRIPTIONS),
		learningOutcomes: pick(LEARNING_OUTCOMES),
		responsibilities: `Collaborate with the ${domain} team to deliver high-quality work. Participate in daily standups, code reviews, and team sprints. Research and implement solutions to real business problems. Document your work and present findings to supervisors.`,
		eligibilityCriteria: `Pursuing ${pick(DEGREE_COURSES)} in ${pick(DEPARTMENTS)} or related field. Good understanding of ${selectedSkills[0]} and ${selectedSkills[1] || 'related tools'}. Strong communication skills and eagerness to learn.`,
		duration,
		startDate: dateFuture(startDays),
		lastDateToApply: dateFuture(startDays - 7),
		mode,
		type,
		fee,
		stipendAmount: stipend,
		openings: rand(1, 10),
		location,
		certificateAvailable: pick(['Yes', 'Yes', 'Yes', 'No']), // 75% offer cert
		jobOpportunity: pick(['Yes', 'Yes', 'No']), // 66% offer job opp
		status: rand(1, 10) <= 8 ? 'Active' : 'Closed', // 80% active
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
		address: `${rand(1, 200)}, ${pick(['Gandhi Nagar', 'MG Road', 'Nehru Street', 'Park Avenue', 'College Road', 'Station Road', 'Main Bazaar'])}, ${pick(CITIES.filter(c => c !== 'Remote'))}`,
		profilePhoto: '',
		resumePath: '',
		isBlocked: false,
		createdAt: dateAgo(rand(1, 365))
	};
}

// ─── Seed Function ─────────────────────────────────────────────────────────────

async function seed() {
	const COMPANY_COUNT = 1000;
	const STUDENT_COUNT = 250;
	const MIN_INTERNSHIPS_PER_COMPANY = 10;
	const MAX_INTERNSHIPS_PER_COMPANY = 13;
	const BATCH_SIZE = 100; // companies per batch

	console.log('🚀 Nexora Seed Script Starting...');
	console.log(`   📦 Generating ${COMPANY_COUNT} companies, ${STUDENT_COUNT} students...`);

	// ── Generate Students ──────────────────────────────────────────────────────
	console.log('\n📚 Generating students...');
	const students = [];
	for (let i = 0; i < STUDENT_COUNT; i++) {
		students.push(generateStudent(i));
	}
	console.log(`   ✅ ${students.length} students generated`);

	// ── Admin ──────────────────────────────────────────────────────────────────
	const admins = [
		{
			id: 'admin_1',
			fullName: 'Nexora Super Admin',
			email: 'admin@nexora.com',
			password: hashPassword('admin123'),
			role: 'admin',
			createdAt: dateAgo(365)
		}
	];

	// ── Generate Companies + Internships in batches ────────────────────────────
	console.log('\n🏢 Generating companies & internships in batches...');

	const allCompanies = [];
	const allInternships = [];

	for (let i = 0; i < COMPANY_COUNT; i++) {
		const company = generateCompany(i);
		allCompanies.push(company);

		const internshipsCount = rand(MIN_INTERNSHIPS_PER_COMPANY, MAX_INTERNSHIPS_PER_COMPANY);
		for (let j = 0; j < internshipsCount; j++) {
			allInternships.push(generateInternship(company, j + 1));
		}

		if ((i + 1) % 100 === 0) {
			console.log(`   Generated ${i + 1} companies (${allInternships.length} internships so far)...`);
		}
	}

	console.log(`\n   ✅ ${allCompanies.length} companies generated`);
	console.log(`   ✅ ${allInternships.length} internships generated`);

	// ── Write to Firebase in batches ───────────────────────────────────────────
	console.log('\n🔥 Writing to Firebase Realtime Database...');
	console.log('   (This may take 30-60 seconds for 10,000+ records)\n');

	// Write students and admins first (small)
	try {
		await set(ref(database, 'students'), students);
		console.log(`   ✅ ${students.length} students written`);

		await set(ref(database, 'admins'), admins);
		console.log(`   ✅ ${admins.length} admin written`);

		// Initialize empty collections
		await set(ref(database, 'applications'), []);
		await set(ref(database, 'messages'), []);
		await set(ref(database, 'notifications'), []);
		await set(ref(database, 'systemLogs'), []);
		await set(ref(database, 'emailTemplates'), []);
		console.log(`   ✅ Empty collections initialized`);
	} catch (err) {
		console.error('   ❌ Error writing initial data:', err.message);
		process.exit(1);
	}

	// Write companies in batches of 100
	console.log(`\n   Writing ${allCompanies.length} companies in batches of ${BATCH_SIZE}...`);
	const allCompaniesChunks = [];
	for (let i = 0; i < allCompanies.length; i += BATCH_SIZE) {
		allCompaniesChunks.push(allCompanies.slice(i, i + BATCH_SIZE));
	}

	// Write all companies at once (it's one object in Firebase)
	try {
		await set(ref(database, 'companies'), allCompanies);
		console.log(`   ✅ ${allCompanies.length} companies written`);
	} catch (err) {
		console.error('   ❌ Error writing companies:', err.message);
		process.exit(1);
	}

	// Write internships in batches of 500 to avoid timeouts
	console.log(`\n   Writing ${allInternships.length} internships in batches of 500...`);
	const INTERNSHIP_BATCH = 500;
	for (let i = 0; i < allInternships.length; i += INTERNSHIP_BATCH) {
		const chunk = allInternships.slice(i, i + INTERNSHIP_BATCH);
		try {
			// Use update with indexed paths to append to the array
			const updatePayload = {};
			chunk.forEach((internship, idx) => {
				updatePayload[`internships/${i + idx}`] = internship;
			});
			await update(dbRef, updatePayload);
			console.log(`   ✅ Internships ${i + 1}–${Math.min(i + INTERNSHIP_BATCH, allInternships.length)} written`);
		} catch (err) {
			console.error(`   ❌ Error writing internship batch starting at ${i}:`, err.message);
		}
	}

	// ── Final Summary ──────────────────────────────────────────────────────────
	console.log('\n' + '═'.repeat(60));
	console.log('🎉 SEED COMPLETE!');
	console.log('═'.repeat(60));
	console.log(`   👥 Students: ${students.length} (password: student123)`);
	console.log(`   🏢 Companies: ${allCompanies.length} (password: company123)`);
	console.log(`   📋 Internships: ${allInternships.length}`);
	console.log(`   🔑 Admin: admin@nexora.com (password: admin123)`);
	console.log('');
	console.log('   Approved companies: ' + allCompanies.filter(c => c.status === 'Approved').length);
	console.log('   Pending companies:  ' + allCompanies.filter(c => c.status === 'Pending').length);
	console.log('   Active internships: ' + allInternships.filter(i => i.status === 'Active').length);
	console.log('═'.repeat(60));
	console.log('');
	console.log('   Run: npm run dev → http://localhost:5173');
	console.log('   Login as admin: admin@nexora.com / admin123');
	console.log('');

	process.exit(0);
}

seed().catch(err => {
	console.error('\n❌ Seed failed:', err);
	process.exit(1);
});
