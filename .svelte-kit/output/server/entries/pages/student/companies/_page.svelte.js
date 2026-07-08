import "../../../../chunks/index-server.js";
import { C as attr, T as escape_html, a as ensure_array_like, i as derived, l as stringify, t as attr_class } from "../../../../chunks/server.js";
import "../../../../chunks/state.js";
//#region src/routes/student/companies/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const companies = derived(() => data.companies);
		const industries = derived(() => data.industries);
		const domains = derived(() => data.domains);
		derived(() => data.stats);
		const filters = derived(() => data.filters);
		let savedCompanies = /* @__PURE__ */ new Set();
		let companiesCount = 5e3;
		let applicationsCount = 95e3;
		let studentsCount = 45e3;
		let domainsCount = 120;
		const featuredRecruiters = [
			"TCS",
			"Infosys",
			"Wipro",
			"HCL",
			"Zoho",
			"Cognizant",
			"Accenture",
			"Capgemini",
			"Tech Mahindra",
			"LTIMindtree"
		];
		const successStories = [{
			name: "Aditya Sharma",
			role: "Full Stack Engineer",
			company: "Zoho",
			quote: "Nexora helped me find my dream placement. The verification system made it easy to trust the company and start immediately.",
			avatar: "AS"
		}, {
			name: "Ananya Goel",
			role: "Data Scientist",
			company: "Accenture",
			quote: "The direct chat feature let me connect with the hiring manager in real time. I got selected within 3 days of applying!",
			avatar: "AG"
		}];
		$$renderer.push(`<section class="relative py-20 px-6 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-divider dark:border-divider-dark/80 mb-12 text-center shadow-2xl svelte-1i3s90c"><div class="absolute top-[-30%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse-slow svelte-1i3s90c"></div> <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse-slow svelte-1i3s90c" style="animation-delay: 2s;"></div> <div class="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40 svelte-1i3s90c"><div class="absolute top-10 left-10 md:left-20 animate-float-1 bg-slate-800/90 border border-slate-700/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 svelte-1i3s90c"><div class="bg-blue-500/20 text-blue-400 p-2 rounded-xl svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 svelte-1i3s90c" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" class="svelte-1i3s90c"></path></svg></div> <div class="text-left text-xs svelte-1i3s90c"><p class="font-bold text-primary dark:text-primary-dark svelte-1i3s90c">Full Stack Intern</p> <p class="text-slate-600 dark:text-slate-400 svelte-1i3s90c">TCS • Active</p></div></div> <div class="absolute bottom-10 left-6 md:left-32 animate-float-2 bg-slate-800/80 border border-slate-700/50 p-2 px-3 rounded-xl shadow-lg flex items-center gap-2 svelte-1i3s90c"><span class="text-cyan-400 font-bold font-display text-sm svelte-1i3s90c">Zoho</span> <span class="h-1.5 w-1.5 rounded-full bg-emerald-500 svelte-1i3s90c"></span></div> <div class="absolute top-8 right-8 md:right-24 animate-float-3 bg-slate-800/90 border border-slate-700/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 svelte-1i3s90c"><div class="bg-amber-500/20 text-amber-400 p-2 rounded-xl svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 svelte-1i3s90c" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" class="svelte-1i3s90c"></path></svg></div> <div class="text-left text-xs svelte-1i3s90c"><p class="font-bold text-primary dark:text-primary-dark svelte-1i3s90c">Verified Certificate</p> <p class="text-slate-600 dark:text-slate-400 svelte-1i3s90c">ID: NX-8902-A</p></div></div> <div class="absolute bottom-16 right-12 md:right-36 animate-float-1 bg-slate-800/90 border border-slate-700/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 svelte-1i3s90c"><div class="bg-emerald-500/20 text-emerald-400 p-2 rounded-xl svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 svelte-1i3s90c" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" class="svelte-1i3s90c"></path></svg></div> <div class="text-left text-xs svelte-1i3s90c"><p class="font-bold text-primary dark:text-primary-dark svelte-1i3s90c">Career Growth</p> <p class="text-emerald-400 svelte-1i3s90c">+148% Placements</p></div></div></div> <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center svelte-1i3s90c"><div class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6 shadow-sm svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-1i3s90c"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" class="svelte-1i3s90c"></path><path d="m9 12 2 2 4-4" class="svelte-1i3s90c"></path></svg> 100% Verified Corporate Partners</div> <h1 class="font-display font-black text-4xl md:text-6xl text-primary dark:text-primary-dark leading-tight tracking-tight svelte-1i3s90c">Explore <span class="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 text-gradient svelte-1i3s90c">5500+ Verified Companies</span></h1> <p class="mt-5 text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed svelte-1i3s90c">Find internships from top recruiters, startups, and global companies across 150+ domains. Apply directly to active postings and launch your career.</p> <div class="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center svelte-1i3s90c"><a href="#directory" class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-primary dark:text-primary-dark font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] transition-all duration-250 cursor-pointer svelte-1i3s90c">Explore Companies</a> <a href="/student/internships" class="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-divider dark:border-divider-dark hover:bg-slate-900 text-slate-300 hover:text-primary dark:text-primary-dark font-bold text-sm hover:scale-[1.02] transition-all duration-250 cursor-pointer svelte-1i3s90c">Find Internships</a></div></div></section> <section class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12 svelte-1i3s90c"><div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 text-center backdrop-blur-sm relative group overflow-hidden svelte-1i3s90c"><div class="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 svelte-1i3s90c"></div> <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block svelte-1i3s90c">Corporate Partners</span> <h2 class="font-display font-black text-2xl md:text-4xl text-blue-400 mt-2 svelte-1i3s90c">${escape_html(companiesCount)}+</h2></div> <div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 text-center backdrop-blur-sm relative group overflow-hidden svelte-1i3s90c"><div class="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 svelte-1i3s90c"></div> <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block svelte-1i3s90c">Applications Filed</span> <h2 class="font-display font-black text-2xl md:text-4xl text-emerald-400 mt-2 svelte-1i3s90c">${escape_html(applicationsCount)}+</h2></div> <div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 text-center backdrop-blur-sm relative group overflow-hidden svelte-1i3s90c"><div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 svelte-1i3s90c"></div> <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block svelte-1i3s90c">Active Candidates</span> <h2 class="font-display font-black text-2xl md:text-4xl text-purple-400 mt-2 svelte-1i3s90c">${escape_html(studentsCount)}+</h2></div> <div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 text-center backdrop-blur-sm relative group overflow-hidden svelte-1i3s90c"><div class="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 svelte-1i3s90c"></div> <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest block svelte-1i3s90c">Domain Streams</span> <h2 class="font-display font-black text-2xl md:text-4xl text-cyan-400 mt-2 svelte-1i3s90c">${escape_html(domainsCount)}+</h2></div></section> <section class="mb-16 py-5 border-y border-divider dark:border-divider-dark/80 bg-slate-100 dark:bg-slate-900/30 overflow-hidden w-full svelte-1i3s90c"><div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-6 w-full svelte-1i3s90c"><div class="shrink-0 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest svelte-1i3s90c">Top Recruiters:</div> <div class="marquee-container flex-grow w-full overflow-hidden svelte-1i3s90c"><div class="marquee-track svelte-1i3s90c"><!--[-->`);
		const each_array = ensure_array_like([...featuredRecruiters, ...featuredRecruiters]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let recruiter = each_array[$$index];
			$$renderer.push(`<a${attr("href", `?query=${stringify(encodeURIComponent(recruiter))}`)} class="text-sm font-black font-display text-slate-600 dark:text-slate-400 hover:text-blue-400 transition-colors duration-200 svelte-1i3s90c">${escape_html(recruiter)}</a>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section> <section id="directory" class="mb-16 svelte-1i3s90c"><div class="mb-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 svelte-1i3s90c"><div class="svelte-1i3s90c"><h2 class="font-display font-black text-2xl text-primary dark:text-primary-dark svelte-1i3s90c">Corporate Register</h2> <p class="text-xs text-slate-600 dark:text-slate-400 mt-1 svelte-1i3s90c">Search through verified corporate registries and find matching workspaces.</p></div> <form method="GET" class="w-full xl:max-w-5xl flex flex-wrap items-center gap-3 svelte-1i3s90c"><div class="relative flex-grow min-w-[200px] svelte-1i3s90c"><input type="text" name="query"${attr("value", filters().query)} placeholder="Search company or description..." class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 svelte-1i3s90c"/> <svg class="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-600 dark:text-slate-400 svelte-1i3s90c" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8" stroke-width="2" class="svelte-1i3s90c"></circle><line x1="21" x2="16.65" y1="21" y2="16.65" stroke-width="2" stroke-linecap="round" class="svelte-1i3s90c"></line></svg></div> <div class="min-w-[140px] svelte-1i3s90c"><select name="industry" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 svelte-1i3s90c">`);
		$$renderer.option({
			value: "",
			selected: !filters().industry,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`All Sectors`);
		}, "svelte-1i3s90c");
		$$renderer.push(`<!--[-->`);
		const each_array_1 = ensure_array_like(industries());
		for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
			let industry = each_array_1[$$index_1];
			$$renderer.option({
				value: industry,
				selected: filters().industry === industry,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(industry)}`);
			}, "svelte-1i3s90c");
		}
		$$renderer.push(`<!--]--></select></div> <div class="min-w-[140px] svelte-1i3s90c"><select name="domain" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 svelte-1i3s90c">`);
		$$renderer.option({
			value: "",
			selected: !filters().domain,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`All Domains`);
		}, "svelte-1i3s90c");
		$$renderer.push(`<!--[-->`);
		const each_array_2 = ensure_array_like(domains());
		for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
			let domain = each_array_2[$$index_2];
			$$renderer.option({
				value: domain,
				selected: filters().domain === domain,
				class: ""
			}, ($$renderer) => {
				$$renderer.push(`${escape_html(domain)}`);
			}, "svelte-1i3s90c");
		}
		$$renderer.push(`<!--]--></select></div> <div class="relative min-w-[140px] svelte-1i3s90c"><input type="text" name="location"${attr("value", filters().location)} placeholder="Location..." class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 svelte-1i3s90c"/> <svg class="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-600 dark:text-slate-400 svelte-1i3s90c" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke-width="2" class="svelte-1i3s90c"></path><circle cx="12" cy="10" r="3" stroke-width="2" class="svelte-1i3s90c"></circle></svg></div> <div class="min-w-[110px] svelte-1i3s90c"><select name="mode" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 svelte-1i3s90c">`);
		$$renderer.option({
			value: "",
			selected: !filters().mode,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`All Modes`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Online",
			selected: filters().mode === "Online",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Online`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Offline",
			selected: filters().mode === "Offline",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Offline`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Hybrid",
			selected: filters().mode === "Hybrid",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Hybrid`);
		}, "svelte-1i3s90c");
		$$renderer.push(`</select></div> <div class="min-w-[130px] svelte-1i3s90c"><select name="type" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-surface dark:bg-surface-dark/50 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 svelte-1i3s90c">`);
		$$renderer.option({
			value: "",
			selected: !filters().type,
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`All Types`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Free Internship",
			selected: filters().type === "Free Internship",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Free Internship`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Paid Internship",
			selected: filters().type === "Paid Internship",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Paid Internship`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Free + Stipend",
			selected: filters().type === "Free + Stipend",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Free + Stipend`);
		}, "svelte-1i3s90c");
		$$renderer.option({
			value: "Paid + Stipend",
			selected: filters().type === "Paid + Stipend",
			class: ""
		}, ($$renderer) => {
			$$renderer.push(`Paid + Stipend`);
		}, "svelte-1i3s90c");
		$$renderer.push(`</select></div> <div class="flex gap-2 svelte-1i3s90c"><button type="submit" class="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-primary dark:text-primary-dark font-bold text-xs transition-colors duration-200 cursor-pointer svelte-1i3s90c">Apply Filters</button> <a href="/student/companies" class="px-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark/50 hover:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold text-xs transition duration-200 cursor-pointer flex items-center justify-center svelte-1i3s90c">Reset</a></div></form></div> `);
		if (filters().query || filters().industry || filters().domain || filters().location || filters().mode || filters().type) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="flex flex-wrap items-center gap-2 mb-6 svelte-1i3s90c"><span class="text-xs text-slate-500 font-semibold svelte-1i3s90c">Active filters:</span> `);
			if (filters().query) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Search: ${escape_html(filters().query)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (filters().industry) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Industry: ${escape_html(filters().industry)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (filters().domain) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Domain: ${escape_html(filters().domain)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (filters().location) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Location: ${escape_html(filters().location)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (filters().mode) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Mode: ${escape_html(filters().mode)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (filters().type) {
				$$renderer.push("<!--[0-->");
				$$renderer.push(`<span class="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-semibold flex items-center gap-1.5 svelte-1i3s90c">Type: ${escape_html(filters().type)}</span>`);
			} else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> `);
		if (companies().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900/30 border border-divider dark:border-divider-dark/80 text-center flex flex-col items-center justify-center svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-500 mb-4 svelte-1i3s90c" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" class="svelte-1i3s90c"></path></svg> <p class="text-sm font-bold text-slate-600 dark:text-slate-400 svelte-1i3s90c">No matching verified partners</p> <p class="text-xs text-slate-500 mt-1 svelte-1i3s90c">Try resetting the search filters to discover more corporate agencies.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 svelte-1i3s90c"><!--[-->`);
			const each_array_3 = ensure_array_like(companies());
			for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
				let comp = each_array_3[$$index_3];
				$$renderer.push(`<div class="group p-5 rounded-2xl bg-surface dark:bg-surface-dark/40 hover:bg-slate-900/70 border border-divider dark:border-divider-dark/60 hover:border-blue-500/40 flex flex-col justify-between shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 min-h-[175px] svelte-1i3s90c"><div class="svelte-1i3s90c"><div class="flex items-start gap-3 svelte-1i3s90c"><div class="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-950 text-blue-400 border border-divider dark:border-divider-dark flex items-center justify-center font-display font-black text-sm svelte-1i3s90c">${escape_html(comp.companyName.charAt(0))}</div> <div class="min-w-0 flex-grow svelte-1i3s90c"><div class="flex items-center gap-1.5 svelte-1i3s90c"><h3 class="font-display font-bold text-sm text-primary dark:text-primary-dark truncate group-hover:text-blue-400 transition-colors duration-250 svelte-1i3s90c">${escape_html(comp.companyName)}</h3> <span class="text-blue-400 shrink-0 svelte-1i3s90c" title="Verified Corporate Partner"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="svelte-1i3s90c"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" class="svelte-1i3s90c"></path><polyline points="22 4 12 14.01 9 11.01" class="svelte-1i3s90c"></polyline></svg></span> <span class="px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0 svelte-1i3s90c">${escape_html(comp.industryType)}</span></div> <div class="flex items-center gap-2 mt-1.5 text-[10px] text-slate-600 dark:text-slate-400 font-semibold svelte-1i3s90c"><span class="flex items-center gap-1 svelte-1i3s90c"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="svelte-1i3s90c"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" class="svelte-1i3s90c"></path><circle cx="12" cy="10" r="3" class="svelte-1i3s90c"></circle></svg> ${escape_html(comp.companyAddress.split(",").pop().trim())}</span> <span class="h-1 w-1 rounded-full bg-slate-800 svelte-1i3s90c"></span> <span class="flex items-center gap-0.5 text-amber-500 svelte-1i3s90c"><svg class="h-3 w-3 fill-amber-500 svelte-1i3s90c" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" class="svelte-1i3s90c"></path></svg> ${escape_html(comp.rating)}</span></div></div></div> <p class="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal svelte-1i3s90c">${escape_html(comp.companyDescription)}</p></div> <div class="mt-3 pt-3 border-t border-divider dark:border-divider-dark/50 flex items-center justify-between svelte-1i3s90c"><span class="text-[10px] text-slate-500 font-bold svelte-1i3s90c">${escape_html(comp.openingsCount > 0 ? `${comp.openingsCount} Active Listings` : "No open opportunities")}</span> <div class="flex items-center gap-3 svelte-1i3s90c"><a${attr("href", `/student/companies/${stringify(comp.id)}`)} class="text-[10px] font-bold text-slate-600 dark:text-slate-400 hover:text-primary dark:text-primary-dark transition duration-200 cursor-pointer svelte-1i3s90c">View Info</a> <a${attr("href", `/student/internships?query=${encodeURIComponent(comp.companyName)}`)} class="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition duration-200 cursor-pointer svelte-1i3s90c">Explore Openings</a> <button class="p-1 rounded hover:bg-slate-800 transition duration-200 cursor-pointer text-slate-500 hover:text-primary dark:text-primary-dark svelte-1i3s90c"${attr("title", savedCompanies.has(comp.id) ? "Saved" : "Save Company")}><svg${attr_class(`h-3.5 w-3.5 ${savedCompanies.has(comp.id) ? "fill-blue-400 text-blue-400" : "text-slate-500"}`, "svelte-1i3s90c")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" class="svelte-1i3s90c"></path></svg></button></div></div></div>`);
			}
			$$renderer.push(`<!--]--></div>`);
		}
		$$renderer.push(`<!--]--></section> <section class="mb-16 border-t border-divider dark:border-divider-dark/60 pt-16 svelte-1i3s90c"><h2 class="font-display font-black text-2xl text-primary dark:text-primary-dark text-center mb-8 svelte-1i3s90c">Success Stories</h2> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto svelte-1i3s90c"><!--[-->`);
		const each_array_4 = ensure_array_like(successStories);
		for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
			let story = each_array_4[$$index_4];
			$$renderer.push(`<div class="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900/30 border border-divider dark:border-divider-dark/80 flex gap-4 backdrop-blur-sm hover:border-slate-700/60 transition duration-300 svelte-1i3s90c"><div class="h-10 w-10 shrink-0 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/20 svelte-1i3s90c">${escape_html(story.avatar)}</div> <div class="svelte-1i3s90c"><p class="text-xs italic text-slate-600 dark:text-slate-400 leading-relaxed font-normal svelte-1i3s90c">"${escape_html(story.quote)}"</p> <div class="mt-4 svelte-1i3s90c"><h4 class="text-xs font-bold text-primary dark:text-primary-dark svelte-1i3s90c">${escape_html(story.name)}</h4> <span class="text-[10px] text-slate-500 font-semibold svelte-1i3s90c">${escape_html(story.role)} • Hired by <strong class="text-blue-400 svelte-1i3s90c">${escape_html(story.company)}</strong></span></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></section> `);
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <footer class="w-full py-8 border-t border-divider dark:border-divider-dark/40 text-center text-slate-500 text-[10px] mt-auto svelte-1i3s90c"><p class="svelte-1i3s90c">© 2026 Nexora Network. Hired with trust.</p></footer>`);
	});
}
//#endregion
export { _page as default };
