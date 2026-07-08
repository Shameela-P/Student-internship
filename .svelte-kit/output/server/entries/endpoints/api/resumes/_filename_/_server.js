import { i as getCollection } from "../../../../../chunks/db.js";
import fs from "fs";
import path from "path";
//#region src/routes/api/resumes/[filename]/+server.js
async function GET({ params }) {
	const filenameOrId = params.filename;
	if (filenameOrId.includes("..") || filenameOrId.includes("/")) return new Response("Invalid filename", { status: 400 });
	const studentWithResume = (await getCollection("students")).find((s) => s.id === filenameOrId || s.resumePath === filenameOrId);
	if (studentWithResume && studentWithResume.resumeData) {
		const buffer = Buffer.from(studentWithResume.resumeData, "base64");
		return new Response(buffer, { headers: {
			"Content-Type": studentWithResume.resumeMimeType || "application/pdf",
			"Content-Disposition": `inline; filename="${studentWithResume.resumeName || "resume.pdf"}"`
		} });
	}
	const resumesDir = !!(process.env.VERCEL || process.env.AWS_REGION || process.env.AWS_EXECUTION_ENV) ? "/tmp/resumes" : path.resolve("uploads/resumes");
	const filePath = path.join(resumesDir, filenameOrId);
	if (!fs.existsSync(filePath)) return new Response("Not Found", { status: 404 });
	let fileBuffer;
	try {
		fileBuffer = fs.readFileSync(filePath);
	} catch (err) {
		console.error("Error reading resume file:", err);
		return new Response("Internal Server Error", { status: 500 });
	}
	let contentType = "application/octet-stream";
	if (filenameOrId.endsWith(".pdf")) contentType = "application/pdf";
	else if (filenameOrId.endsWith(".doc") || filenameOrId.endsWith(".docx")) contentType = "application/msword";
	return new Response(fileBuffer, { headers: {
		"Content-Type": contentType,
		"Content-Disposition": `inline; filename="${filenameOrId}"`
	} });
}
//#endregion
export { GET };
