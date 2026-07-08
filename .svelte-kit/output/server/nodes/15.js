import * as server from '../entries/pages/company/notifications/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/15.Ds1-0hLj.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/XHrSed5o.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D-dpdz6b.js"];
export const stylesheets = [];
export const fonts = [];
