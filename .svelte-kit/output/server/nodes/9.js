import * as server from '../entries/pages/admin/messages/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/9.Bdy11cRx.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/iS20a-k3.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/D70J0aPL.js","_app/immutable/chunks/e8kNgveu.js","_app/immutable/chunks/B-Mproqx.js"];
export const stylesheets = [];
export const fonts = [];
