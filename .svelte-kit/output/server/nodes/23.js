import * as server from '../entries/pages/student/internships/_page.server.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/23.BpMTeA03.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/B6gtj0wr.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/10QCtBHk.js","_app/immutable/chunks/D-dpdz6b.js"];
export const stylesheets = [];
export const fonts = [];
