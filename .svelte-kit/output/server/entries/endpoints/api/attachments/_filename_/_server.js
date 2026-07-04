import { json } from "@sveltejs/kit";
import fs from "fs";
import path from "path";
//#region src/routes/api/attachments/[filename]/+server.js
async function GET({ params, url }) {
	const safeName = params.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
	const filePath = path.join(process.cwd(), "uploads", "attachments", safeName);
	if (!fs.existsSync(filePath)) return json({ error: "Attachment not found" }, { status: 404 });
	const fileBuffer = fs.readFileSync(filePath);
	const contentType = {
		".pdf": "application/pdf",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".webp": "image/webp",
		".txt": "text/plain",
		".doc": "application/msword",
		".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	}[path.extname(filePath).toLowerCase()] || "application/octet-stream";
	return new Response(fileBuffer, { headers: {
		"Content-Type": contentType,
		"Content-Disposition": `inline; filename="${safeName}"`
	} });
}
//#endregion
export { GET };
