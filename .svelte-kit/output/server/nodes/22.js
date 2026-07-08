import * as server from '../entries/pages/student/companies/_id_/_page.server.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/companies/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/companies/[id]/+page.server.js";
export const imports = ["_app/immutable/nodes/22.Ct8yUeW0.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/Bncca-K4.js"];
export const stylesheets = [];
export const fonts = [];
