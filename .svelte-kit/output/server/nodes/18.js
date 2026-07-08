import * as server from '../entries/pages/register/_page.server.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/register/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/register/+page.server.js";
export const imports = ["_app/immutable/nodes/18.CgID1DHZ.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/10QCtBHk.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/D-dpdz6b.js"];
export const stylesheets = [];
export const fonts = [];
