<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
</script>

<div class="flex-1 w-full max-w-4xl mx-auto px-6 py-16 relative">
	<FloatingLines />
	
	<div class="rounded-3xl bg-white border border-slate-200/50 p-8 md:p-12 shadow-xl relative z-10">
		<h1 class="font-display font-black text-3xl md:text-4xl text-slate-900 mb-6">Help Center</h1>
		<div class="space-y-6 text-sm text-slate-600 leading-relaxed font-normal">
			<p>Welcome to the Nexora Help Center. Select a topic below or contact support if you need further assistance.</p>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
				<div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/50">
					<h3 class="font-bold text-slate-900 mb-2">Student Support</h3>
					<p class="text-xs">Learn how to create a profile, upload your resume, apply for internships, and communicate with employers.</p>
				</div>
				<div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/50">
					<h3 class="font-bold text-slate-900 mb-2">Employer Support</h3>
					<p class="text-xs">Learn how to verify your company registration, post new internship openings, and evaluate applicants.</p>
				</div>
			</div>
		</div>
	</div>
</div>
