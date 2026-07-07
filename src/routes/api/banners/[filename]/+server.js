import fs from 'fs';
import path from 'path';
import { getCollection } from '$lib/db';

export async function GET({ params }) {
	const filenameOrId = params.filename;
	
	if (filenameOrId.includes('..') || filenameOrId.includes('/')) {
		return new Response('Invalid filename', { status: 400 });
	}

	// 1. Try to find it in the Database (Vercel Fix)
	const internships = await getCollection('internships');
	const internshipWithBanner = internships.find(i => i.id === filenameOrId || i.bannerPath === filenameOrId);

	if (internshipWithBanner && internshipWithBanner.bannerData) {
		const buffer = Buffer.from(internshipWithBanner.bannerData, 'base64');
		return new Response(buffer, {
			headers: {
				'Content-Type': internshipWithBanner.bannerMimeType || 'image/jpeg',
				'Cache-Control': 'public, max-age=86400'
			}
		});
	}

	// 2. Fallback to local file system (For older mock banners)
	const filePath = path.resolve('uploads/banners', filenameOrId);

	if (!fs.existsSync(filePath)) {
		return new Response('Not Found', { status: 404 });
	}

	const fileBuffer = fs.readFileSync(filePath);
	
	let contentType = 'image/jpeg';
	if (filenameOrId.endsWith('.png')) {
		contentType = 'image/png';
	} else if (filenameOrId.endsWith('.webp')) {
		contentType = 'image/webp';
	} else if (filenameOrId.endsWith('.svg')) {
		contentType = 'image/svg+xml';
	}

	return new Response(fileBuffer, {
		headers: {
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=86400'
		}
	});
}
