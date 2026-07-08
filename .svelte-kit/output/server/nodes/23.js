import * as server from '../entries/pages/login/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.js";
export const imports = ["_app/immutable/nodes/23.CjctcYRp.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/Bh2MOwfo.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BIenrV_p.js","_app/immutable/chunks/Bgv7DhnO.js"];
export const stylesheets = [];
export const fonts = [];
