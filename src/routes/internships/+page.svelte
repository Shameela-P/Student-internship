<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
	let { data } = $props();
	const internships = $derived(data.internships);
</script>

<div class="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
	<FloatingLines />

	<div class="mb-12 text-center md:text-left relative z-10">
		<h1 class="font-display font-black text-4xl text-slate-900 tracking-tight">Active Internships</h1>
		<p class="text-slate-600 mt-2 max-w-xl">Find and apply to verified positions across various engineering, marketing, and business domains.</p>
	</div>

	<!-- Internships Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
		{#each internships as internship}
			<div class="p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-blue-500/20 transition duration-300 flex flex-col justify-between relative group overflow-hidden">
				<div>
					<div class="flex items-start justify-between">
						<div>
							<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-wider">
								{internship.type}
							</span>
							<h3 class="font-display font-bold text-xl text-slate-900 mt-3.5 group-hover:text-blue-500 transition duration-200">
								{internship.title}
							</h3>
							<p class="text-xs font-semibold text-slate-500 mt-0.5">
								{internship.companyName}
							</p>
						</div>
						<div class="h-10 w-10 rounded-xl bg-slate-950 border border-slate-200/20 flex items-center justify-center font-display font-black text-slate-500 text-sm shrink-0">
							{internship.companyName.charAt(0)}
						</div>
					</div>

					<p class="mt-4 text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
						{internship.description}
					</p>

					<!-- Metas -->
					<div class="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[11px] font-bold text-slate-500 border-t border-slate-100 pt-4">
						<div class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
							{internship.location} ({internship.mode})
						</div>
						<div class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							{internship.duration}
						</div>
						{#if internship.stipendAmount > 0}
							<div class="flex items-center gap-1.5 text-emerald-500 font-bold">
								₹{internship.stipendAmount}/mo
							</div>
						{/if}
					</div>
				</div>

				<div class="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
					<span class="text-[10px] text-slate-400 font-bold">
						Apply by: <strong class="text-slate-500">{internship.lastDateToApply}</strong>
					</span>
					<a
						href="/login"
						class="text-xs font-bold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 cursor-pointer"
					>
						Apply Now
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
