import * as server from '../entries/pages/admin/messages/_page.server.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/10.D7qyKEVz.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BIenrV_p.js","_app/immutable/chunks/B85hrWOY.js","_app/immutable/chunks/BzS5eV09.js"];
export const stylesheets = [];
export const fonts = [];
