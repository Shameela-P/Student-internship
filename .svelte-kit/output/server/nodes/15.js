import * as server from '../entries/pages/company/notifications/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/15.CMX23qXT.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
