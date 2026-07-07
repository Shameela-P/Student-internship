import * as server from '../entries/pages/student/companies/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/20.CQwKG90O.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DCC8IYzo.js","_app/immutable/chunks/DLDGiC2b.js"];
export const stylesheets = ["_app/immutable/assets/20.BgEAVgs-.css"];
export const fonts = [];
