import * as server from '../entries/pages/student/companies/_page.server.js';

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/21.DDKyLtXe.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/B6gtj0wr.js","_app/immutable/chunks/XHrSed5o.js"];
export const stylesheets = ["_app/immutable/assets/21.BgEAVgs-.css"];
export const fonts = [];
