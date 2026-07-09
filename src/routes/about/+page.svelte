<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
</script>

<div class="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col items-center justify-center relative">
	<FloatingLines />
	
	<div class="text-center max-w-3xl mb-16 relative z-10">
		<span class="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6 inline-block">
			Our Mission
		</span>
		<h1 class="font-display font-black text-4xl md:text-6xl text-slate-900 tracking-tight">
			Connecting Talent with <span class="bg-linear-to-r from-blue-400 to-indigo-400 text-gradient">Industry Leaders</span>
		</h1>
		<p class="mt-6 text-base text-slate-600 leading-relaxed">
			Nexora is a centralized internship nexus designed to simplify the recruitment lifecycle for students, universities, and enterprise employers. We bridge the gap between academic theory and practical corporate experience.
		</p>
	</div>

	<!-- Core Values Grid -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-10">
		<div class="p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-indigo-500/35 transition duration-300">
			<div class="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-fit mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
			</div>
			<h3 class="text-xl font-bold text-slate-950 mb-3">Vetted Opportunities</h3>
			<p class="text-sm text-slate-600 leading-relaxed">Every internship listing on our platform undergoes a strict verification process to ensure real learning outcomes and professional guidance.</p>
		</div>

		<div class="p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-indigo-500/35 transition duration-300">
			<div class="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-fit mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
			</div>
			<h3 class="text-xl font-bold text-slate-950 mb-3">Structured Mentorship</h3>
			<p class="text-sm text-slate-600 leading-relaxed">We support active student-employer interactions with integrated messaging, real-time feedback, and clear internship goals.</p>
		</div>

		<div class="p-8 rounded-3xl bg-white border border-slate-200/50 hover:border-indigo-500/35 transition duration-300">
			<div class="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl w-fit mb-6">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
			</div>
			<h3 class="text-xl font-bold text-slate-950 mb-3">Accessible Career Paths</h3>
			<p class="text-sm text-slate-600 leading-relaxed">We offer comprehensive search filters, stipend transparency, and resume validation tools to make opportunities accessible to everyone.</p>
		</div>
	</div>
</div>
