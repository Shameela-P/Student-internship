import { n as onDestroy } from "../../../../chunks/index-server.js";
import { E as escape_html, a as derived, o as ensure_array_like, t as attr_class } from "../../../../chunks/server.js";
import { t as app } from "../../../../chunks/firebase.js";
import "../../../../chunks/forms.js";
import { getDatabase } from "firebase/database";
//#region src/routes/admin/messages/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		let messages = [];
		const contacts = derived(() => data.contacts);
		const adminEmail = "admin@nexora.com";
		let newChatQuery = "";
		getDatabase(app);
		onDestroy(() => {});
		const threads = derived(() => {
			const map = /* @__PURE__ */ new Map();
			messages.forEach((m) => {
				const isSender = m.senderEmail.toLowerCase() === adminEmail.toLowerCase();
				const contactEmail = isSender ? m.recipientEmail : m.senderEmail;
				const contactName = isSender ? m.recipientName : m.senderName;
				const contactRole = isSender ? m.recipientRole : m.senderRole;
				const existing = map.get(contactEmail.toLowerCase());
				if (!existing || new Date(m.timestamp) > new Date(existing.lastTimestamp)) map.set(contactEmail.toLowerCase(), {
					email: contactEmail,
					name: contactName,
					role: contactRole,
					lastMessage: m.content || "",
					lastTimestamp: m.timestamp,
					unreadCount: !isSender && !m.read ? 1 : 0
				});
				else if (!isSender && !m.read) existing.unreadCount += 1;
			});
			return Array.from(map.values()).sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));
		});
		derived(() => threads().find((t) => t.email.toLowerCase() === void 0));
		derived(() => messages.filter((m) => m.senderEmail.toLowerCase() === adminEmail.toLowerCase() && m.recipientEmail.toLowerCase() === void 0 || m.senderEmail.toLowerCase() === void 0 && m.recipientEmail.toLowerCase() === adminEmail.toLowerCase()).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
		derived(() => contacts().filter((c) => c.name.toLowerCase().includes(newChatQuery.toLowerCase()) || c.email.toLowerCase().includes(newChatQuery.toLowerCase())));
		$$renderer.push(`<div class="flex-grow flex flex-col md:flex-row h-[78vh] rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"><div class="w-full md:w-80 border-r border-slate-200 bg-slate-50 flex flex-col justify-between shrink-0"><div class="flex flex-col h-full"><div class="p-4 border-b border-slate-200 flex items-center justify-between bg-white"><h2 class="font-display font-bold text-lg text-slate-900">Inbox</h2> <button class="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer" title="Start Conversation"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button></div> <div class="divide-y divide-slate-150 overflow-y-auto flex-grow">`);
		if (threads().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-8 text-center text-slate-500 text-xs font-semibold">No active message threads yet. Click the edit icon to compose a chat.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--[-->`);
			const each_array = ensure_array_like(threads());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let thread = each_array[$$index];
				$$renderer.push(`<button${attr_class(`w-full text-left p-4 hover:bg-slate-100/80 transition duration-150 flex items-start gap-3 relative focus:outline-none ${void 0 === thread.email.toLowerCase() ? "bg-white border-l-4 border-indigo-650" : ""}`)}><div class="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold relative shrink-0">${escape_html(thread.name.charAt(0))} <span class="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white"></span></div> <div class="min-w-0 flex-grow"><div class="flex items-center justify-between"><h4 class="text-xs font-bold text-slate-850 truncate">${escape_html(thread.name)}</h4> <span class="text-[9px] text-slate-400 font-semibold">${escape_html(new Date(thread.lastTimestamp).toLocaleTimeString([], {
					hour: "2-digit",
					minute: "2-digit"
				}))}</span></div> <p class="text-xs text-slate-500 truncate mt-0.5">${escape_html(thread.lastMessage)}</p></div> `);
				if (thread.unreadCount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="absolute top-4 right-4 h-4 w-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">${escape_html(thread.unreadCount)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></button>`);
			}
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div></div></div> <div class="flex-grow flex flex-col bg-white">`);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<div class="flex-grow flex flex-col items-center justify-center text-center p-8 bg-slate-50/50"><div class="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div> <h3 class="font-display font-bold text-sm text-slate-900">Select a Thread</h3> <p class="text-xs text-slate-500 mt-1 max-w-xs">Pick a conversation from the sidebar or click compose to start messaging recruiters or candidates.</p></div>`);
		$$renderer.push(`<!--]--></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
