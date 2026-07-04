import { r as getSessionUser } from "../../chunks/auth.js";
//#region src/routes/+layout.server.js
function load({ cookies }) {
	return { user: getSessionUser(cookies) };
}
//#endregion
export { load };
