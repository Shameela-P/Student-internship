import * as server from '../entries/pages/admin/_layout.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/+layout.server.js";
export const imports = ["_app/immutable/nodes/2.BiGHvI19.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/C1A1czN_.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
