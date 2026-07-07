import * as server from '../entries/pages/student/_page.server.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+page.server.js";
export const imports = ["_app/immutable/nodes/18.DceW7aSY.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
