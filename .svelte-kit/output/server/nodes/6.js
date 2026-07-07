import * as server from '../entries/pages/admin/_page.server.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+page.server.js";
export const imports = ["_app/immutable/nodes/6.DPRJxYzq.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/BMW3tGcF.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
