import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.B_ruTmWW.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/gvFNnrLJ.js","_app/immutable/chunks/BzS5eV09.js","_app/immutable/chunks/Crv7mlPr.js","_app/immutable/chunks/BIenrV_p.js"];
export const stylesheets = [];
export const fonts = [];
