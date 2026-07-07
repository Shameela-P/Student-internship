import { S as attr, i as ensure_array_like, r as derived, w as escape_html } from "../../../../chunks/server.js";
import "../../../../chunks/state.js";
import "../../../../chunks/forms.js";
//#region src/routes/student/internships/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data, form } = $$props;
		const internships = derived(() => data.internships);
		const domains = derived(() => data.domains);
		derived(() => data.student);
		const filters = derived(() => data.filters);
		$$renderer.push(`<div class="mb-8"><h1 class="font-display font-black text-3xl text-primary dark:text-primary-dark tracking-tight">Explore Placement Postings</h1> <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">Search and apply for placement contracts across 150+ domains.</p></div> <div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 mb-8 backdrop-blur-sm shadow-xl"><form method="GET" class="space-y-4" data-sveltekit-keepfocus="" data-sveltekit-replacestate=""><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div class="relative"><input type="text" name="query" id="query"${attr("value", filters().query)} placeholder="Search titles, skills, or companies..." class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"/> <svg class="absolute left-3 top-3 h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8" stroke-width="2"></circle><line x1="21" x2="16.65" y1="21" y2="16.65" stroke-width="2" stroke-linecap="round"></line></svg></div> <div><select name="domain" id="domain" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`All Domains`);
		});
		$$renderer.push(`<!--[-->`);
		const each_array = ensure_array_like(domains());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let domain = each_array[$$index];
			$$renderer.option({
				value: domain.name,
				selected: filters().domain === domain.name
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(domain.name)}`);
			});
		}
		$$renderer.push(`<!--]--></select></div> <div class="relative"><input type="text" name="location" id="location"${attr("value", filters().location)} placeholder="Filter by city/location..." class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500"/> <svg class="absolute left-3 top-3 h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke-width="2"></path><circle cx="12" cy="10" r="3" stroke-width="2"></circle></svg></div></div> <div class="grid grid-cols-2 lg:grid-cols-6 gap-3 pt-4 border-t border-divider dark:border-divider-dark/50"><div><select name="mode" id="mode" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`All Modes`);
		});
		$$renderer.option({
			value: "Online",
			selected: filters().mode === "Online"
		}, ($$renderer) => {
			$$renderer.push(`Online (Remote)`);
		});
		$$renderer.option({
			value: "Offline",
			selected: filters().mode === "Offline"
		}, ($$renderer) => {
			$$renderer.push(`Offline (On-Site)`);
		});
		$$renderer.option({
			value: "Hybrid",
			selected: filters().mode === "Hybrid"
		}, ($$renderer) => {
			$$renderer.push(`Hybrid`);
		});
		$$renderer.push(`</select></div> <div><select name="type" id="type" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`All Types`);
		});
		$$renderer.option({
			value: "Free Internship",
			selected: filters().type === "Free Internship"
		}, ($$renderer) => {
			$$renderer.push(`Free Internship`);
		});
		$$renderer.option({
			value: "Paid Internship",
			selected: filters().type === "Paid Internship"
		}, ($$renderer) => {
			$$renderer.push(`Paid Internship`);
		});
		$$renderer.option({
			value: "Free + Stipend",
			selected: filters().type === "Free + Stipend"
		}, ($$renderer) => {
			$$renderer.push(`Free + Stipend`);
		});
		$$renderer.option({
			value: "Paid + Stipend",
			selected: filters().type === "Paid + Stipend"
		}, ($$renderer) => {
			$$renderer.push(`Paid + Stipend`);
		});
		$$renderer.push(`</select></div> <div><select name="duration" id="duration" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Any Duration`);
		});
		$$renderer.option({
			value: "1 Month",
			selected: filters().duration === "1 Month"
		}, ($$renderer) => {
			$$renderer.push(`1 Month`);
		});
		$$renderer.option({
			value: "2 Months",
			selected: filters().duration === "2 Months"
		}, ($$renderer) => {
			$$renderer.push(`2 Months`);
		});
		$$renderer.option({
			value: "3 Months",
			selected: filters().duration === "3 Months"
		}, ($$renderer) => {
			$$renderer.push(`3 Months`);
		});
		$$renderer.option({
			value: "6 Months",
			selected: filters().duration === "6 Months"
		}, ($$renderer) => {
			$$renderer.push(`6 Months`);
		});
		$$renderer.push(`</select></div> <div><select name="jobOpportunity" id="jobOpportunity" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Job Offer?`);
		});
		$$renderer.option({
			value: "Yes",
			selected: filters().jobOpportunity === "Yes"
		}, ($$renderer) => {
			$$renderer.push(`Yes (PPO)`);
		});
		$$renderer.option({
			value: "No",
			selected: filters().jobOpportunity === "No"
		}, ($$renderer) => {
			$$renderer.push(`No Guarantee`);
		});
		$$renderer.push(`</select></div> <div><select name="certificateAvailable" id="certificateAvailable" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">`);
		$$renderer.option({ value: "" }, ($$renderer) => {
			$$renderer.push(`Certificate?`);
		});
		$$renderer.option({
			value: "Yes",
			selected: filters().certificateAvailable === "Yes"
		}, ($$renderer) => {
			$$renderer.push(`Yes (Provided)`);
		});
		$$renderer.option({
			value: "No",
			selected: filters().certificateAvailable === "No"
		}, ($$renderer) => {
			$$renderer.push(`No`);
		});
		$$renderer.push(`</select></div> <div class="col-span-2 lg:col-span-1 flex gap-2"><noscript><button type="submit" class="flex-grow py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-primary dark:text-primary-dark font-bold text-xs transition duration-200 cursor-pointer">Apply</button></noscript> <a href="/student/internships" class="flex-grow px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark/50 hover:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:text-primary-dark flex items-center justify-center cursor-pointer transition">Reset Filters</a></div></div></form></div> `);
		if (internships().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900/30 border border-divider dark:border-divider-dark/80 text-center flex flex-col items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> <p class="text-sm font-bold text-slate-600 dark:text-slate-400">No matching internship listings found</p> <p class="text-xs text-slate-500 mt-1">Try relaxing filters or search queries.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
			const each_array_1 = ensure_array_like(internships());
			for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
				let intern = each_array_1[$$index_2];
				$$renderer.push(`<div class="group p-6 rounded-2xl bg-surface dark:bg-surface-dark/40 hover:bg-slate-900/60 border border-divider dark:border-divider-dark/50 hover:border-blue-500/30 shadow-md hover:shadow-blue-500/5 hover:-translate-y-1 transition duration-300 flex flex-col justify-between relative overflow-hidden"><div class="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-bl from-blue-500/5 to-transparent blur-md pointer-events-none group-hover:scale-150 transition duration-500"></div> <div><div class="flex items-start justify-between"><div class="min-w-0 flex-grow pr-2"><div class="flex flex-wrap items-center gap-1.5">`);
				if (intern.type.includes("Free")) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">FREE</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.type.includes("Paid")) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">PAID</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.type.includes("Stipend")) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">STIPEND</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.jobOpportunity === "Yes") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">JOB OFFER</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.certificateAvailable === "Yes") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">CERTIFICATE</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--> `);
				if (intern.mode === "Online") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">ONLINE</span>`);
				} else if (intern.mode === "Offline") {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-800 text-slate-600 dark:text-slate-400">OFFLINE</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">HYBRID</span>`);
				}
				$$renderer.push(`<!--]--></div> <h3 class="font-display font-bold text-lg text-primary dark:text-primary-dark mt-3 group-hover:text-blue-400 transition-colors duration-250 truncate">${escape_html(intern.title)}</h3> <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mt-0.5">${escape_html(intern.companyName)}</span></div> <div class="h-9 w-9 shrink-0 rounded-xl bg-slate-950 text-slate-500 flex items-center justify-center font-display font-black text-sm border border-divider dark:border-divider-dark/50">${escape_html(intern.companyName.charAt(0))}</div></div> <p class="mt-4 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">${escape_html(intern.description)}</p> <div class="flex flex-wrap gap-1.5 mt-4"><!--[-->`);
				const each_array_2 = ensure_array_like(intern.skillsRequired);
				for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
					let skill = each_array_2[$$index_1];
					$$renderer.push(`<span class="px-2 py-0.5 rounded bg-slate-950/60 text-[9px] font-semibold text-slate-600 dark:text-slate-400">${escape_html(skill)}</span>`);
				}
				$$renderer.push(`<!--]--></div> <div class="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-[11px] font-bold text-slate-600 dark:text-slate-400 border-t border-divider dark:border-divider-dark/50 pt-4"><span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${escape_html(intern.location)} (${escape_html(intern.mode)})</span> <span class="flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> ${escape_html(intern.duration)}</span> `);
				if (intern.stipendAmount > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-emerald-400 font-bold">₹${escape_html(intern.stipendAmount)}/mo</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="text-slate-500">Unpaid</span>`);
				}
				$$renderer.push(`<!--]--> `);
				if (intern.fee > 0) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="text-rose-450 font-bold">Fee: ₹${escape_html(intern.fee)}</span>`);
				} else $$renderer.push("<!--[-1-->");
				$$renderer.push(`<!--]--></div></div> <div class="mt-6 pt-4 border-t border-divider dark:border-divider-dark/50 flex items-center justify-between"><span class="text-[10px] text-slate-500 font-bold">Apply by: <strong class="text-slate-350">${escape_html(intern.lastDateToApply)}</strong></span> `);
				if (intern.hasApplied) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<button disabled="" class="py-2 px-4 rounded-xl text-xs font-bold bg-slate-950 text-slate-500 border border-slate-900 cursor-not-allowed">Applied</button>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<button class="py-2 px-4 rounded-xl text-xs font-bold text-primary dark:text-primary-dark bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition cursor-pointer">Apply Now</button>`);
				}
				$$renderer.push(`<!--]--></div></div>`);
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
