import * as server from '../entries/pages/student/_layout.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/+layout.server.js";
export const imports = ["_app/immutable/nodes/4.vS0z91Xs.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/C1A1czN_.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Crv7mlPr.js"];
export const stylesheets = [];
export const fonts = [];
