import { C as attr, T as escape_html, i as derived, t as attr_class, w as clsx } from "../../../chunks/server.js";
import { t as page } from "../../../chunks/state.js";
import { t as logo_default } from "../../../chunks/logo.js";
//#region src/routes/company/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		const company = derived(() => data.company);
		const pending = derived(() => data.pendingApproval);
		const unread = derived(() => data.unreadNotifications);
		const unreadMsgs = derived(() => data.unreadMessages);
		function getLinkClass(path) {
			if (page.url.pathname === path) return "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition duration-200 cursor-pointer bg-indigo-600 text-primary dark:text-primary-dark shadow-lg shadow-indigo-500/15";
			return "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition duration-200 cursor-pointer text-slate-600 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-surface dark:bg-surface-dark/50 dark:hover:text-primary dark:text-primary-dark";
		}
		$$renderer.push(`<div class="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950 transition-colors duration-300"><aside class="hidden md:flex flex-col w-64 border-r border-slate-200/20 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-lg fixed top-0 bottom-0 left-0 z-20"><div class="p-6 border-b border-slate-200/10 dark:border-slate-800/40 flex items-center gap-3"><img loading="lazy"${attr("src", logo_default)} alt="Nexora Logo" class="h-10 w-10 drop-shadow-md"/> <span class="font-display font-extrabold text-xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 text-gradient">Nexora</span></div> <nav class="flex-grow p-4 space-y-1.5 mt-4 overflow-y-auto"><a href="/company"${attr_class(clsx(getLinkClass("/company")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg> Overview</a> <a href="/company/internships"${attr_class(clsx(getLinkClass("/company/internships")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> Postings (${escape_html(company().status === "Approved" ? "Manage" : "View")})</a> <a href="/company/applications"${attr_class(clsx(getLinkClass("/company/applications")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Applications Queue</a> <a href="/company/messages"${attr_class(clsx(getLinkClass("/company/messages")))}><div class="relative flex items-center gap-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> <span>Chat Messages</span> `);
		if (unreadMsgs() > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="absolute right-0 h-5 w-5 bg-blue-500 text-primary dark:text-primary-dark rounded-full flex items-center justify-center text-[10px] font-bold">${escape_html(unreadMsgs())}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></a> <a href="/company/notifications"${attr_class(clsx(getLinkClass("/company/notifications")))}><div class="relative flex items-center gap-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> <span>Notifications</span> `);
		if (unread() > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="absolute right-0 h-5 w-5 bg-rose-500 text-primary dark:text-primary-dark rounded-full flex items-center justify-center text-[10px] font-bold">${escape_html(unread())}</span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></a></nav> <div class="p-4 border-t border-slate-200/10 dark:border-slate-800/40 bg-slate-100/30 dark:bg-slate-900/10"><div class="flex items-center gap-3"><div class="h-10 w-10 rounded-full bg-indigo-500/15 text-indigo-500 flex items-center justify-center font-bold uppercase border border-indigo-500/10">`);
		if (company().companyLogo) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img loading="lazy"${attr("src", company().companyLogo)}${attr("alt", company().companyName)} class="h-10 w-10 rounded-full object-cover"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(company().companyName.charAt(0))}`);
		}
		$$renderer.push(`<!--]--></div> <div class="flex-grow min-w-0"><h4 class="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">${escape_html(company().companyName)}</h4> <span class="text-xs text-slate-500 truncate block">${escape_html(company().industryType)}</span></div></div> <a href="/logout" class="mt-4 flex items-center justify-center gap-2 py-2 w-full rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition duration-150 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Sign Out</a></div></aside> <header class="md:hidden w-full flex items-center justify-between py-4 px-6 border-b border-slate-200/10 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/40 backdrop-blur-lg sticky top-0 z-30"><div class="flex items-center gap-3"><img loading="lazy"${attr("src", logo_default)} alt="Nexora Logo" class="h-8 w-8 drop-shadow-sm"/> <span class="font-display font-extrabold text-lg dark:text-white">Nexora</span></div> <div class="flex items-center gap-3"><a href="/company/notifications" class="relative p-2 text-slate-600 dark:text-slate-400"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> `);
		if (unread() > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="absolute top-1 right-1 h-2.5 w-2.5 bg-rose-500 rounded-full animate-pulse"></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></a> <button class="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/10 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`);
		$$renderer.push(`<!--]--></button></div></header> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-grow md:ml-64 p-6 md:p-10 min-h-screen relative flex flex-col"><div class="max-w-6xl w-full mx-auto flex-grow flex flex-col">`);
		if (pending()) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-amber-400 text-xs font-semibold flex items-start gap-3"><svg class="h-5 w-5 text-amber-500 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg> <div><strong class="font-bold block text-sm text-amber-600 dark:text-amber-500">Corporate Account Pending Review</strong> <span class="mt-1 block leading-relaxed text-slate-500 dark:text-amber-500/80">Your profile details are currently being validated by our system admins. You will have full access to create internship posts, view student resumes, and issue placement certificates once approved. Review takes up to 24 hours.</span></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		children($$renderer);
		$$renderer.push(`<!----></div></div></div>`);
	});
}
//#endregion
export { _layout as default };
