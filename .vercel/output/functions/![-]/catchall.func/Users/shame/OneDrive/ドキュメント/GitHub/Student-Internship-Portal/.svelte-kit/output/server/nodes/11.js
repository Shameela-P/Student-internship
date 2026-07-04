import * as server from '../entries/pages/admin/students/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/students/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/students/+page.server.js";
export const imports = ["_app/immutable/nodes/11.JDGtDxW_.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
