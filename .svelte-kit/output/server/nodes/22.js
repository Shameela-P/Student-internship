import * as server from '../entries/pages/internships/_page.server.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/22.D71FIMgN.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DcZmmMp_.js","_app/immutable/chunks/D5FH837M.js"];
export const stylesheets = ["_app/immutable/assets/FloatingLines.DGz9-cXD.css"];
export const fonts = [];
