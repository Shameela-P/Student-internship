import * as server from '../entries/pages/login/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/login/+page.server.js";
export const imports = ["_app/immutable/nodes/23.P6hoY-QT.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/CV8-3Cnb.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CtXfHEdw.js","_app/immutable/chunks/BIenrV_p.js"];
export const stylesheets = [];
export const fonts = [];
