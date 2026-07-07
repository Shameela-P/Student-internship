import { getCollection, updateEntireDatabase } from '../src/lib/db.js';

const TITLES = [
  'Software Engineer Intern', 'Frontend Developer Intern', 'Backend Developer Intern', 
  'Full Stack Developer Intern', 'Data Analyst Intern', 'Data Science Intern', 
  'Machine Learning Intern', 'DevOps Intern', 'Cloud Engineer Intern', 
  'Cyber Security Intern', 'UI/UX Designer Intern', 'Mobile App Developer Intern', 
  'QA Automation Intern', 'Product Management Intern', 'Business Analyst Intern'
];

const LOCATIONS = ['Remote', 'Bangalore, India', 'Hyderabad, India', 'Pune, India', 'Chennai, India', 'Mumbai, India', 'Delhi, India'];
const MODES = ['Remote', 'Hybrid', 'Offline'];
const TYPES = ['Paid Internship', 'Free Internship', 'Paid + Stipend', 'Free + Stipend'];
const DOMAINS = ['Software & IT', 'Business & Management', 'Marketing & Sales', 'Engineering', 'Design & Creative Arts'];

const SKILLS = [
  ['React', 'JavaScript', 'Tailwind CSS'],
  ['Node.js', 'Express', 'MongoDB'],
  ['Python', 'SQL', 'Data Analysis'],
  ['Figma', 'Prototyping', 'User Research'],
  ['Java', 'Spring Boot', 'MySQL'],
  ['AWS', 'Docker', 'Kubernetes'],
  ['Flutter', 'Dart', 'Mobile Dev']
];

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDateWithin30Days() {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString();
}

function getRandomDeadline() {
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 60) + 7);
  return date.toISOString().split('T')[0];
}

async function runSeed() {
  console.log('Fetching database...');
  const db = {
    students: await getCollection('students'),
    companies: await getCollection('companies'),
    internships: await getCollection('internships'),
    applications: await getCollection('applications'),
    notifications: await getCollection('notifications'),
    emailTemplates: await getCollection('emailTemplates'),
    systemLogs: await getCollection('systemLogs')
  };

  const verifiedCompanies = db.companies.filter(c => c.status === 'Approved' && !c.isSuspended);
  console.log(`Found ${verifiedCompanies.length} verified companies.`);

  let addedCount = 0;
  let newInternships = [];

  for (const company of verifiedCompanies) {
    const existingCount = db.internships.filter(i => i.companyId === company.id).length;
    if (existingCount >= 10) continue;
    
    const target = 10 + Math.floor(Math.random() * 6); // 10 to 15
    const toCreate = target - existingCount;

    for (let i = 0; i < toCreate; i++) {
      const type = getRandomItem(TYPES);
      const isPaid = type.includes('Paid');
      const stipend = isPaid ? (Math.floor(Math.random() * 20) + 10) * 1000 + ' INR/month' : 'Unpaid';
      const duration = (Math.floor(Math.random() * 6) + 1) + ' Months';
      const jobOpp = Math.random() > 0.5 ? 'Yes' : 'No';
      const cert = 'Yes';
      
      const internship = {
        id: `int_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        companyId: company.id,
        title: getRandomItem(TITLES),
        domain: getRandomItem(DOMAINS),
        description: `Join our team as an intern and gain hands-on experience working on real-world projects. You will collaborate with cross-functional teams, learn industry best practices, and contribute directly to our product roadmap.`,
        responsibilities: [
          'Develop and maintain high-quality code or deliverables.',
          'Participate in daily stand-ups and sprint planning.',
          'Collaborate with mentors and team members.'
        ],
        eligibility: 'Currently pursuing or recently completed a Bachelor\'s degree. Strong foundation in core concepts.',
        skillsRequired: getRandomItem(SKILLS),
        duration: duration,
        location: getRandomItem(LOCATIONS),
        mode: getRandomItem(MODES),
        type: type,
        stipend: stipend,
        jobOpportunity: jobOpp,
        certificateAvailable: cert,
        applicationDeadline: getRandomDeadline(),
        status: 'Active',
        postedDate: getRandomDateWithin30Days(),
        createdAt: new Date().toISOString()
      };
      
      newInternships.push(internship);
      addedCount++;
    }
  }

  if (addedCount > 0) {
    console.log(`Adding ${addedCount} new internships to the database...`);
    const { getDatabase, ref, update } = require("firebase/database");
    const { app } = require("../src/lib/firebase.js");
    const database = getDatabase(app);
    
    // Chunking to avoid 256MB/payload limits
    const CHUNK_SIZE = 5000;
    let baseIndex = db.internships.length;
    for (let i = 0; i < newInternships.length; i += CHUNK_SIZE) {
      const chunk = newInternships.slice(i, i + CHUNK_SIZE);
      const updates = {};
      chunk.forEach((internship, idx) => {
        updates[`internships/${baseIndex + i + idx}`] = internship;
      });
      console.log(`Writing chunk ${i / CHUNK_SIZE + 1} of ${Math.ceil(newInternships.length / CHUNK_SIZE)}`);
      await update(ref(database, '/'), updates);
    }
    console.log('Seeding complete!');
  } else {
    console.log('No new internships needed.');
  }
  
  process.exit(0);
}

runSeed().catch(console.error);
