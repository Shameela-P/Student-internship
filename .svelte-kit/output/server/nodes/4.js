import * as server from '../entries/pages/student/_layout.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+layout.server.js";
export const imports = ["_app/immutable/nodes/4.B00PG66a.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DCC8IYzo.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
