import { n as onDestroy } from "../../../../chunks/index-server.js";
import { E as escape_html, a as derived, o as ensure_array_like, t as attr_class } from "../../../../chunks/server.js";
import { t as app } from "../../../../chunks/firebase.js";
import "../../../../chunks/navigation.js";
import { getDatabase } from "firebase/database";
//#region src/routes/student/notifications/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		derived(() => data.student);
		let notifications = data.notifications || [];
		getDatabase(app);
		onDestroy(() => {});
		let activeIndex = null;
		$$renderer.push(`<div class="mb-8"><h1 class="font-display font-black text-3xl text-primary dark:text-primary-dark tracking-tight">Interactive Alert Inbox</h1> <p class="text-sm text-muted dark:text-muted-dark mt-1">Nexora email simulation inbox. Check automated emails, alerts, and registration notifications.</p></div> `);
		if (notifications.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-12 rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><path d="M2 9.5 12 14l10-4.5"></path></svg></div> <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">Inbox is empty</p> <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">When automated triggers run, copies will appear here.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array = ensure_array_like(notifications);
			for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
				let notif = each_array[idx];
				const isFraud = notif.subject.toLowerCase().includes("fraud") || notif.subject.toLowerCase().includes("critical") || notif.subject.toLowerCase().includes("warning");
				$$renderer.push(`<div${attr_class(`rounded-2xl glass-card border transition-all duration-200 overflow-hidden ${activeIndex === idx ? "border-indigo-500/25 ring-2 ring-indigo-500/5" : isFraud ? "border-rose-500/20 bg-rose-500/5" : "border-slate-200/10 dark:border-slate-800/40"}`)}><button class="w-full text-left p-5 flex items-center justify-between gap-6 hover:bg-slate-200/20 dark:hover:bg-slate-900/20 transition cursor-pointer focus:outline-none"><div class="flex-grow min-w-0"><div class="flex items-center gap-2 flex-wrap">`);
				if (isFraud) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-black tracking-wider uppercase">CRITICAL ALERT</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">System Mail</span>`);
				}
				$$renderer.push(`<!--]--> <span class="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">${escape_html(new Date(notif.date).toLocaleString())}</span></div> <h3 class="font-display font-bold text-sm md:text-base text-primary dark:text-primary-dark mt-2 truncate">${escape_html(notif.subject)}</h3></div> <div${attr_class(`text-slate-600 dark:text-slate-400 shrink-0 transform transition duration-200 ${activeIndex === idx ? "rotate-90" : ""}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></div></button> `);
				if (activeIndex === idx) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="px-5 pb-6 pt-2 border-t border-slate-200/5 dark:border-slate-800/10 bg-slate-100/10 dark:bg-slate-900/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans"><div class="whitespace-pre-line text-xs md:text-sm">${escape_html(notif.body)}</div></div>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
