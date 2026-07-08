import "../../chunks/index-server.js";
import { C as attr, o as head } from "../../chunks/server.js";
//#region src/lib/assets/favicon.svg
var favicon_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20128%20128'%3e%3cdefs%3e%3clinearGradient%20id='grad1'%20x1='0%25'%20y1='0%25'%20x2='100%25'%20y2='100%25'%3e%3cstop%20offset='0%25'%20style='stop-color:%233b82f6;stop-opacity:1'%20/%3e%3cstop%20offset='100%25'%20style='stop-color:%2306b6d4;stop-opacity:1'%20/%3e%3c/linearGradient%3e%3clinearGradient%20id='grad2'%20x1='0%25'%20y1='100%25'%20x2='100%25'%20y2='0%25'%3e%3cstop%20offset='0%25'%20style='stop-color:%2310b981;stop-opacity:1'%20/%3e%3cstop%20offset='100%25'%20style='stop-color:%236366f1;stop-opacity:1'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20d='M64%204%20L120%2036%20L120%2092%20L64%20124%20L8%2092%20L8%2036%20Z'%20fill='none'%20stroke='url(%23grad1)'%20stroke-width='12'%20stroke-linejoin='round'/%3e%3cpath%20d='M36%2088%20L36%2040%20L92%2088%20L92%2040'%20fill='none'%20stroke='url(%23grad2)'%20stroke-width='16'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e";
//#endregion
//#region src/routes/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		head("12qhfyh", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>Nexora - Centralized Internship Nexus</title>`);
			});
			$$renderer.push(`<link rel="icon"${attr("href", favicon_default)}/>`);
		});
		$$renderer.push(`<div class="min-h-screen text-slate-800 bg-slate-50 dark:bg-surface dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden flex flex-col"><div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none"></div> <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[180px] pointer-events-none"></div> <div class="fixed top-6 right-6 z-50">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <button class="p-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-divider dark:border-divider-dark hover:scale-110 active:scale-95 transition duration-300 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-center" aria-label="Toggle Theme Menu">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>`);
		$$renderer.push(`<!--]--></button></div> <main class="flex-grow flex flex-col relative z-10">`);
		children($$renderer);
		$$renderer.push(`<!----></main></div>`);
	});
}
//#endregion
export { _layout as default };
