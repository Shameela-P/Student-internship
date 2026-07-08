import { n as onDestroy } from "../../../chunks/index-server.js";
import { E as escape_html, T as clsx, a as derived, t as attr_class, w as attr } from "../../../chunks/server.js";
import "../../../chunks/firebase.js";
import { t as page } from "../../../chunks/state.js";
import { t as logo_default } from "../../../chunks/logo.js";
import "firebase/database";
//#region src/routes/student/+layout.svelte
function _layout($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, children } = $$props;
		const student = derived(() => data.student);
		onDestroy(() => {});
		function getLinkClass(path) {
			if (page.url.pathname === path) return "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-355 cursor-pointer bg-indigo-600 text-white shadow-md shadow-indigo-500/10";
			return "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-355 cursor-pointer text-slate-600 hover:bg-slate-50 hover:text-slate-900";
		}
		$$renderer.push(`<div class="min-h-screen flex flex-col md:flex-row bg-slate-50 transition-colors duration-300"><aside class="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white fixed top-0 bottom-0 left-0 z-20"><div class="p-6 border-b border-slate-200 flex items-center gap-3"><img loading="lazy"${attr("src", logo_default)} alt="Nexora Logo" class="h-9 w-9 drop-shadow-sm"/> <span class="font-display font-extrabold text-xl text-slate-900">Nexora</span></div> <nav class="flex-grow p-4 space-y-1 mt-4 overflow-y-auto"><a href="/student"${attr_class(clsx(getLinkClass("/student")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg> Overview</a> <a href="/student/internships"${attr_class(clsx(getLinkClass("/student/internships")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg> Find Internships</a> <a href="/student/companies"${attr_class(clsx(getLinkClass("/student/companies")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Companies</a> <a href="/student/certificates"${attr_class(clsx(getLinkClass("/student/certificates")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg> Certificates</a> <a href="/student/messages"${attr_class(clsx(getLinkClass("/student/messages")))}><div class="relative flex items-center gap-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> <span>Messages</span> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></a> <a href="/student/notifications"${attr_class(clsx(getLinkClass("/student/notifications")))}><div class="relative flex items-center gap-3 w-full"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> <span>Notifications</span> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div></a> <a href="/student/profile"${attr_class(clsx(getLinkClass("/student/profile")))}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> My Profile</a></nav> <div class="p-4 border-t border-slate-200 bg-slate-50"><div class="flex items-center gap-3"><div class="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold font-display uppercase border border-indigo-50/5">`);
		if (student().profilePhoto) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<img loading="lazy"${attr("src", student().profilePhoto)}${attr("alt", student().fullName)} class="h-10 w-10 rounded-full object-cover"/>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`${escape_html(student().fullName.charAt(0))}`);
		}
		$$renderer.push(`<!--]--></div> <div class="flex-grow min-w-0"><h4 class="text-sm font-bold text-slate-850 truncate">${escape_html(student().fullName)}</h4> <span class="text-xs text-slate-550 truncate block font-semibold">Student</span></div></div> <a href="/logout" class="mt-4 flex items-center justify-center gap-2 py-2 w-full rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition duration-150 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" x2="9" y1="12" y2="12"></line></svg> Sign Out</a></div></aside> <header class="md:hidden w-full flex items-center justify-between py-4 px-6 border-b border-slate-200 bg-white/90 backdrop-blur-lg sticky top-0 z-30"><div class="flex items-center gap-3"><img loading="lazy"${attr("src", logo_default)} alt="Nexora Logo" class="h-8 w-8 drop-shadow-sm"/> <span class="font-display font-extrabold text-lg">Nexora</span></div> <div class="flex items-center gap-3"><a href="/student/notifications" class="relative p-2 text-slate-600"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></a> <button class="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 focus:outline-none cursor-pointer">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`);
		$$renderer.push(`<!--]--></button></div></header> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex-grow md:ml-64 p-6 md:p-10 min-h-screen relative flex flex-col"><div class="max-w-6xl w-full mx-auto flex-grow flex flex-col">`);
		children($$renderer);
		$$renderer.push(`<!----></div></div></div>`);
	});
}
//#endregion
export { _layout as default };
