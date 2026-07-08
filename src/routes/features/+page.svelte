<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
</script>

<div class="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center justify-center relative">
	<FloatingLines />
	
	<div class="text-center max-w-3xl mb-16 relative z-10">
		<span class="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 inline-block">
			Platform Features
		</span>
		<h1 class="font-display font-black text-4xl md:text-6xl text-slate-900 tracking-tight">
			Everything You Need to <span class="bg-gradient-to-r from-blue-400 to-indigo-400 text-gradient">Succeed</span>
		</h1>
		<p class="mt-6 text-base text-slate-600 leading-relaxed">
			Nexora provides dedicated dashboards and communication pipelines tailored for students, companies, and platform administrators.
		</p>
	</div>

	<!-- Features Detail Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10 mb-12">
		<div class="p-8 rounded-3xl bg-white border border-slate-200/50">
			<h3 class="text-2xl font-extrabold text-slate-950 mb-4">For Students</h3>
			<ul class="space-y-3 text-sm text-slate-600">
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					150+ Domain categories for personalized matches
				</li>
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Integrated PDF Resume uploading and profile builder
				</li>
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Real-time direct messaging with prospective employers
				</li>
			</ul>
		</div>

		<div class="p-8 rounded-3xl bg-white border border-slate-200/50">
			<h3 class="text-2xl font-extrabold text-slate-950 mb-4">For Companies</h3>
			<ul class="space-y-3 text-sm text-slate-600">
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Flexible internship listing creator and applicant manager
				</li>
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Application status tracking (Pending, Approved, Rejected)
				</li>
				<li class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
					Immediate notifications for applicants and new messages
				</li>
			</ul>
		</div>
	</div>
</div>
