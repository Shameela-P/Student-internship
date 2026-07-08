<script>
	import FloatingLines from '$lib/components/FloatingLines.svelte';
	let submitted = $state(false);

	function handleSubmit(e) {
		e.preventDefault();
		submitted = true;
	}
</script>

<div class="flex-1 w-full max-w-lg mx-auto px-6 py-16 flex flex-col items-center justify-center relative">
	<FloatingLines />

	<div class="w-full rounded-3xl bg-white border border-slate-200/50 p-8 shadow-xl relative z-10">
		<h1 class="font-display font-black text-3xl text-slate-900 mb-2 text-center">Contact Us</h1>
		<p class="text-sm text-slate-600 mb-8 text-center">Have a question or feedback? Drop us a message below.</p>

		{#if submitted}
			<div class="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-center">
				<h3 class="font-bold text-lg mb-2">Message Sent!</h3>
				<p class="text-sm">Thank you for reaching out. We will get back to you shortly.</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} class="space-y-6">
				<div>
					<label for="name" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name</label>
					<input type="text" id="name" required class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-indigo-500 focus:outline-none transition text-sm text-slate-900" />
				</div>

				<div>
					<label for="email" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
					<input type="email" id="email" required class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-indigo-500 focus:outline-none transition text-sm text-slate-900" />
				</div>

				<div>
					<label for="message" class="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message</label>
					<textarea id="message" rows="4" required class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:border-indigo-500 focus:outline-none transition text-sm text-slate-900"></textarea>
				</div>

				<button type="submit" class="w-full py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition duration-200 cursor-pointer">
					Send Message
				</button>
			</form>
		{/if}
	</div>
</div>
