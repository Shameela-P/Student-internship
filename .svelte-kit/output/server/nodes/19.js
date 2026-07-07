import * as server from '../entries/pages/student/_page.server.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+page.server.js";
export const imports = ["_app/immutable/nodes/19.7TMZrBID.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
