import * as server from '../entries/pages/admin/companies/_page.server.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/companies/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/companies/+page.server.js";
export const imports = ["_app/immutable/nodes/7.DbroO8IT.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/Bm8jZxG3.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/T1OpgVWV.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
