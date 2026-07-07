import * as server from '../entries/pages/student/certificates/_page.server.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/certificates/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/certificates/+page.server.js";
export const imports = ["_app/immutable/nodes/20.CUJIZmfa.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/CFbq46jt.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = ["_app/immutable/assets/20.BZ-c7YNf.css"];
export const fonts = [];
