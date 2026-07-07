import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.DYDvMTOa.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DCC8IYzo.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
