import * as server from '../entries/pages/student/_layout.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+layout.server.js";
export const imports = ["_app/immutable/nodes/4.DWUVe1_f.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DjsL15d4.js","_app/immutable/chunks/Bh2MOwfo.js","_app/immutable/chunks/Crv7mlPr.js","_app/immutable/chunks/BIenrV_p.js"];
export const stylesheets = [];
export const fonts = [];
