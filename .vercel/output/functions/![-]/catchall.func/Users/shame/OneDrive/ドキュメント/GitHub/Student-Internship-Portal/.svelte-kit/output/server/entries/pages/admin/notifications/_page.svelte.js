import { S as escape_html, b as attr, i as ensure_array_like, r as derived, t as attr_class } from "../../../../chunks/server.js";
import "../../../../chunks/navigation.js";
import "../../../../chunks/forms.js";
//#region src/routes/admin/notifications/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const notifications = derived(() => data.notifications);
		let activeIndex = null;
		$$renderer.push(`<div class="mb-8"><h1 class="font-display font-black text-3xl text-slate-900 dark:text-white tracking-tight">System Notifications</h1> <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Nexora administrative alerts and system notifications.</p></div> `);
		if (notifications().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-12 rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><path d="M2 9.5 12 14l10-4.5"></path></svg></div> <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">Inbox is empty</p> <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">System-generated administrative emails will appear here.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array = ensure_array_like(notifications());
			for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
				let notif = each_array[idx];
				$$renderer.push(`<div${attr_class(`rounded-2xl glass-card border transition-all duration-200 overflow-hidden ${activeIndex === idx ? "border-indigo-500/25 ring-2 ring-indigo-500/5" : "border-slate-200/10 dark:border-slate-800/40"}`)}><button class="w-full text-left p-5 flex items-center justify-between gap-6 hover:bg-slate-200/20 dark:hover:bg-slate-900/20 transition cursor-pointer focus:outline-none"><div class="grow min-w-0"><div class="flex items-center gap-2 flex-wrap"><span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">System Mail</span> <span class="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">${escape_html(new Date(notif.date).toLocaleString())}</span></div> <h3 class="font-display font-bold text-sm md:text-base text-slate-900 dark:text-white mt-2 truncate flex items-center gap-2">${escape_html(notif.subject)} `);
				if (!notif.read) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="h-2 w-2 rounded-full bg-blue-500"></span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></h3></div> <div${attr_class(`text-slate-600 dark:text-slate-400 shrink-0 transform transition duration-200 ${activeIndex === idx ? "rotate-90" : ""}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg></div></button> `);
				if (activeIndex === idx) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="px-5 pb-6 pt-2 border-t border-slate-200/5 dark:border-slate-800/10 bg-slate-100/10 dark:bg-slate-900/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans"><div class="whitespace-pre-line text-xs md:text-sm">${escape_html(notif.body)}</div> <div class="mt-4 flex justify-end"><form method="POST" action="?/deleteNotification"><input type="hidden" name="id"${attr("value", notif.id)}/> <button type="submit" class="px-4 py-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white rounded-lg text-xs font-bold transition">Delete Notification</button></form></div></div>`);
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
