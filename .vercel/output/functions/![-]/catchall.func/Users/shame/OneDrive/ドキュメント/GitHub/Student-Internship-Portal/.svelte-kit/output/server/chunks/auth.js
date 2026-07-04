import { t as private_env } from "./shared-server.js";
import { redirect } from "@sveltejs/kit";
import crypto from "crypto";
//#region src/lib/auth.js
var SECRET_KEY = private_env.JWT_SECRET || "nexora_super_secret_key_2026_safe";
var REFRESH_SECRET = private_env.JWT_REFRESH_SECRET || "nx_refresh_token_very_secure_99";
function verifyPassword(password, stored) {
	try {
		if (!stored || !stored.includes(":")) return false;
		const [salt, hash] = stored.split(":");
		return hash === crypto.scryptSync(password, salt, 64).toString("hex");
	} catch (e) {
		console.error("Password verification failed:", e);
		return false;
	}
}
function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString("hex");
	return `${salt}:${crypto.scryptSync(password, salt, 64).toString("hex")}`;
}
function createToken(payload) {
	const header = Buffer.from(JSON.stringify({
		alg: "HS256",
		typ: "JWT"
	})).toString("base64url");
	const body = Buffer.from(JSON.stringify({
		...payload,
		exp: Date.now() + 1e3 * 60 * 60 * 24
	})).toString("base64url");
	return `${header}.${body}.${crypto.createHmac("sha256", SECRET_KEY).update(`${header}.${body}`).digest("base64url")}`;
}
function createRefreshToken(payload) {
	const header = Buffer.from(JSON.stringify({
		alg: "HS256",
		typ: "JWT"
	})).toString("base64url");
	const body = Buffer.from(JSON.stringify({
		...payload,
		exp: Date.now() + 1e3 * 60 * 60 * 24 * 7
	})).toString("base64url");
	return `${header}.${body}.${crypto.createHmac("sha256", REFRESH_SECRET).update(`${header}.${body}`).digest("base64url")}`;
}
function verifyToken(token, isRefresh = false) {
	if (!token) return null;
	const parts = token.split(".");
	if (parts.length !== 3) return null;
	const [header, body, signature] = parts;
	if (signature !== crypto.createHmac("sha256", isRefresh ? REFRESH_SECRET : SECRET_KEY).update(`${header}.${body}`).digest("base64url")) return null;
	try {
		const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
		if (payload.exp < Date.now()) return null;
		return payload;
	} catch (e) {
		return null;
	}
}
function getSessionUser(cookies) {
	let user = verifyToken(cookies.get("nexora_session"));
	if (!user) {
		const refreshUser = verifyToken(cookies.get("nexora_refresh"), true);
		if (refreshUser) {
			user = {
				id: refreshUser.id,
				email: refreshUser.email,
				name: refreshUser.name,
				role: refreshUser.role
			};
			const newToken = createToken(user);
			cookies.set("nexora_session", newToken, {
				path: "/",
				httpOnly: true,
				secure: private_env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 3600 * 24
			});
		}
	}
	return user;
}
function requireRole(cookies, allowedRoles) {
	const user = getSessionUser(cookies);
	if (!user) throw redirect(303, "/login");
	if (!allowedRoles.includes(user.role)) throw redirect(303, `/${user.role}`);
	return user;
}
//#endregion
export { requireRole as a, hashPassword as i, createToken as n, verifyPassword as o, getSessionUser as r, verifyToken as s, createRefreshToken as t };
