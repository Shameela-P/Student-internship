import * as server from '../entries/pages/student/settings/_page.server.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/settings/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/settings/+page.server.js";
export const imports = ["_app/immutable/nodes/26.CZvnwe8n.js","_app/immutable/chunks/CrKY3KsX.js","_app/immutable/chunks/Bm8jZxG3.js","_app/immutable/chunks/5W_Zh4Rl.js","_app/immutable/chunks/T1OpgVWV.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
