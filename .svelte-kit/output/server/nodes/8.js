import * as server from '../entries/pages/admin/companies/_page.server.js';

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/8.COZyn3nM.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Bgv7DhnO.js","_app/immutable/chunks/Bh2MOwfo.js"];
export const stylesheets = [];
export const fonts = [];
