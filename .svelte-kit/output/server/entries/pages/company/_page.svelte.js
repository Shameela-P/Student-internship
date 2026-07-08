import { E as escape_html, a as derived, n as attr_style, o as ensure_array_like, r as await_block, u as stringify } from "../../../chunks/server.js";
//#region src/routes/company/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const company = derived(() => data.company);
		$$renderer.push(`<div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h1 class="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">Corporate Overview</h1> <p class="text-sm text-slate-500 mt-1">Recruiter Dashboard for ${escape_html(company().companyName)} • Sector: ${escape_html(company().industryType)}</p></div> `);
		if (company().status === "Approved") {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<a href="/company/internships" class="px-5 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg shadow-indigo-500/10 flex items-center gap-1.5 transition cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg> Post Internship</a>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> `);
		await_block($$renderer, data.lazy.dashboardData, () => {
			$$renderer.push(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10 animate-pulse"><div class="h-28 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl"></div> <div class="h-28 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl"></div> <div class="h-28 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl"></div> <div class="h-28 bg-slate-200/60 dark:bg-slate-800/60 rounded-2xl"></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 animate-pulse"><div class="lg:col-span-2 h-72 bg-slate-200/60 dark:bg-slate-800/60 rounded-3xl"></div> <div class="h-72 bg-slate-200/60 dark:bg-slate-800/60 rounded-3xl"></div></div>`);
		}, (dashboard) => {
			const stats = dashboard.stats;
			const chartData = dashboard.barChartData;
			const recentApps = dashboard.recentApplications;
			const maxVal = chartData.length > 0 ? Math.max(...chartData.map((d) => d.value), 1) : 1;
			$$renderer.push(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10"><div class="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Postings</span> <h2 class="font-display font-black text-3xl text-indigo-600 dark:text-indigo-400 mt-3">${escape_html(stats.activePostings)}</h2> <p class="text-xs text-slate-500 mt-1">Open for submissions</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Received</span> <h2 class="font-display font-black text-3xl text-purple-500 mt-3">${escape_html(stats.totalApplications)}</h2> <p class="text-xs text-slate-500 mt-1">Hiring funnel entries</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Audit</span> <h2 class="font-display font-black text-3xl text-amber-500 mt-3">${escape_html(stats.pendingApplications)}</h2> <p class="text-xs text-slate-500 mt-1">Awaiting reviewer feedback</p></div> <div class="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40"><span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Shortlisted</span> <h2 class="font-display font-black text-3xl text-emerald-500 mt-3">${escape_html(stats.shortlistedCandidates)}</h2> <p class="text-xs text-slate-500 mt-1">Passed initial screenings</p></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10"><div class="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between"><div><h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-2">Application Distribution</h3> <p class="text-xs text-slate-500">Applications count per active internship opening.</p></div> `);
			if (chartData.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="py-16 text-center text-xs text-slate-500">No active posting data available for analysis.</div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="mt-8 flex flex-col gap-5"><!--[-->`);
				const each_array = ensure_array_like(chartData);
				for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
					let bar = each_array[$$index];
					const percentage = Math.round(bar.value / maxVal * 100);
					$$renderer.push(`<div class="space-y-1.5"><div class="flex items-center justify-between text-xs font-semibold"><span class="text-slate-700 dark:text-slate-300 truncate max-w-sm">${escape_html(bar.title)}</span> <span class="text-slate-500">${escape_html(bar.value)} applicants</span></div> <div class="h-3.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200/5 dark:border-slate-800/20"><div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"${attr_style(`width: ${stringify(percentage)}%`)}></div></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div> <div class="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 flex flex-col justify-between"><div><h3 class="font-display font-bold text-base text-slate-900 dark:text-white mb-2">Candidate Pipeline</h3> <p class="text-xs text-slate-500">Current status breakdowns</p></div> <div class="space-y-4 my-6"><div class="flex items-center justify-between text-xs font-semibold"><span class="flex items-center gap-2 text-slate-500"><span class="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Pending</span> <span class="text-slate-800 dark:text-white">${escape_html(stats.pendingApplications)}</span></div> <div class="flex items-center justify-between text-xs font-semibold"><span class="flex items-center gap-2 text-slate-500"><span class="h-2.5 w-2.5 rounded-full bg-indigo-500"></span> Shortlisted</span> <span class="text-slate-800 dark:text-white">${escape_html(stats.shortlistedCandidates)}</span></div> <div class="flex items-center justify-between text-xs font-semibold"><span class="flex items-center gap-2 text-slate-500"><span class="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Approved (Hired)</span> <span class="text-slate-800 dark:text-white">${escape_html(stats.approvedHires)}</span></div> <div class="flex items-center justify-between text-xs font-semibold"><span class="flex items-center gap-2 text-slate-500"><span class="h-2.5 w-2.5 rounded-full bg-rose-500"></span> Rejected</span> <span class="text-slate-800 dark:text-white">${escape_html(stats.rejectedApplications)}</span></div></div> <div class="border-t border-slate-100 dark:border-slate-800/40 pt-4 flex items-center justify-between text-xs"><span class="text-slate-500 font-semibold">Conversion Rate:</span> <strong class="text-emerald-500 font-bold">${escape_html(stats.totalApplications > 0 ? Math.round(stats.approvedHires / stats.totalApplications * 100) : 0)}%</strong></div></div></div> <div><div class="flex items-center justify-between mb-6"><h2 class="font-display font-bold text-xl text-slate-900 dark:text-white">Incoming Candidate Feed</h2> <a href="/company/applications" class="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:underline">View All Queue</a></div> `);
			if (recentApps.length === 0) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<div class="p-12 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 text-center flex flex-col items-center"><div class="h-12 w-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg></div> <p class="text-sm font-semibold text-slate-500">No applications received yet.</p> <p class="text-xs text-slate-500 mt-1">Once students apply, their details will display here.</p></div>`);
			} else {
				$$renderer.push("<!--[-1-->");
				$$renderer.push(`<div class="space-y-4"><!--[-->`);
				const each_array_1 = ensure_array_like(recentApps);
				for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
					let app = each_array_1[$$index_1];
					$$renderer.push(`<div class="p-6 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6"><div class="flex-grow min-w-0"><span class="text-xs font-bold uppercase tracking-wider text-slate-500">${escape_html(app.domain)}</span> <h3 class="font-display font-bold text-lg text-slate-900 dark:text-white mt-1.5 truncate">${escape_html(app.studentName)}</h3> <p class="text-xs text-slate-500 mt-0.5">${escape_html(app.studentCollege)} • ${escape_html(app.studentDepartment)}</p></div> <div class="flex items-center gap-6 shrink-0"><div class="text-right"><span class="text-[10px] text-slate-500 uppercase font-black tracking-widest block">Position</span> <span class="text-sm font-bold text-indigo-500 block truncate max-w-[150px]">${escape_html(app.internshipTitle)}</span></div> `);
					if (app.status === "Approved") {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500">Approved</span>`);
					} else if (app.status === "Rejected") {
						$$renderer.push("<!--[1-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500">Rejected</span>`);
					} else if (app.status === "Shortlisted") {
						$$renderer.push("<!--[2-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-500">Shortlisted</span>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<span class="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500">Pending</span>`);
					}
					$$renderer.push(`<!--]--></div></div>`);
				}
				$$renderer.push(`<!--]--></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		});
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
export { _page as default };
