import * as server from '../entries/pages/student/certificates/_page.server.js';

export const index = 19;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/student/certificates/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/student/certificates/+page.server.js";
export const imports = ["_app/immutable/nodes/19.CqPBJ5Ti.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/DCC8IYzo.js","_app/immutable/chunks/DLDGiC2b.js"];
export const stylesheets = ["_app/immutable/assets/19.B3BUJc5f.css"];
export const fonts = [];
