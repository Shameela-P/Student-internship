import * as server from '../entries/pages/student/companies/_page.server.js';

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/21.gsQqLV_f.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/CFbq46jt.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = ["_app/immutable/assets/21.BgEAVgs-.css"];
export const fonts = [];
