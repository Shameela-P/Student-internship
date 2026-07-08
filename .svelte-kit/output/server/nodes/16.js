import * as server from '../entries/pages/company/notifications/_page.server.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/16.D8aqGkNl.js","_app/immutable/chunks/CB82KsP5.js","_app/immutable/chunks/Dftgqput.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/BNi4oxCT.js"];
export const stylesheets = [];
export const fonts = [];
