import * as server from '../entries/pages/student/_layout.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+layout.server.js";
export const imports = ["_app/immutable/nodes/4.CzGgMfIN.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CkQ0LkPW.js","_app/immutable/chunks/U2MAIDxi.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
