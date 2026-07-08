import * as server from '../entries/pages/admin/messages/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/10.itZCPr-G.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BrwilmBb.js","_app/immutable/chunks/Dftgqput.js","_app/immutable/chunks/BNi4oxCT.js","_app/immutable/chunks/Bd10JgD7.js"];
export const stylesheets = [];
export const fonts = [];
