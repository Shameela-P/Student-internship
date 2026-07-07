import * as server from '../entries/pages/company/_layout.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/+layout.server.js";
export const imports = ["_app/immutable/nodes/3.INPMEFRb.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/CFbq46jt.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
