import * as server from '../entries/pages/company/notifications/_page.server.js';

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/17.B4uAAgmr.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BIenrV_p.js"];
export const stylesheets = [];
export const fonts = [];
