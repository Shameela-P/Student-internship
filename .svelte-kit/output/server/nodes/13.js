import * as server from '../entries/pages/company/internships/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/13.CZx4x48X.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/10QCtBHk.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/D-dpdz6b.js"];
export const stylesheets = [];
export const fonts = [];
