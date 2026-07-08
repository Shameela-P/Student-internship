import { E as escape_html, a as derived, o as ensure_array_like, t as attr_class, u as stringify, w as attr } from "../../../../chunks/server.js";
import "../../../../chunks/forms.js";
//#region src/routes/company/applications/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const applications = derived(() => data.applications);
		derived(() => data.company);
		let filterStatus = "All";
		let searchName = "";
		const filteredApps = derived(() => applications().filter((app) => {
			if (!app.student) return false;
			return (app.student.fullName.toLowerCase().includes(searchName.toLowerCase()) || app.internshipTitle.toLowerCase().includes(searchName.toLowerCase())) && true;
		}));
		let activeAppId = null;
		$$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="mb-8"><h1 class="font-display font-black text-3xl text-primary tracking-tight">Applications Queue</h1> <p class="text-sm text-muted mt-1">Review student profiles, inspect uploaded resume files, shortlist candidates, and approve placements.</p></div> <div class="p-6 rounded-3xl glass border border-slate-200/10 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"><div class="w-full md:max-w-sm relative"><input type="text"${attr("value", searchName)} placeholder="Search by student name or internship..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-divider bg-white/50 text-xs focus:border-indigo-500 focus:outline-none"/> <svg class="absolute left-3 top-3 h-4 w-4 text-slate-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8" stroke-width="2"></circle><line x1="21" x2="16.65" y1="21" y2="16.65" stroke-width="2" stroke-linecap="round"></line></svg></div> <div class="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200/5"><!--[-->`);
		const each_array = ensure_array_like([
			"All",
			"Pending",
			"Shortlisted",
			"Approved",
			"Rejected"
		]);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let status = each_array[$$index];
			$$renderer.push(`<button${attr_class(`px-3.5 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer ${filterStatus === status ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700 "}`)}>${escape_html(status)}</button>`);
		}
		$$renderer.push(`<!--]--></div></div> `);
		if (filteredApps().length === 0) {
			$$renderer.push("<!--[0-->");
			$$renderer.push(`<div class="p-12 rounded-3xl glass border border-slate-200/10 text-center"><p class="text-sm font-semibold text-slate-600">No applications found matching the parameters.</p></div>`);
		} else {
			$$renderer.push("<!--[-1-->");
			$$renderer.push(`<div class="space-y-4"><!--[-->`);
			const each_array_1 = ensure_array_like(filteredApps());
			for (let $$index_2 = 0, $$length = each_array_1.length; $$index_2 < $$length; $$index_2++) {
				let app = each_array_1[$$index_2];
				$$renderer.push(`<div${attr_class(`rounded-2xl glass-card border border-slate-200/15 overflow-hidden transition-all duration-200 ${activeAppId === app.id ? "ring-2 ring-indigo-500/10" : ""}`)}><div class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"><div class="flex-grow min-w-0"><div class="flex items-center gap-2 flex-wrap"><h3 class="font-display font-bold text-base text-primary">${escape_html(app.student.fullName)}</h3> <span class="text-[10px] text-slate-600 font-semibold">• ${escape_html(app.student.collegeName)}</span></div> <p class="text-xs text-muted mt-1">Applied for: <strong class="text-slate-700 font-semibold">"${escape_html(app.internshipTitle)}"</strong> (${escape_html(app.domain)})</p></div> <div class="flex items-center gap-3 justify-between md:justify-end shrink-0"><span class="text-[10px] text-slate-600 font-semibold">${escape_html(new Date(app.appliedDate).toLocaleDateString())}</span> `);
				if (app.status === "Approved") {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600">Approved</span>`);
				} else if (app.status === "Rejected") {
					$$renderer.push("<!--[1-->");
					$$renderer.push(`<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-600">Rejected</span>`);
				} else if (app.status === "Shortlisted") {
					$$renderer.push("<!--[2-->");
					$$renderer.push(`<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600">Shortlisted</span>`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600">Pending</span>`);
				}
				$$renderer.push(`<!--]--> <button class="px-3 py-1.5 rounded-lg border border-divider bg-white/50 hover:bg-slate-100 text-xs font-bold text-indigo-500 transition cursor-pointer">`);
				if (activeAppId === app.id) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`Close`);
				} else {
					$$renderer.push("<!--[-1-->");
					$$renderer.push(`View Profile`);
				}
				$$renderer.push(`<!--]--></button></div></div> `);
				if (activeAppId === app.id) {
					$$renderer.push("<!--[0-->");
					$$renderer.push(`<div class="px-5 pb-6 pt-4 border-t border-slate-200/5 bg-slate-100/10 text-xs md:text-sm"><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-4 text-xs"><h4 class="font-bold text-slate-600 uppercase tracking-widest text-[10px]">Applicant Profile</h4> <div class="grid grid-cols-2 gap-x-6 gap-y-3"><div><span class="text-slate-600 block">Email Address:</span> <a${attr("href", `mailto:${stringify(app.student.email)}`)} class="text-indigo-500 font-semibold">${escape_html(app.student.email)}</a></div> <div><span class="text-slate-600 block">Mobile Contact:</span> <span class="font-semibold text-slate-700">${escape_html(app.student.mobileNumber)}</span></div> <div><span class="text-slate-600 block">Course &amp; Department:</span> <span class="font-semibold text-slate-700">${escape_html(app.student.degreeCourse)} (${escape_html(app.student.department)})</span></div> <div><span class="text-slate-600 block">Year of Study &amp; Status:</span> <span class="font-semibold text-slate-700">Year ${escape_html(app.student.yearOfStudy)} • ${escape_html(app.student.currentStatus)}</span></div> <div class="col-span-2"><span class="text-slate-600 block">Address Location:</span> <span class="font-semibold text-slate-700 leading-relaxed">${escape_html(app.student.address)}</span></div></div> <div><span class="text-slate-600 block mb-1.5">Candidate Skills:</span> <div class="flex flex-wrap gap-1"><!--[-->`);
					const each_array_2 = ensure_array_like(app.student.skills);
					for (let $$index_1 = 0, $$length = each_array_2.length; $$index_1 < $$length; $$index_1++) {
						let skill = each_array_2[$$index_1];
						$$renderer.push(`<span class="px-2 py-0.5 rounded bg-slate-200/50 text-[10px] font-semibold text-slate-600">${escape_html(skill)}</span>`);
					}
					$$renderer.push(`<!--]--></div></div></div> <div class="space-y-4"><h4 class="font-bold text-slate-600 uppercase tracking-widest text-[10px]">Resume File &amp; Hiring Action</h4> `);
					if (app.student.resumeUrl) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<a${attr("href", app.student.resumeUrl)} target="_blank" class="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100 transition-colors mt-4 w-full"><div class="h-9 w-9 bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center font-black text-xs">LINK</div> <div class="flex-grow min-w-0"><span class="text-[11px] font-bold text-slate-700 block truncate group-hover:text-indigo-500">View Applicant Resume</span> <span class="text-[9px] text-slate-600 block truncate">Opens secure browser view</span></div></a>`);
					} else {
						$$renderer.push("<!--[-1-->");
						$$renderer.push(`<div class="p-3 rounded-lg bg-rose-500/10 text-rose-500 text-xs">No resume uploaded.</div>`);
					}
					$$renderer.push(`<!--]--> `);
					if (app.status === "Approved" && app.certificateHash) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<div class="p-3 rounded-xl bg-pink-500/5 border border-pink-500/10 text-[10px]"><span class="text-slate-600 block">Completion Certificate Issued:</span> <code class="text-pink-500 font-mono font-bold truncate block mt-1">${escape_html(app.certificateHash)}</code></div>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--> <form action="?/updateStatus" method="POST" class="space-y-2"><input type="hidden" name="applicationId"${attr("value", app.id)}/> <span class="text-[10px] text-slate-600 font-semibold block">Change Pipeline Phase:</span> <div class="grid grid-cols-2 gap-2"><button type="submit" name="status" value="Shortlisted"${attr("disabled", app.status === "Shortlisted", true)} class="py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 border border-purple-500/10 hover:border-purple-500/20 text-xs font-bold transition cursor-pointer disabled:opacity-50">Shortlist</button> <button type="submit" name="status" value="Approved"${attr("disabled", app.status === "Approved", true)} class="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/10 hover:border-emerald-500/20 text-xs font-bold transition cursor-pointer disabled:opacity-50">Approve &amp; Sign</button> <button type="submit" name="status" value="Rejected"${attr("disabled", app.status === "Rejected", true)} class="py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 border border-rose-500/10 hover:border-rose-500/20 text-xs font-bold transition cursor-pointer disabled:opacity-50">Reject</button> <button type="submit" name="status" value="Pending"${attr("disabled", app.status === "Pending", true)} class="py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 border border-amber-500/10 hover:border-amber-500/20 text-xs font-bold transition cursor-pointer disabled:opacity-50">Make Pending</button></div></form> `);
					if (app.status === "Approved" && !app.certificateHash) {
						$$renderer.push("<!--[0-->");
						$$renderer.push(`<form action="?/issueCertificate" method="POST" class="mt-4"><input type="hidden" name="applicationId"${attr("value", app.id)}/> <button type="submit" class="w-full py-2.5 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 border border-pink-500/10 hover:border-pink-500/20 text-xs font-bold transition cursor-pointer flex justify-center items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg> Issue Completion Certificate</button></form>`);
					} else $$renderer.push("<!--[-1-->");
					$$renderer.push(`<!--]--></div></div></div>`);
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
