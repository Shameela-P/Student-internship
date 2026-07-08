import * as server from '../entries/pages/admin/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/7.B9kECAvW.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1_pSs-u.js","_app/immutable/chunks/U2MAIDxi.js","_app/immutable/chunks/CzO27c1r.js"];
export const stylesheets = [];
export const fonts = [];
