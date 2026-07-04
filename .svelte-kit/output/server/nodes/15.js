import * as server from '../entries/pages/company/messages/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/15.BdCo1r4N.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/kNaey6uv.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/Bm8jZxG3.js","_app/immutable/chunks/T1OpgVWV.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BwgDNDPm.js"];
export const stylesheets = [];
export const fonts = [];
