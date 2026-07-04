import fs from "fs";
import path from "path";
//#region src/routes/api/resumes/[filename]/+server.js
async function GET({ params }) {
	const filename = params.filename;
	if (filename.includes("..") || filename.includes("/")) return new Response("Invalid filename", { status: 400 });
	const filePath = path.resolve("uploads/resumes", filename);
	if (!fs.existsSync(filePath)) return new Response("Not Found", { status: 404 });
	const fileBuffer = fs.readFileSync(filePath);
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
