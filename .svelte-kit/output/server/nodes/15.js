import * as server from '../entries/pages/company/internships/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/15.BjfGX_KK.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Bgv7DhnO.js","_app/immutable/chunks/Bh2MOwfo.js"];
export const stylesheets = [];
export const fonts = [];
