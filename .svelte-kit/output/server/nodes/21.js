import * as server from '../entries/pages/student/internships/_page.server.js';

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/21.BcSvFGlW.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DCC8IYzo.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/iS20a-k3.js","_app/immutable/chunks/D70J0aPL.js"];
export const stylesheets = [];
export const fonts = [];
