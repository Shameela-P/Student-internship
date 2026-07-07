import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.Cpg-dgEM.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/CFbq46jt.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
