<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
	let { data } = $props();
	const companies = $derived(data.companies);
</script>

<div class="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-12 relative">
	<FloatingLines />

	<div class="mb-12 text-center md:text-left relative z-10">
		<h1 class="font-display font-black text-4xl text-slate-900 tracking-tight">Registered Companies</h1>
		<p class="text-slate-600 mt-2 max-w-xl">Browse top verified companies hosting active internships on Nexora.</p>
	</div>

	<!-- Companies Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
		{#each companies as company}
			<div class="p-6 rounded-3xl bg-white border border-slate-200/50 hover:border-blue-500/35 transition duration-300 flex flex-col justify-between">
				<div>
					<div class="flex items-center gap-4 mb-4">
						<div class="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center font-display font-black text-slate-400 border border-slate-200/20">
							{company.companyName.charAt(0)}
						</div>
						<div>
							<h3 class="font-bold text-lg text-slate-900">{company.companyName}</h3>
							<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500">{company.industryType}</span>
						</div>
					</div>
					<p class="text-sm text-slate-600 line-clamp-3 mb-6 font-normal leading-relaxed">{company.companyDescription}</p>
				</div>
				<div class="flex items-center justify-between border-t border-slate-100 pt-4">
					<span class="text-xs text-slate-400">{company.companyAddress.split(',').pop() || 'Remote'}</span>
					{#if company.website}
						<a href={company.website} target="_blank" rel="noopener noreferrer" class="text-xs font-bold text-blue-500 hover:underline">Visit Website</a>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
