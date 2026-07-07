import { i as logAction } from "../../../chunks/db.js";
import { s as verifyToken } from "../../../chunks/auth.js";
import { redirect } from "@sveltejs/kit";
//#region src/routes/logout/+server.js
function handleLogout(cookies) {
	const sessionToken = cookies.get("nexora_session");
	let userInfo = "User";
	if (sessionToken) {
		const decoded = verifyToken(sessionToken);
		if (decoded) userInfo = `${decoded.role.charAt(0).toUpperCase() + decoded.role.slice(1)} ${decoded.name || decoded.email}`;
	}
	cookies.delete("nexora_session", { path: "/" });
	cookies.delete("nexora_refresh", { path: "/" });
	logAction("LOGOUT", `${userInfo} logged out of session.`);
	throw redirect(303, "/");
}
function GET({ cookies }) {
	return handleLogout(cookies);
}
function POST({ cookies }) {
	return handleLogout(cookies);
}
//#endregion
export { GET, POST };
