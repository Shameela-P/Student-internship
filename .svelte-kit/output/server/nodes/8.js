import * as server from '../entries/pages/admin/companies/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/8.WfAGoP8U.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/C1_pSs-u.js","_app/immutable/chunks/U2MAIDxi.js","_app/immutable/chunks/CzO27c1r.js"];
export const stylesheets = [];
export const fonts = [];
