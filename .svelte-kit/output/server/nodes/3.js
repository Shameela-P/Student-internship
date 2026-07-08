import * as server from '../entries/pages/company/_layout.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/+layout.server.js";
export const imports = ["_app/immutable/nodes/3.Cge5o8v_.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DjsL15d4.js","_app/immutable/chunks/Bh2MOwfo.js","_app/immutable/chunks/Crv7mlPr.js","_app/immutable/chunks/BIenrV_p.js"];
export const stylesheets = [];
export const fonts = [];
