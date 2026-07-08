import * as server from '../entries/pages/company/internships/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/15.BfMxiNrW.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CtXfHEdw.js","_app/immutable/chunks/CV8-3Cnb.js"];
export const stylesheets = [];
export const fonts = [];
