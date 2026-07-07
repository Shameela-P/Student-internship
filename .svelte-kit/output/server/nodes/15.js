import * as server from '../entries/pages/company/notifications/_page.server.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/company/notifications/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/company/notifications/+page.server.js";
export const imports = ["_app/immutable/nodes/15.DCZIZ-df.js","_app/immutable/chunks/DHkQu-Co.js","_app/immutable/chunks/DLDGiC2b.js","_app/immutable/chunks/xihTtKlq.js","_app/immutable/chunks/D70J0aPL.js"];
export const stylesheets = [];
export const fonts = [];
