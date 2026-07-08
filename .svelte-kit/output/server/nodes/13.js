import * as server from '../entries/pages/company/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/+page.server.js";
export const imports = ["_app/immutable/nodes/13.C7hkt_4o.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
