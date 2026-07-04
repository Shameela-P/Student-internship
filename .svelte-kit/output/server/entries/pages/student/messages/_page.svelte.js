import "../../../../chunks/index-server.js";
import { S as escape_html, i as ensure_array_like, r as derived, t as attr_class } from "../../../../chunks/server.js";
import { t as buildThreadSummaries } from "../../../../chunks/messages.js";
import "../../../../chunks/client.js";
import "../../../../chunks/navigation.js";
import "../../../../chunks/forms.js";
//#region src/routes/student/messages/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const student = derived(() => data.student);
		const messages = derived(() => data.messages);
		const contacts = derived(() => data.contacts);
		let newChatQuery = "";
		const threads = derived(() => buildThreadSummaries(messages(), student().email));
		derived(() => threads().find((t) => t.email.toLowerCase() === void 0));
		derived(() => messages().filter((m) => m.senderEmail.toLowerCase() === student().email.toLowerCase() && m.recipientEmail.toLowerCase() === void 0 || m.senderEmail.toLowerCase() === void 0 && m.recipientEmail.toLowerCase() === student().email.toLowerCase()).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
		derived(() => contacts().filter((c) => c.name.toLowerCase().includes(newChatQuery.toLowerCase()) || c.email.toLowerCase().includes(newChatQuery.toLowerCase())));
		$$renderer.push(`<div class="grow flex flex-col md:flex-row h-[78vh] rounded-2xl bg-slate-905 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl"><div class="w-full md:w-80 border-r border-slate-200 dark:border-slate-800/50 bg-white dark:bg-slate-900/40 flex flex-col justify-between shrink-0"><div><div class="p-4 border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between"><h2 class="font-display font-black text-lg text-slate-900 dark:text-white">Inbox</h2> <button class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer" title="Start Conversation"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div> <div class="divide-y divide-slate-850/50 max-h-[68vh] overflow-y-auto">`);
		if (threads().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-8 text-center text-slate-500 text-xs font-semibold">No active message threads yet. Click the edit icon to compose a chat.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(threads());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let thread = each_array[$$index];
				$$renderer.push(`<button${attr_class(`w-full text-left p-4 hover:bg-white dark:bg-slate-900/50 transition duration-150 flex items-start gap-3 relative focus:outline-none ${void 0 === thread.email.toLowerCase() ? "bg-slate-900/80 border-l-2 border-blue-500" : ""}`)}><div class="h-9 w-9 rounded-xl bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-display font-black text-sm shrink-0">${escape_html(thread.name.charAt(0))}</div> <div class="min-w-0 grow"><div class="flex items-center justify-between"><h4 class="font-display font-bold text-xs text-slate-900 dark:text-white truncate pr-2">${escape_html(thread.name)}</h4> <span class="text-[9px] text-slate-500 font-bold shrink-0">${escape_html(new Date(thread.lastTimestamp).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}))}</span></div> <p class="text-[10px] text-slate-600 dark:text-slate-400 truncate mt-1 leading-normal">${escape_html(thread.lastMessage)}</p></div> `);
				if (thread.unreadCount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="absolute top-4 right-4 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-black text-slate-900 dark:text-white animate-pulse">${escape_html(thread.unreadCount)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></button>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="p-4 border-t border-slate-200 dark:border-slate-800/50 bg-slate-900/20 text-slate-500 text-[10px] font-bold">Connected as: ${escape_html(student().email)}</div></div> <div class="grow flex flex-col justify-between bg-slate-950/20">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="grow flex flex-col items-center justify-center text-slate-500 text-xs"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 text-slate-650" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg> Select a conversation from the sidebar to view chat messages</div>`);
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
