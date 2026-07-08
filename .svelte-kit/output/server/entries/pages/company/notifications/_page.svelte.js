import { n as onDestroy } from "../../../../chunks/index-server.js";
import { E as escape_html, a as derived, o as ensure_array_like, t as attr_class } from "../../../../chunks/server.js";
import { t as app } from "../../../../chunks/firebase.js";
import { getDatabase } from "firebase/database";
//#region src/routes/company/notifications/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		derived(() => data.company);
		let notifications = [];
		getDatabase(app);
		onDestroy(() => {});
		let activeIndex = null;
		$$renderer.push(`<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="font-display font-black text-3xl text-slate-900 tracking-tight">Interactive Alert Inbox</h1> <p class="text-sm text-slate-500 mt-1">Nexora email simulation inbox. View incoming notifications, registration confirmations, and applicant filing alerts.</p></div> `);
		if (notifications.some((n) => !n.read)) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<button class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0">Mark All Read</button>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		if (notifications.length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-12 rounded-3xl bg-white border border-slate-200 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"></path><path d="M2 9.5 12 14l10-4.5"></path></svg></div> <p class="text-sm font-semibold text-slate-650">Inbox is empty</p> <p class="text-xs text-slate-500 mt-1">System-generated corporate emails will appear here when actions occur.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-3"><!--[-->`);
			const each_array = ensure_array_like(notifications);
			for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
				let notif = each_array[idx];
				const isCritical = notif.subject.toLowerCase().includes("fraud") || notif.subject.toLowerCase().includes("critical") || notif.subject.toLowerCase().includes("warning") || notif.subject.toLowerCase().includes("reject");
				const isSuccess = notif.subject.toLowerCase().includes("welcome") || notif.subject.toLowerCase().includes("approved") || notif.subject.toLowerCase().includes("success") || notif.subject.toLowerCase().includes("hired");
				$$renderer.push(`<div${attr_class(`rounded-2xl bg-white border transition-all duration-300 overflow-hidden ${activeIndex === idx ? "border-indigo-500 shadow-md" : "border-slate-200 "}`)}><div class="w-full p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition duration-150"><button class="flex-grow text-left flex items-start gap-3.5 focus:outline-none cursor-pointer"><div${attr_class(`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isCritical ? "bg-rose-50 text-rose-600" : isSuccess ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"}`)}>`);
				if (isCritical) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12" y1="17" y2="17"></line></svg>`);
				} else if (isSuccess) {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>`);
				}
				$$renderer.push(`<!--]--></div> <div class="min-w-0 flex-grow pt-0.5"><div class="flex items-center gap-2 flex-wrap"><span${attr_class(`text-[10px] font-bold uppercase tracking-wider ${isCritical ? "text-rose-600" : isSuccess ? "text-emerald-600" : "text-indigo-600"}`)}>${escape_html(isCritical ? "CRITICAL ALERT" : isSuccess ? "Confirmation" : "System Mail")}</span> <span class="text-[10px] text-slate-400 font-semibold">${escape_html(new Date(notif.date).toLocaleString([], {
					dateStyle: "short",
					timeStyle: "short"
				}))}</span></div> <h3 class="font-display font-bold text-sm text-slate-900 mt-1 truncate">${escape_html(notif.subject)}</h3></div></button> <div class="flex items-center gap-3 shrink-0">`);
				if (!notif.read) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="h-2.5 w-2.5 rounded-full bg-blue-600" title="Unread notification"></span> <button class="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition rounded-lg cursor-pointer">Mark Read</button>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <button class="text-slate-400 p-1 rounded-lg hover:bg-slate-100 transition duration-150 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"${attr_class(`transform transition duration-200 ${activeIndex === idx ? "rotate-90" : ""}`)}><path d="m9 18 6-6-6-6"></path></svg></button></div></div> `);
				if (activeIndex === idx) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 text-xs md:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">${escape_html(notif.body)}</div>`);
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
