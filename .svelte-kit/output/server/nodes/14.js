import * as server from '../entries/pages/company/internships/_page.server.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/14.CQy4Nlod.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BrwilmBb.js","_app/immutable/chunks/Dftgqput.js","_app/immutable/chunks/BNi4oxCT.js"];
export const stylesheets = [];
export const fonts = [];
