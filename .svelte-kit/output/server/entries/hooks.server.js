//#region src/hooks.server.js
async function handle({ event, resolve }) {
	const response = await resolve(event);
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("X-Frame-Options", "DENY");
	response.headers.set("X-XSS-Protection", "1; mode=block");
	return response;
}
function handleError({ error, event }) {
	console.error("Server-side error:", error, event);
	return { message: "An unexpected server error occurred." };
}
//#endregion
export { handle, handleError };
