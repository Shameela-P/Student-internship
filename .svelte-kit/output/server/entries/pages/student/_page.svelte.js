import { E as escape_html, a as derived, o as ensure_array_like, r as await_block, t as attr_class, w as attr } from "../../../chunks/server.js";
//#region src/routes/student/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const student = derived(() => data.student);
		const stats = derived(() => data.stats);
		$$renderer.push(`<div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h1 class="font-display font-black text-3xl md:text-4xl text-slate-900 tracking-tight">Welcome, ${escape_html(student().fullName)}!</h1> <p class="text-sm text-slate-500 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1"><span>${escape_html(student().degreeCourse)} in ${escape_html(student().department)}</span> <span class="h-1.5 w-1.5 rounded-full bg-slate-350"></span> <span>${escape_html(student().collegeName)}</span></p></div> <div class="flex items-center gap-3"><div class="text-right"><span class="text-xs font-bold text-slate-500 uppercase tracking-widest block">Current Status</span> <span class="inline-flex items-center gap-1.5 mt-1 text-sm font-bold text-emerald-500"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> ${escape_html(student().currentStatus)}</span></div></div></div> <div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10"><div class="p-6 rounded-2xl bg-white border border-slate-200/50 hover:scale-[1.01] transition duration-200"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Applied</span> <h2 class="font-display font-black text-3xl text-indigo-600 mt-3">${escape_html(stats()?.totalApplied || 0)}</h2> <p class="text-xs text-slate-500 mt-1">Total applications submitted</p></div> <div class="p-6 rounded-2xl bg-white border border-slate-200/50 hover:scale-[1.01] transition duration-200"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Approved</span> <h2 class="font-display font-black text-3xl text-emerald-500 mt-3">${escape_html(stats()?.approvedCount || 0)}</h2> <p class="text-xs text-slate-500 mt-1">Hired &amp; active contracts</p></div> <div class="p-6 rounded-2xl bg-white border border-slate-200/50 hover:scale-[1.01] transition duration-200"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</span> <h2 class="font-display font-black text-3xl text-amber-500 mt-3">${escape_html(stats()?.pendingCount || 0)}</h2> <p class="text-xs text-slate-500 mt-1">Under review / Shortlisted</p></div> <div class="p-6 rounded-2xl bg-white border border-slate-200/50 hover:scale-[1.01] transition duration-200"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificates</span> <h2 class="font-display font-black text-3xl text-pink-500 mt-3">${escape_html(stats()?.certificatesCount || 0)}</h2> <p class="text-xs text-slate-500 mt-1">Issued completion documents</p></div></div> <div class="mb-10"><div class="flex items-center justify-between mb-6"><h2 class="font-display font-bold text-xl text-slate-900">Recommended for Your Skill Set</h2> <a href="/student/internships" class="text-xs font-bold text-indigo-500 hover:underline">Browse All Postings</a></div> `);
		await_block($$renderer, data.lazy.recommendations, () => {
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse"><div class="h-44 bg-slate-200/60 rounded-2xl"></div> <div class="h-44 bg-slate-200/60 rounded-2xl"></div> <div class="h-44 bg-slate-200/60 rounded-2xl"></div></div>`);
		}, (recommendations) => {
			if (recommendations.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="p-8 rounded-2xl bg-white border border-slate-200/50 text-center"><p class="text-sm text-slate-500">No matching active recommendations found. Try adding more skills to your profile.</p> <a href="/student/profile" class="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold">Update Skills</a></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-6"><!--[-->`);
				const each_array = ensure_array_like(recommendations);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let intern = each_array[$$index];
					$$renderer.push(`<div class="p-6 rounded-2xl bg-white border border-slate-200/50 hover:border-indigo-500/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"><div${attr_class(`absolute top-4 right-4 py-1.5 px-3 rounded-full text-[10px] font-black tracking-wider flex items-center gap-1.5 ${intern.matchScore >= 80 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`)}><span${attr_class(`h-1.5 w-1.5 rounded-full ${intern.matchScore >= 80 ? "bg-emerald-500" : "bg-amber-500"}`)}></span> ${escape_html(intern.matchScore)}% MATCH</div> <div class="pt-4"><span class="text-xs text-slate-500 block truncate">${escape_html(intern.domain)}</span> <h3 class="font-display font-bold text-base text-slate-900 mt-2 group-hover:text-indigo-500 transition truncate">${escape_html(intern.title)}</h3> <span class="text-xs font-semibold text-slate-550 block mt-1">${escape_html(intern.companyName)}</span> <div class="flex items-center gap-4 mt-5 text-[11px] font-bold text-slate-500"><span class="bg-slate-200/50 px-2 py-1 rounded">${escape_html(intern.mode)}</span> `);
					if (intern.stipendAmount > 0) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="text-emerald-500">₹${escape_html(intern.stipendAmount)}/mo</span>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span>Unpaid</span>`);
					}
					$$renderer.push(`<!--]--></div></div> <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between"><span class="text-[10px] text-slate-500">Apply by: ${escape_html(intern.lastDateToApply)}</span> <a href="/student/internships" class="text-xs font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1 cursor-pointer">Apply <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></a></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<!--]--></div> <div><h2 class="font-display font-bold text-xl text-slate-900 mb-6">My Internship Applications</h2> `);
		await_block($$renderer, data.lazy.applications, () => {
			$$renderer.push(`<div class="space-y-4 animate-pulse"><div class="h-28 bg-slate-200/60 rounded-2xl"></div> <div class="h-28 bg-slate-200/60 rounded-2xl"></div></div>`);
		}, (applications) => {
			if (applications.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="p-12 rounded-3xl bg-white border border-slate-200/50 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="4" rx="2"></rect><rect width="12" height="12" x="4" y="4" rx="2"></rect></svg></div> <p class="text-sm font-semibold text-slate-550">You haven't applied for any internships yet.</p> <p class="text-xs text-slate-550 mt-1">Explore our listings and kickstart your career today!</p> <a href="/student/internships" class="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 shadow-md shadow-indigo-500/10 transition">Explore Internships</a></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-4"><!--[-->`);
				const each_array_1 = ensure_array_like(applications);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let app = each_array_1[$$index_1];
					$$renderer.push(`<div class="p-6 rounded-2xl bg-white border border-slate-200/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6"><div class="flex-grow min-w-0"><div class="flex flex-wrap items-center gap-2"><span class="text-xs font-bold uppercase tracking-wider text-slate-500">${escape_html(app.domain)}</span> <span class="h-1 w-1 rounded-full bg-slate-350"></span> <span class="text-xs text-slate-500">${escape_html(app.mode)} • ${escape_html(app.duration)}</span></div> <h3 class="font-display font-bold text-lg text-slate-900 mt-1.5 truncate">${escape_html(app.internshipTitle)}</h3> <span class="text-xs font-semibold text-slate-550 block mt-0.5">${escape_html(app.companyName)}</span></div> <div class="flex items-center gap-4 lg:gap-8 bg-slate-100/50 px-5 py-3 rounded-2xl border border-slate-200/5 max-w-md w-full"><div class="flex items-center justify-between w-full relative"><div class="absolute top-[9px] left-3 right-3 h-0.5 bg-slate-250 z-0"></div> <div class="flex flex-col items-center z-10 text-center"><span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-black bg-indigo-600 text-white ring-4 ring-indigo-500/10">✓</span> <span class="text-[9px] font-bold text-slate-500 mt-1.5">Submitted</span></div> <div class="flex flex-col items-center z-10 text-center">`);
					if (app.status === "Shortlisted" || app.status === "Approved" || app.status === "Rejected") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-black bg-indigo-600 text-white ring-4 ring-indigo-500/10">✓</span>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-slate-200 text-slate-600">2</span>`);
					}
					$$renderer.push(`<!--]--> <span class="text-[9px] font-bold text-slate-500 mt-1.5">Review</span></div> <div class="flex flex-col items-center z-10 text-center">`);
					if (app.status === "Approved") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-black bg-emerald-500 text-white ring-4 ring-emerald-500/10">✓</span> <span class="text-[9px] font-bold text-emerald-500 mt-1.5">Hired</span>`);
					} else {
						$$renderer.push("<!--[-1-->");
						if (app.status === "Rejected") {
							$$renderer.push("<!--[0-->");
							$$renderer.push(`<span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-black bg-rose-500 text-white ring-4 ring-rose-500/10">✕</span> <span class="text-[9px] font-bold text-rose-500 mt-1.5">Closed</span>`);
						} else {
							$$renderer.push("<!--[-1-->");
							$$renderer.push(`<span class="h-4.5 w-4.5 rounded-full flex items-center justify-center text-[9px] font-bold bg-slate-200 text-slate-600">3</span> <span class="text-[9px] font-bold text-slate-500 mt-1.5">Outcome</span>`);
						}
						$$renderer.push(`<!--]-->`);
					}
					$$renderer.push(`<!--]--></div></div></div> <div class="flex items-center gap-3 justify-end shrink-0">`);
					if (app.status === "Approved") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600">Approved</span>`);
					} else if (app.status === "Rejected") {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600">Rejected</span>`);
					} else if (app.status === "Shortlisted") {
						$$renderer.push("<!--[2-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600">Shortlisted</span>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600">Pending</span>`);
					}
					$$renderer.push(`<!--]--> `);
					if (app.status === "Approved" && app.certificateHash) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<a${attr("href", `/student/certificates?hash=${app.certificateHash}`)} class="p-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 border border-pink-500/10 hover:border-pink-500/20 hover:scale-105 transition duration-150 cursor-pointer" title="Download Internship Certificate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M7 12h10"></path><path d="M12 7v10"></path></svg></a>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]-->`);
		});
		$$renderer.push(`<!--]--></div>`);
	});
}
//#endregion
export { _page as default };
