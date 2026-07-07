import "../../../chunks/index-server.js";
import { S as attr, c as stringify, l as unsubscribe_stores, m as getContext, s as store_get, t as attr_class, w as escape_html } from "../../../chunks/server.js";
import "../../../chunks/firebase.js";
import "../../../chunks/client.js";
import "../../../chunks/forms.js";
import "firebase/auth";
//#region node_modules/@sveltejs/kit/src/runtime/app/stores.js
/**
* A function that returns all of the contextual stores. On the server, this must be called during component initialization.
* Only use this if you need to defer store subscription until after the component has mounted, for some reason.
*
* @deprecated Use `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
*/
var getStores = () => {
	const stores$1 = getContext("__svelte__");
	return {
		/** @type {typeof page} */
		page: { subscribe: stores$1.page.subscribe },
		/** @type {typeof navigating} */
		navigating: { subscribe: stores$1.navigating.subscribe },
		/** @type {typeof updated} */
		updated: stores$1.updated
	};
};
/**
* A readable store whose value contains page data.
*
* On the server, this store can only be subscribed to during component initialization. In the browser, it can be subscribed to at any time.
*
* @deprecated Use `page` from `$app/state` instead (requires Svelte 5, [see docs for more info](https://svelte.dev/docs/kit/migrating-to-sveltekit-2#SvelteKit-2.12:-$app-stores-deprecated))
* @type {import('svelte/store').Readable<import('@sveltejs/kit').Page>}
*/
var page = { subscribe(fn) {
	return getStores().page.subscribe(fn);
} };
//#endregion
//#region src/routes/login/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		var $$store_subs;
		let { form } = $$props;
		let activeRole = "student";
		let loading = false;
		let googleRole = "student";
		let googleLoading = false;
		let googleError = "";
		$$renderer.push(`<div class="min-h-screen flex items-center justify-center p-6 relative"><div class="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div> <div class="w-full max-w-lg rounded-3xl glass p-8 md:p-10 shadow-2xl relative border border-slate-200/20 dark:border-slate-800/40"><a href="/" class="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-400 mb-8 transition cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg> Back to home</a> <div class="text-center mb-8"><h1 class="font-display font-black text-3xl text-primary dark:text-primary-dark tracking-tight">Welcome Back</h1> <p class="text-sm text-muted dark:text-muted-dark mt-2">Sign in to access your Nexora dashboard.</p></div> <div class="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/60 rounded-2xl mb-8 border border-slate-200/5 dark:border-slate-800/40"><button type="button"${attr_class(`py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-sm`)}>Student</button> <button type="button"${attr_class(`py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200`)}>Company</button> <button type="button"${attr_class(`py-2.5 rounded-xl text-xs font-bold transition duration-200 cursor-pointer text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200`)}>Admin</button></div> `);
		if (store_get($$store_subs ??= {}, "$page", page).url.searchParams.get("registered") === "true") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Registration successful! Please sign in.</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (form?.error || googleError) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg> ${escape_html(form?.error || googleError)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <form method="POST" class="space-y-5"><input type="hidden" name="role"${attr("value", activeRole)}/> <div><label for="email" class="block text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider mb-2">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`Email Address`);
		$$renderer.push(`<!--]--></label> <input type="email" id="email" name="email" required="" placeholder="name@example.com" class="w-full px-4 py-3.5 rounded-xl border border-divider dark:border-divider-dark bg-white/50 dark:bg-slate-950/30 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition text-sm text-primary dark:text-primary-dark placeholder-slate-400 dark:placeholder-slate-600"/></div> <div><div class="flex items-center justify-between mb-2"><label for="password" class="block text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Password</label></div> <input type="password" id="password" name="password" required="" placeholder="••••••••" class="w-full px-4 py-3.5 rounded-xl border border-divider dark:border-divider-dark bg-white/50 dark:bg-slate-950/30 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none transition text-sm text-primary dark:text-primary-dark placeholder-slate-400 dark:placeholder-slate-600"/></div> <button type="submit"${attr("disabled", loading, true)} class="w-full py-3.5 rounded-xl font-bold text-primary dark:text-primary-dark bg-surface hover:bg-surface active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`Sign In`);
		$$renderer.push(`<!--]--></button> <div class="relative flex items-center py-2"><div class="flex-grow border-t border-divider dark:border-divider-dark"></div> <span class="flex-shrink-0 mx-4 text-xs text-slate-600 dark:text-slate-400 dark:text-slate-500">or</span> <div class="flex-grow border-t border-divider dark:border-divider-dark"></div></div> <div><label class="block text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider mb-2">ROLE (ONLY FOR FIRST-TIME GOOGLE SIGN-UP)</label> `);
		$$renderer.select({
			value: googleRole,
			class: "w-full px-4 py-3 rounded-xl border border-divider dark:border-divider-dark bg-white/50 dark:bg-slate-950/30 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition text-sm text-primary dark:text-primary-dark cursor-pointer"
		}, ($$renderer) => {
			$$renderer.option({ value: "student" }, ($$renderer) => {
				$$renderer.push(`Student / Intern`);
			});
			$$renderer.option({ value: "company" }, ($$renderer) => {
				$$renderer.push(`Company / Employer`);
			});
		});
		$$renderer.push(`</div> <button type="button"${attr("disabled", googleLoading, true)} class="w-full py-3.5 rounded-xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-50">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg> Continue with Google`);
		$$renderer.push(`<!--]--></button></form> `);
		$$renderer.push("<!--[0-->");
		$$renderer.push(`<div class="mt-8 pt-6 border-t border-slate-200/10 dark:border-slate-800/40 text-center text-sm"><span class="text-slate-500">New to Nexora?</span> <a${attr("href", `/register?role=${stringify(activeRole)}`)} class="font-bold text-indigo-500 dark:text-indigo-400 hover:underline ml-1">Create an Account</a></div>`);
		$$renderer.push(`<!--]--></div></div>`);
		if ($$store_subs) unsubscribe_stores($$store_subs);
	});
}
//#endregion
export { _page as default };
