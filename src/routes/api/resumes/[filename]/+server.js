import fs from 'fs';
import path from 'path';
import { getCollection } from '$lib/db';

export async function GET({ params }) {
	const filenameOrId = params.filename;
	
	if (filenameOrId.includes('..') || filenameOrId.includes('/')) {
		return new Response('Invalid filename', { status: 400 });
	}

	// 1. Try to find it in the Database (Vercel Fix)
	const students = await getCollection('students');
	const studentWithResume = students.find(s => s.id === filenameOrId || s.resumePath === filenameOrId);

	if (studentWithResume && studentWithResume.resumeData) {
		const buffer = Buffer.from(studentWithResume.resumeData, 'base64');
		return new Response(buffer, {
			headers: {
				'Content-Type': studentWithResume.resumeMimeType || 'application/pdf',
				'Content-Disposition': `inline; filename="${studentWithResume.resumeName || 'resume.pdf'}"`
			}
		});
	}

	// 2. Fallback to local file system (For mock resumes)
	const filePath = path.resolve('uploads/resumes', filenameOrId);

	if (!fs.existsSync(filePath)) {
		return new Response('Not Found', { status: 404 });
	}

	const fileBuffer = fs.readFileSync(filePath);
	
	let contentType = 'application/octet-stream';
	if (filenameOrId.endsWith('.pdf')) {
		contentType = 'application/pdf';
	} else if (filenameOrId.endsWith('.doc') || filenameOrId.endsWith('.docx')) {
		contentType = 'application/msword';
	}

	return new Response(fileBuffer, {
		headers: {
			'Content-Type': contentType,
			'Content-Disposition': `inline; filename="${filenameOrId}"`
		}
	});
}
