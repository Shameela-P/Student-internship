<script>
	export let data;
	const { company, internships } = data;
</script>

<div class="mb-8 flex items-center justify-between">
	<div>
		<h1 class="font-display font-black text-3xl text-primary tracking-tight">
			Company Profile
		</h1>
		<p class="text-sm text-slate-600 mt-1">
			Verified Corporate Partner details and active opportunities.
		</p>
	</div>
	<a href="/student/companies" class="px-4 py-2 rounded-xl border border-divider bg-surface text-xs font-bold text-slate-600 hover:text-primary transition-all">
		← Back to Directory
	</a>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
	<!-- Company Details Sidebar -->
	<div class="lg:col-span-1 space-y-6">
		<div class="p-6 rounded-2xl bg-surface border border-divider backdrop-blur-sm shadow-xl flex flex-col items-center text-center">
			{#if company.companyLogo}
				<img src={company.companyLogo} alt={company.companyName} class="w-24 h-24 rounded-2xl object-cover border border-slate-200 shadow-md mb-4" />
			{:else}
				<div class="w-24 h-24 rounded-2xl bg-linear-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/20 mb-4 shadow-inner">
					<span class="text-3xl font-black text-blue-500">{company.companyName.charAt(0).toUpperCase()}</span>
				</div>
			{/if}
			
			<h2 class="text-xl font-black text-primary font-display">{company.companyName}</h2>
			<span class="mt-1 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
				{company.industryType || 'Corporate'}
			</span>
			
			<div class="w-full mt-6 pt-6 border-t border-divider text-left space-y-4">
				{#if company.companyAddress}
					<div>
						<p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Location</p>
						<p class="text-sm font-semibold text-primary flex items-start gap-2">
							<svg class="w-4 h-4 text-slate-400 shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
							{company.companyAddress}
						</p>
					</div>
				{/if}
				{#if company.website}
					<div>
						<p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Website</p>
						<a href={company.website.startsWith('http') ? company.website : `https://${company.website}`} target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-blue-500 hover:text-blue-400 flex items-center gap-2">
							<svg class="w-4 h-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
							{company.website}
						</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- Statistics Card using an #if block logic -->
		{#if internships.length > 0}
		<div class="p-6 rounded-2xl bg-surface border border-divider backdrop-blur-sm shadow-xl">
			<h3 class="font-bold text-sm text-primary mb-4">Company Stats</h3>
			<div class="flex items-center justify-between">
				<span class="text-xs text-slate-600">Active Openings</span>
				<span class="text-sm font-black text-blue-500">{internships.length}</span>
			</div>
		</div>
		{/if}
	</div>

	<!-- Main Content Area -->
	<div class="lg:col-span-2 space-y-8">
		<!-- About Section -->
		<section>
			<h3 class="text-lg font-black text-primary font-display mb-4 flex items-center gap-2">
				<svg class="w-5 h-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
				About the Company
			</h3>
			<div class="p-6 rounded-2xl bg-surface border border-divider shadow-md prose prose-sm max-w-none text-slate-700">
				{#if company.companyDescription}
					{#each company.companyDescription.split('\n') as p}
						<p>{p}</p>
					{/each}
				{:else}
					<p class="text-slate-500 italic">No description provided.</p>
				{/if}
			</div>
		</section>

		<!-- Active Openings -->
		<section>
			<div class="flex items-center justify-between mb-4">
				<h3 class="text-lg font-black text-primary font-display flex items-center gap-2">
					<svg class="w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
					Active Opportunities
				</h3>
			</div>

			{#if internships.length === 0}
				<div class="p-12 rounded-2xl border border-divider border-dashed text-center bg-slate-50">
					<p class="text-sm font-bold text-slate-500">No active postings right now.</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each internships as intern}
						<div class="p-5 rounded-2xl bg-surface border border-divider hover:border-blue-500/30 transition-colors relative group">
							<a href="/student/internships?query={encodeURIComponent(intern.title)}" class="absolute inset-0 z-10 rounded-2xl"></a>
							
							<div class="flex items-start justify-between mb-3">
								<h4 class="font-bold text-primary text-sm pr-4 group-hover:text-blue-400 transition-colors">{intern.title}</h4>
								{#if intern.type.includes('Free')}
									<span class="shrink-0 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Free</span>
								{:else}
									<span class="shrink-0 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">Paid</span>
								{/if}
							</div>

							<div class="flex items-center gap-4 text-xs font-semibold text-slate-500">
								<span class="flex items-center gap-1">
									<svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
									{intern.duration}
								</span>
								<span class="flex items-center gap-1">
									<svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
									{intern.mode}
								</span>
							</div>

							<div class="mt-4 pt-3 border-t border-divider flex items-center justify-between">
								<span class="text-xs text-slate-500">Apply by {new Date(intern.lastDateToApply).toLocaleDateString()}</span>
								<span class="text-xs font-bold text-blue-500 group-hover:translate-x-1 transition-transform">View Details →</span>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</div>
