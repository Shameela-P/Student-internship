import * as server from '../entries/pages/company/messages/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/14.XSr3jnKr.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/BMW3tGcF.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
