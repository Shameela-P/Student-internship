import * as server from '../entries/pages/_page.server.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/5.a2bWftKo.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Crv7mlPr.js","_app/immutable/chunks/DcZmmMp_.js","_app/immutable/chunks/D5FH837M.js"];
export const stylesheets = ["_app/immutable/assets/FloatingLines.DGz9-cXD.css"];
export const fonts = [];
