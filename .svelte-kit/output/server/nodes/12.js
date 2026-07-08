import * as server from '../entries/pages/company/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/+page.server.js";
export const imports = ["_app/immutable/nodes/12.BBIJxC6B.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
