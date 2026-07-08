import * as server from '../entries/pages/company/messages/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/messages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/messages/+page.server.js";
export const imports = ["_app/immutable/nodes/16.DlLPIExQ.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/CzO27c1r.js","_app/immutable/chunks/U2MAIDxi.js","_app/immutable/chunks/C1_pSs-u.js","_app/immutable/chunks/Bd10JgD7.js"];
export const stylesheets = [];
export const fonts = [];
