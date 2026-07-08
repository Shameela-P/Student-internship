import * as server from '../entries/pages/company/internships/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/15.DGjkbaM3.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1_pSs-u.js","_app/immutable/chunks/U2MAIDxi.js","_app/immutable/chunks/CzO27c1r.js"];
export const stylesheets = [];
export const fonts = [];
