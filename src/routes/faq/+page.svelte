<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
	
	let activeFaq = $state(null);

	const faqs = [
		{
			q: "How does the internship application process work?",
			a: "Students find internships from their dashboard, click 'Apply Now', upload their resume, and fill in any required details. Employers will receive a notification and can review the resume and application status."
		},
		{
			q: "Is there any fee to apply or host internships?",
			a: "Nexora is completely free for students. Employers can host free internships or paid training programs depending on their organizational requirements."
		},
		{
			q: "How do I communicate with recruiters?",
			a: "Once you have applied or been contacted by an employer, you can use the integrated Chat system in your dashboard to converse in real-time."
		}
	];

	function toggleFaq(index) {
		if (activeFaq === index) {
			activeFaq = null;
		} else {
			activeFaq = index;
		}
	}
</script>

<div class="flex-1 w-full max-w-4xl mx-auto px-6 py-16 relative">
	<FloatingLines />
	
	<div class="rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200/50 dark:border-slate-800/40 p-8 md:p-12 shadow-xl relative z-10">
		<h1 class="font-display font-black text-3xl md:text-4xl text-slate-900 dark:text-white mb-6 text-center">Frequently Asked Questions</h1>
		
		<div class="space-y-4 mt-8">
			{#each faqs as faq, i}
				<div class="border-b border-slate-200 dark:border-slate-800 pb-4">
					<button
						onclick={() => toggleFaq(i)}
						class="w-full flex items-center justify-between text-left font-bold text-slate-900 dark:text-white py-3 cursor-pointer hover:text-indigo-500 transition duration-200"
					>
						<span>{faq.q}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="transform transition-transform duration-200 {activeFaq === i ? 'rotate-180' : ''}"
						>
							<path d="m6 9 6 6 6-6"/>
						</svg>
					</button>
					{#if activeFaq === i}
						<div class="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-in fade-in slide-in-from-top-1">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
