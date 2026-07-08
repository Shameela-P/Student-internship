import * as server from '../entries/pages/admin/email-templates/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/email-templates/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/email-templates/+page.server.js";
export const imports = ["_app/immutable/nodes/9.CXF59J-Z.js","_app/immutable/chunks/ytEoXY4S.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
