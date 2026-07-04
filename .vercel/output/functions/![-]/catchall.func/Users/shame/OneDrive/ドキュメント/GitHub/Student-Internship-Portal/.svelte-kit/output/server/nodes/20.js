import * as server from '../entries/pages/student/certificates/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/certificates/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/certificates/+page.server.js";
export const imports = ["_app/immutable/nodes/20.C4VW-0ae.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/C1A1czN_.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = ["_app/immutable/assets/20.B3BUJc5f.css"];
export const fonts = [];
