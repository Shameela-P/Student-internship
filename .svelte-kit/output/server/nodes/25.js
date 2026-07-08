import * as server from '../entries/pages/student/notifications/_page.server.js';

export const index = 25;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/25.Dpu8-Lj2.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-dpdz6b.js","_app/immutable/chunks/e8kNgveu.js","_app/immutable/chunks/B-Mproqx.js"];
export const stylesheets = [];
export const fonts = [];
