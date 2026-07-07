import * as server from '../entries/pages/company/_page.server.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/+page.server.js";
export const imports = ["_app/immutable/nodes/11.BRphkoEl.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
