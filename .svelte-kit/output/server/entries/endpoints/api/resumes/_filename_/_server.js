import fs from "fs";
import path from "path";
//#region src/routes/api/resumes/[filename]/+server.js
async function GET({ params }) {
	const filename = params.filename;
	if (filename.includes("..") || filename.includes("/")) return new Response("Invalid filename", { status: 400 });
	const resumesDir = !!(process.env.VERCEL || process.env.AWS_REGION || process.env.AWS_EXECUTION_ENV) ? "/tmp/resumes" : path.resolve("uploads/resumes");
	const filePath = path.join(resumesDir, filename);
	if (!fs.existsSync(filePath)) return new Response("Not Found", { status: 404 });
	let fileBuffer;
	try {
		fileBuffer = fs.readFileSync(filePath);
	} catch (err) {
		console.error("Error reading resume file:", err);
		return new Response("Internal Server Error", { status: 500 });
	}
	let contentType = "application/octet-stream";
	if (filename.endsWith(".pdf")) contentType = "application/pdf";
	else if (filename.endsWith(".doc") || filename.endsWith(".docx")) contentType = "application/msword";
	return new Response(fileBuffer, { headers: {
		"Content-Type": contentType,
		"Content-Disposition": `inline; filename="${filename}"`
	} });
}
//#endregion
export { GET };
