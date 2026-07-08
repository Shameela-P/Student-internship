import * as server from '../entries/pages/company/applications/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/applications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/applications/+page.server.js";
export const imports = ["_app/immutable/nodes/14.DppOftLA.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CtXfHEdw.js","_app/immutable/chunks/CV8-3Cnb.js"];
export const stylesheets = [];
export const fonts = [];
