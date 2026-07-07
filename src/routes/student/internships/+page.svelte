<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';

	let { data, form } = $props();
	
	const internships = $derived(data.internships);
	const domains = $derived(data.domains);
	const student = $derived(data.student);
	const filters = $derived(data.filters);

	// Modal state
	let selectedInternship = $state(null);
	let showModal = $state(false);
	let applyLoading = $state(false);
	let modalError = $state(null);

	function openApplyModal(internship) {
		selectedInternship = internship;
		modalError = null;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedInternship = null;
		modalError = null;
	}
</script>

<div class="mb-8">
	<h1 class="font-display font-black text-3xl text-primary dark:text-primary-dark tracking-tight">
		Explore Placement Postings
	</h1>
	<p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
		Search and apply for placement contracts across 150+ domains.
	</p>
</div>

<!-- Search & Filters Panel (Midnight Theme, Glassmorphism) -->
<div class="p-6 rounded-2xl bg-surface dark:bg-surface-dark/50 border border-divider dark:border-divider-dark/80 mb-8 backdrop-blur-sm shadow-xl">
	<form method="GET" class="space-y-4" data-sveltekit-keepfocus data-sveltekit-replacestate onchange={(e) => e.currentTarget.requestSubmit()}>
		<!-- Main search row -->
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<!-- Query Text -->
			<div class="relative">
				<input
					type="text"
					name="query"
					id="query"
					value={filters.query}
					oninput={(e) => {
						clearTimeout(e.currentTarget.timeout);
						const form = e.currentTarget.closest('form');
						e.currentTarget.timeout = setTimeout(() => form.requestSubmit(), 500);
					}}
					placeholder="Search titles, skills, or companies..."
					class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
				/>
				<svg class="absolute left-3 top-3 h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<circle cx="11" cy="11" r="8" stroke-width="2"/>
					<line x1="21" x2="16.65" y1="21" y2="16.65" stroke-width="2" stroke-linecap="round"/>
				</svg>
			</div>

			<!-- Domain Category -->
			<div>
				<select name="domain" id="domain" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">All Domains</option>
					{#each domains as domain}
						<option value={domain.name} selected={filters.domain === domain.name}>{domain.name}</option>
					{/each}
				</select>
			</div>

			<!-- Location -->
			<div class="relative">
				<input
					type="text"
					name="location"
					id="location"
					value={filters.location}
					oninput={(e) => {
						clearTimeout(e.currentTarget.timeout);
						const form = e.currentTarget.closest('form');
						e.currentTarget.timeout = setTimeout(() => form.requestSubmit(), 500);
					}}
					placeholder="Filter by city/location..."
					class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500"
				/>
				<svg class="absolute left-3 top-3 h-4 w-4 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke-width="2"/>
					<circle cx="12" cy="10" r="3" stroke-width="2"/>
				</svg>
			</div>
		</div>

		<!-- Advanced Filters Drawer -->
		<div class="grid grid-cols-2 lg:grid-cols-6 gap-3 pt-4 border-t border-divider dark:border-divider-dark/50">
			<!-- Mode -->
			<div>
				<select name="mode" id="mode" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">All Modes</option>
					<option value="Online" selected={filters.mode === 'Online'}>Online (Remote)</option>
					<option value="Offline" selected={filters.mode === 'Offline'}>Offline (On-Site)</option>
					<option value="Hybrid" selected={filters.mode === 'Hybrid'}>Hybrid</option>
				</select>
			</div>

			<!-- Type -->
			<div>
				<select name="type" id="type" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">All Types</option>
					<option value="Free Internship" selected={filters.type === 'Free Internship'}>Free Internship</option>
					<option value="Paid Internship" selected={filters.type === 'Paid Internship'}>Paid Internship</option>
					<option value="Free + Stipend" selected={filters.type === 'Free + Stipend'}>Free + Stipend</option>
					<option value="Paid + Stipend" selected={filters.type === 'Paid + Stipend'}>Paid + Stipend</option>
				</select>
			</div>

			<!-- Duration -->
			<div>
				<select name="duration" id="duration" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">Any Duration</option>
					<option value="1 Month" selected={filters.duration === '1 Month'}>1 Month</option>
					<option value="2 Months" selected={filters.duration === '2 Months'}>2 Months</option>
					<option value="3 Months" selected={filters.duration === '3 Months'}>3 Months</option>
					<option value="6 Months" selected={filters.duration === '6 Months'}>6 Months</option>
				</select>
			</div>

			<!-- Job Opportunity -->
			<div>
				<select name="jobOpportunity" id="jobOpportunity" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">Job Offer?</option>
					<option value="Yes" selected={filters.jobOpportunity === 'Yes'}>Yes (PPO)</option>
					<option value="No" selected={filters.jobOpportunity === 'No'}>No Guarantee</option>
				</select>
			</div>

			<!-- Certificate Available -->
			<div>
				<select name="certificateAvailable" id="certificateAvailable" class="w-full px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500">
					<option value="">Certificate?</option>
					<option value="Yes" selected={filters.certificateAvailable === 'Yes'}>Yes (Provided)</option>
					<option value="No" selected={filters.certificateAvailable === 'No'}>No</option>
				</select>
			</div>

			<!-- Action buttons -->
			<div class="col-span-2 lg:col-span-1 flex gap-2">
				<noscript>
					<button type="submit" class="flex-grow py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-primary dark:text-primary-dark font-bold text-xs transition duration-200 cursor-pointer">
						Apply
					</button>
				</noscript>
				<a href="/student/internships" class="flex-grow px-3 py-2.5 rounded-xl border border-divider dark:border-divider-dark/50 hover:bg-slate-900 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary dark:text-primary-dark flex items-center justify-center cursor-pointer transition">
					Reset Filters
				</a>
			</div>
		</div>
	</form>
</div>

<!-- Results grid -->
{#if internships.length === 0}
	<div class="p-16 rounded-3xl bg-slate-100 dark:bg-slate-900/30 border border-divider dark:border-divider-dark/80 text-center flex flex-col items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
		</svg>
		<p class="text-sm font-bold text-slate-600 dark:text-slate-400">No matching internship listings found</p>
		<p class="text-xs text-slate-500 mt-1">Try relaxing filters or search queries.</p>
	</div>
{:else}
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each internships as intern}
			<div class="group p-6 rounded-2xl bg-surface dark:bg-surface-dark/40 hover:bg-slate-900/60 border border-divider dark:border-divider-dark/50 hover:border-blue-500/30 shadow-md hover:shadow-blue-500/5 hover:-translate-y-1 transition duration-300 flex flex-col justify-between relative overflow-hidden">
				
				<!-- Featured glow -->
				<div class="absolute top-0 right-0 w-20 h-20 rounded-full bg-gradient-to-bl from-blue-500/5 to-transparent blur-md pointer-events-none group-hover:scale-150 transition duration-500"></div>

				<div>
					<!-- Card Header -->
					<div class="flex items-start justify-between">
						<div class="min-w-0 flex-grow pr-2">
							<div class="flex flex-wrap items-center gap-1.5">
								<!-- FREE / PAID / STIPEND Badges in modern styling -->
								{#if intern.type.includes('Free')}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
										FREE
									</span>
								{/if}
								{#if intern.type.includes('Paid')}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
										PAID
									</span>
								{/if}
								{#if intern.type.includes('Stipend')}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
										STIPEND
									</span>
								{/if}

								<!-- JOB OFFER Badge -->
								{#if intern.jobOpportunity === 'Yes'}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
										JOB OFFER
									</span>
								{/if}

								<!-- CERTIFICATE Badge -->
								{#if intern.certificateAvailable === 'Yes'}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
										CERTIFICATE
									</span>
								{/if}

								<!-- MODE Badge -->
								{#if intern.mode === 'Online'}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
										ONLINE
									</span>
								{:else if intern.mode === 'Offline'}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-slate-800 text-slate-600 dark:text-slate-400">
										OFFLINE
									</span>
								{:else}
									<span class="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
										HYBRID
									</span>
								{/if}
							</div>
							<h3 class="font-display font-bold text-lg text-primary dark:text-primary-dark mt-3 group-hover:text-blue-400 transition-colors duration-250 truncate">
								{intern.title}
							</h3>
							<span class="text-xs font-semibold text-slate-600 dark:text-slate-400 block mt-0.5">{intern.companyName}</span>
						</div>
						<!-- Logo placeholder -->
						<div class="h-9 w-9 shrink-0 rounded-xl bg-slate-950 text-slate-500 flex items-center justify-center font-display font-black text-sm border border-divider dark:border-divider-dark/50">
							{intern.companyName.charAt(0)}
						</div>
					</div>

					<p class="mt-4 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
						{intern.description}
					</p>

					<!-- Skills -->
					<div class="flex flex-wrap gap-1.5 mt-4">
						{#each intern.skillsRequired as skill}
							<span class="px-2 py-0.5 rounded bg-slate-950/60 text-[9px] font-semibold text-slate-600 dark:text-slate-400">
								{skill}
							</span>
						{/each}
					</div>

					<!-- Metas with vector SVGs, NO Emojis -->
					<div class="flex flex-wrap gap-x-5 gap-y-1 mt-5 text-[11px] font-bold text-slate-600 dark:text-slate-400 border-t border-divider dark:border-divider-dark/50 pt-4">
						<span class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
							{intern.location} ({intern.mode})
						</span>
						<span class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							{intern.duration}
						</span>
						{#if intern.stipendAmount > 0}
							<span class="text-emerald-400 font-bold">
								₹{intern.stipendAmount}/mo
							</span>
						{:else}
							<span class="text-slate-500">Unpaid</span>
						{/if}
						{#if intern.fee > 0}
							<span class="text-rose-450 font-bold">Fee: ₹{intern.fee}</span>
						{/if}
					</div>
				</div>

				<div class="mt-6 pt-4 border-t border-divider dark:border-divider-dark/50 flex items-center justify-between">
					<span class="text-[10px] text-slate-500 font-bold">
						Apply by: <strong class="text-slate-350">{intern.lastDateToApply}</strong>
					</span>
					
					{#if intern.hasApplied}
						<button disabled class="py-2 px-4 rounded-xl text-xs font-bold bg-slate-950 text-slate-500 border border-slate-900 cursor-not-allowed">
							Applied
						</button>
					{:else}
						<button
							onclick={() => openApplyModal(intern)}
							class="py-2 px-4 rounded-xl text-xs font-bold text-primary dark:text-primary-dark bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition cursor-pointer"
						>
							Apply Now
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
{/if}

<!-- Apply Confirmation Dialog Modal (Midnight Glass theme) -->
{#if showModal && selectedInternship}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
<<<<<<< HEAD
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm" onclick={closeModal} role="button" tabindex="0" onkeydown={(e) => { if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') closeModal(); }}>
=======
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md" onclick={closeModal}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
		<div
			class="w-full max-w-xl rounded-3xl glass-card relative max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
			onkeydown={(e) => e.stopPropagation()}
		>
			<!-- Close button -->
<<<<<<< HEAD
			<button onclick={closeModal} aria-label="Close modal" class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white cursor-pointer transition">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
=======
			<button onclick={closeModal} class="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-all duration-200">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
			</button>

			<div class="p-8 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10 dark:to-transparent">
				<span class="inline-flex px-2.5 py-1 rounded-md bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px] font-extrabold tracking-wide uppercase mb-3">{selectedInternship.domain}</span>
				<h2 class="font-display font-black text-2xl md:text-3xl text-primary dark:text-primary-dark leading-tight">
					Apply for {selectedInternship.title}
				</h2>
				<p class="text-sm font-semibold text-slate-600 dark:text-slate-400 mt-2 flex items-center gap-1.5">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2Z"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2Z"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>
					{selectedInternship.companyName}
				</p>
			</div>

			<!-- Form Details -->
			<div class="p-8 space-y-6 text-sm">
				<div>
					<h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description</h4>
					<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{selectedInternship.description}</p>
				</div>

				{#if selectedInternship.learningOutcomes}
					<div>
						<h4 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Expected Learning Outcomes</h4>
						<p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{selectedInternship.learningOutcomes}</p>
					</div>
				{/if}

				<div class="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-divider dark:border-divider-dark text-xs">
					<div class="flex flex-col gap-1">
						<strong class="text-slate-500 dark:text-slate-500 uppercase tracking-wider text-[10px]">Contract Mode</strong>
						<span class="text-slate-900 dark:text-slate-200 font-bold text-sm">{selectedInternship.mode}</span>
					</div>
					<div class="flex flex-col gap-1">
						<strong class="text-slate-500 dark:text-slate-500 uppercase tracking-wider text-[10px]">Duration</strong>
						<span class="text-slate-900 dark:text-slate-200 font-bold text-sm">{selectedInternship.duration}</span>
					</div>
					<div class="flex flex-col gap-1">
						<strong class="text-slate-500 dark:text-slate-500 uppercase tracking-wider text-[10px]">Compensation</strong>
						<span class="text-slate-900 dark:text-slate-200 font-bold text-sm">{selectedInternship.type}</span>
					</div>
					<div class="flex flex-col gap-1">
						<strong class="text-slate-500 dark:text-slate-500 uppercase tracking-wider text-[10px]">Fee</strong>
						{#if selectedInternship.fee > 0}
							<span class="text-rose-500 dark:text-rose-400 font-bold text-sm">₹{selectedInternship.fee}</span>
						{:else}
							<span class="text-emerald-500 dark:text-emerald-400 font-bold text-sm">Free</span>
						{/if}
					</div>
					{#if selectedInternship.stipendAmount > 0}
						<div class="col-span-2 pt-3 mt-1 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col gap-1">
							<strong class="text-slate-500 dark:text-slate-500 uppercase tracking-wider text-[10px]">Monthly Stipend</strong>
							<span class="text-emerald-600 dark:text-emerald-400 font-black text-base">₹{selectedInternship.stipendAmount}</span>
						</div>
					{/if}
				</div>

				<!-- Resume Verification Box -->
				<div class="p-4 rounded-xl border border-indigo-200 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/5 flex items-center gap-4 transition-colors">
					<div class="h-10 w-10 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center font-black text-xs shrink-0">
						PDF
					</div>
					<div class="flex-grow min-w-0">
						<span class="text-sm font-bold text-primary dark:text-primary-dark block truncate">Attached Resume</span>
						<span class="text-xs text-muted dark:text-muted-dark truncate block mt-0.5">{student.resumePath ? 'Resume attached and ready' : 'No resume uploaded yet'}</span>
					</div>
					<a href="/student/profile" class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline shrink-0 bg-surface dark:bg-surface-dark px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">Change</a>
				</div>
			</div>

			<!-- Submission Form -->
			<form
				action="?/apply"
				class="px-8 pb-8"
				method="POST"
				use:enhance={() => {
					applyLoading = true;
					modalError = null;
					return ({ result }) => {
						applyLoading = false;
						if (result.type === 'failure') {
							modalError = result.data?.error || 'An error occurred';
						} else {
							closeModal();
							window.location.reload();
						}
					};
				}}
			>
				<input type="hidden" name="internshipId" value={selectedInternship.id} />

				{#if modalError}
					<div class="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs font-semibold">
						{modalError}
					</div>
				{/if}

				<div class="flex gap-4 mt-8 pt-6 border-t border-slate-200/50 dark:border-slate-800/50">
					<button
						type="button"
						onclick={closeModal}
						class="flex-1 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-surface dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-all cursor-pointer"
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={applyLoading || !student.resumePath}
						class="flex-1 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 disabled:opacity-50 disabled:grayscale transition-all cursor-pointer flex items-center justify-center gap-2"
					>
						{#if applyLoading}
							<span class="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
							Processing...
						{:else}
							Submit Application
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
