import * as server from '../entries/pages/student/internships/_page.server.js';

export const index = 22;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/internships/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/internships/+page.server.js";
export const imports = ["_app/immutable/nodes/22.dSZAbCQE.js","_app/immutable/chunks/GSFvJ3-1.js","_app/immutable/chunks/BMW3tGcF.js","_app/immutable/chunks/DLrS9xGv.js","_app/immutable/chunks/CFbq46jt.js","_app/immutable/chunks/xihTtKlq.js"];
export const stylesheets = [];
export const fonts = [];
