import { S as attr, i as ensure_array_like, r as derived, t as attr_class, w as escape_html } from "../../../chunks/server.js";
import "../../../chunks/forms.js";
//#region src/routes/admin/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const stats = derived(() => data.stats);
		const queue = derived(() => data.verificationQueue);
		const logs = derived(() => data.logs);
		const activeCompanies = derived(() => data.activeCompanies);
		let verifyLoading = false;
		let modLoading = false;
		$$renderer.push(`<div class="mb-10"><h1 class="font-display font-black text-3xl md:text-4xl text-primary dark:text-primary-dark tracking-tight">Administrative Control Console</h1> <p class="text-sm text-muted dark:text-muted-dark mt-1">Nexora Platform Overview • Global statistics, vetting verification queues, and audit logs.</p></div> <div class="grid grid-cols-2 lg:grid-cols-6 gap-5 mb-10"><div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Students</span> <h2 class="font-display font-black text-2xl text-indigo-500 mt-2">${escape_html(stats().totalStudents)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Registered candidate profiles</p></div> <div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Companies</span> <h2 class="font-display font-black text-2xl text-emerald-500 mt-2">${escape_html(stats().totalCompanies)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Registered accounts (${escape_html(stats().pendingCompaniesCount)} pending)</p></div> <div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Internships</span> <h2 class="font-display font-black text-2xl text-purple-500 mt-2">${escape_html(stats().activeInternships)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Active program postings</p></div> <div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Applications</span> <h2 class="font-display font-black text-2xl text-amber-500 mt-2">${escape_html(stats().totalApplications)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Total application documents</p></div> <div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Placements</span> <h2 class="font-display font-black text-2xl text-pink-500 mt-2">${escape_html(stats().successfulPlacements)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Approved selections</p></div> <div class="p-5 rounded-2xl glass-card border border-slate-200/15 dark:border-slate-800/40 col-span-2 lg:col-span-1"><span class="text-xs font-bold text-muted dark:text-muted-dark uppercase tracking-wider">Certificates</span> <h2 class="font-display font-black text-2xl text-cyan-500 mt-2">${escape_html(stats().certificatesGenerated)}</h2> <p class="text-[10px] text-slate-600 dark:text-slate-400 mt-1">Issued verifications</p></div></div> <div class="mb-10"><h3 class="font-display font-bold text-xl text-primary dark:text-primary-dark mb-4">Active Corporate Accounts Moderation</h3> <div class="overflow-x-auto rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40"><table class="w-full text-left text-xs"><thead class="bg-slate-100/50 dark:bg-slate-900/50 text-muted dark:text-muted-dark font-bold"><tr><th class="p-4 rounded-tl-2xl">Company Name</th><th class="p-4">Email Contact</th><th class="p-4">Industry Domain</th><th class="p-4 rounded-tr-2xl text-right">Moderation Actions</th></tr></thead><tbody class="divide-y divide-slate-200/5 dark:divide-slate-800/20 text-slate-700 dark:text-slate-300"><!--[-->`);
		const each_array = ensure_array_like(activeCompanies());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let comp = each_array[$$index];
			$$renderer.push(`<tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition duration-150"><td class="p-4 font-bold">${escape_html(comp.companyName)}</td><td class="p-4">${escape_html(comp.companyEmail)}</td><td class="p-4">${escape_html(comp.industryType)}</td><td class="p-4 flex items-center justify-end gap-2"><button class="px-3 py-1.5 rounded-lg border border-amber-500/10 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 font-bold transition cursor-pointer">Warn</button> <form action="?/removeFakeCompany" method="POST"><input type="hidden" name="companyId"${attr("value", comp.id)}/> <button type="submit"${attr("disabled", modLoading, true)} class="px-3 py-1.5 rounded-lg border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 font-bold transition cursor-pointer disabled:opacity-50">Suspend</button></form></td></tr>`);
		}
		$$renderer.push(`<!--]-->`);
		if (activeCompanies().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<tr><td colspan="4" class="p-8 text-center text-slate-600 dark:text-slate-400 font-semibold">No active companies found.</td></tr>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></tbody></table></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2 space-y-6"><div class="p-6 rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40"><h3 class="font-display font-bold text-base text-primary dark:text-primary-dark mb-2 flex items-center justify-between"><span>Company Verification Queue</span> `);
		if (queue().length > 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<span class="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></h3> <p class="text-xs text-muted dark:text-muted-dark mb-6">Vet and approve newly registered companies before they can post openings or view resumes.</p> `);
		if (queue().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="py-16 text-center text-xs text-slate-600 dark:text-slate-400 border border-dashed border-divider dark:border-divider-dark rounded-2xl">Verification queue is empty. All registered companies verified.</div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_1 = ensure_array_like(queue());
			for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
				let comp = each_array_1[$$index_1];
				$$renderer.push(`<div class="p-5 rounded-2xl bg-white/50 dark:bg-slate-950/20 border border-slate-200/5 dark:border-slate-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div class="min-w-0 flex-grow"><h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">${escape_html(comp.companyName)}</h4> <span class="text-xs text-slate-600 dark:text-slate-400 block truncate mt-0.5">${escape_html(comp.companyEmail)} • ${escape_html(comp.industryType)}</span> <a${attr("href", comp.website)} target="_blank" rel="noopener noreferrer" class="text-[10px] text-indigo-500 font-semibold hover:underline block mt-1">Visit website ↗</a></div> <div class="flex items-center gap-2 shrink-0 justify-end"><form action="?/rejectCompany" method="POST"><input type="hidden" name="companyId"${attr("value", comp.id)}/> <button type="submit"${attr("disabled", verifyLoading, true)} class="px-3.5 py-2 rounded-xl border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 text-xs font-bold transition cursor-pointer disabled:opacity-50">Reject</button></form> <form action="?/approveCompany" method="POST"><input type="hidden" name="companyId"${attr("value", comp.id)}/> <button type="submit"${attr("disabled", verifyLoading, true)} class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-primary dark:text-primary-dark text-xs font-bold shadow-md shadow-emerald-500/10 transition cursor-pointer disabled:opacity-50">Approve</button></form></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="p-6 rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40 flex flex-col"><h3 class="font-display font-bold text-base text-primary dark:text-primary-dark mb-2">Platform Audit Stream</h3> <p class="text-xs text-muted dark:text-muted-dark mb-6">Live system activities and transaction logs.</p> <div class="flex-grow overflow-y-auto max-h-[400px] pr-2 space-y-4"><!--[-->`);
		const each_array_2 = ensure_array_like(logs());
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let log = each_array_2[$$index_2];
			const actionColor = log.action.includes("FRAUD") || log.action.includes("BLOCK") ? "text-rose-500 bg-rose-500/10" : log.action.includes("CREATE") || log.action.includes("REGISTER") ? "text-emerald-500 bg-emerald-500/10" : "text-indigo-500 bg-indigo-500/10";
			$$renderer.push(`<div class="p-4 bg-slate-100/40 dark:bg-slate-950/20 border border-slate-200/5 dark:border-slate-800/20 rounded-2xl text-xs flex flex-col gap-2 hover:border-slate-300 dark:hover:border-divider-dark/40 transition"><div class="flex items-center justify-between gap-4 font-bold"><span${attr_class(`px-2.5 py-1 rounded-md text-[9px] tracking-widest uppercase ${actionColor}`)}>${escape_html(log.action)}</span> <span class="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">${escape_html(new Date(log.timestamp).toLocaleTimeString())}</span></div> <p class="text-xs text-slate-700 dark:text-slate-300 font-medium font-sans">${escape_html(log.details)}</p> `);
			if (log.user && log.user !== "System") {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="grid grid-cols-2 gap-y-1.5 gap-x-4 mt-2 pt-2 border-t border-divider dark:border-divider-dark/40 text-[10px]"><div class="flex justify-between"><span class="text-slate-500 font-semibold uppercase">Actor:</span> <span class="text-slate-700 dark:text-slate-300 font-bold">${escape_html(log.user)} (${escape_html(log.role)})</span></div> <div class="flex justify-between"><span class="text-slate-500 font-semibold uppercase">Email:</span> <span class="text-slate-700 dark:text-slate-300 font-mono truncate max-w-[120px]">${escape_html(log.email)}</span></div> <div class="flex justify-between"><span class="text-slate-500 font-semibold uppercase">Target:</span> <span class="text-slate-700 dark:text-slate-300">${escape_html(log.target)}</span></div></div>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
