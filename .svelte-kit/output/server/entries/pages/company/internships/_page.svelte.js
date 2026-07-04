import { S as escape_html, b as attr, i as ensure_array_like, r as derived, t as attr_class } from "../../../../chunks/server.js";
import "../../../../chunks/forms.js";
//#region src/routes/company/internships/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const internships = derived(() => data.internships);
		derived(() => data.domains);
		const company = derived(() => data.company);
		const approved = derived(() => company().status === "Approved");
		$$renderer.push(`<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="font-display font-black text-3xl text-slate-900 dark:text-white tracking-tight">Manage Internship Postings</h1> <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Create new placement listings, update requirements, and review existing postings.</p></div> <button${attr("disabled", !approved(), true)} class="px-5 py-3 rounded-xl text-sm font-bold text-slate-900 dark:text-white bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg> Publish Opportunity</button></div> `);
		if (form?.error) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg> ${escape_html(form.error)}</div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (internships().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-12 rounded-3xl bg-slate-100 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-slate-950 text-slate-500 flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-800"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path></svg></div> <p class="text-sm font-semibold text-slate-600 dark:text-slate-400">No postings active yet</p> <p class="text-xs text-slate-500 mt-1">Click the top-right button to publish your first internship opportunity.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
			const each_array = ensure_array_like(internships());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let intern = each_array[$$index];
				const isExpired = intern.status === "Closed";
				$$renderer.push(`<div${attr_class(`p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900/40 hover:bg-slate-900/60 border hover:border-blue-500/30 shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 transition duration-300 flex flex-col justify-between ${isExpired ? "opacity-70 border-slate-200 dark:border-slate-800/50" : "border-slate-200 dark:border-slate-800/50"}`)}><div><div class="flex items-start justify-between"><div><div class="flex flex-wrap gap-1.5"><span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">${escape_html(intern.type)}</span> `);
				if (intern.status === "Active") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>`);
				} else if (intern.status === "Closed") {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/20">Closed</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-slate-800 text-slate-600 dark:text-slate-400">Archived</span>`);
				}
				$$renderer.push(`<!--]--></div> <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white mt-3.5 truncate max-w-xs">${escape_html(intern.title)}</h3> <span class="text-xs text-slate-600 dark:text-slate-400 block mt-0.5">${escape_html(intern.domain)} • ${escape_html(intern.subCategory)}</span></div></div> <p class="mt-4 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">${escape_html(intern.description)}</p> <div class="flex flex-wrap gap-x-4 gap-y-2 mt-5 text-[10px] font-bold text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/50 pt-4"><span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${escape_html(intern.location)} (${escape_html(intern.mode)})</span> <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${escape_html(intern.duration)}</span> <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> ${escape_html(intern.openings)} Openings</span> `);
				if (intern.stipendAmount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-emerald-400 font-bold">₹${escape_html(intern.stipendAmount)}/mo</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.fee > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-rose-400 font-bold">Fee: ₹${escape_html(intern.fee)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/50 flex items-center justify-between"><span class="text-[10px] text-slate-500 font-bold">Deadline: ${escape_html(intern.lastDateToApply)}</span> <div class="flex items-center gap-2"><button class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-800 text-[10px] font-bold text-slate-300 hover:text-slate-900 dark:text-white transition cursor-pointer">Edit</button> `);
				if (intern.status === "Active") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<form action="?/archiveInternship" method="POST"><input type="hidden" name="id"${attr("value", intern.id)}/> <button type="submit" class="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-800 text-[10px] font-bold text-amber-500 transition cursor-pointer">Archive</button></form>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> <form action="?/deleteInternship" method="POST"><input type="hidden" name="id"${attr("value", intern.id)}/> <button type="submit" class="px-3 py-1.5 rounded-lg border border-rose-500/10 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 text-[10px] font-bold transition cursor-pointer">Delete</button></form></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
