import * as server from '../entries/pages/admin/students/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/students/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/students/+page.server.js";
export const imports = ["_app/immutable/nodes/10.nO_dIxlF.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
