import * as server from '../entries/pages/company/messages/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/16.B9mCRMJP.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BIenrV_p.js","_app/immutable/chunks/Bgv7DhnO.js","_app/immutable/chunks/Bh2MOwfo.js"];
export const stylesheets = [];
export const fonts = [];
