import { n as createToken, s as verifyToken } from "../../../../chunks/auth.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/refresh/+server.js
async function POST({ cookies }) {
	const refreshToken = cookies.get("nexora_refresh");
	if (!refreshToken) return json({
		success: false,
		error: "No refresh token available"
	}, { status: 401 });
	const payload = verifyToken(refreshToken, true);
	if (!payload) {
		cookies.delete("nexora_session", { path: "/" });
		cookies.delete("nexora_refresh", { path: "/" });
		return json({
			success: false,
			error: "Invalid or expired refresh token"
		}, { status: 401 });
	}
	const newToken = createToken({
		id: payload.id,
		email: payload.email,
		name: payload.name,
		role: payload.role
	});
	cookies.set("nexora_session", newToken, {
		path: "/",
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: 3600 * 24
	});
	return json({
		success: true,
		message: "Session refreshed successfully"
	});
}
//#endregion
export { POST };
