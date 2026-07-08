import * as server from '../entries/pages/admin/companies/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/7.BrS2tMpk.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/10QCtBHk.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/D-dpdz6b.js"];
export const stylesheets = [];
export const fonts = [];
