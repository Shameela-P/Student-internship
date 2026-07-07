import * as server from '../entries/pages/company/applications/_page.server.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/applications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/applications/+page.server.js";
export const imports = ["_app/immutable/nodes/12.CStw8Y2B.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/iS20a-k3.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/D70J0aPL.js"];
export const stylesheets = [];
export const fonts = [];
