import * as server from '../entries/pages/company/applications/_page.server.js';

export const index = 13;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/applications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/applications/+page.server.js";
export const imports = ["_app/immutable/nodes/13.wJCrX_vw.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BrwilmBb.js","_app/immutable/chunks/Dftgqput.js","_app/immutable/chunks/BNi4oxCT.js"];
export const stylesheets = [];
export const fonts = [];
