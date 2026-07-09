<script>
	import { onMount } from 'svelte';

	let showConsent = $state(false);

	onMount(() => {
		const consent = localStorage.getItem('cookie_consent');
		if (!consent) {
			// Small delay before showing to ensure smooth initial load
			setTimeout(() => {
				showConsent = true;
			}, 1000);
		}
	});

	function accept() {
		localStorage.setItem('cookie_consent', 'accepted');
		showConsent = false;
	}

	function reject() {
		localStorage.setItem('cookie_consent', 'rejected');
		showConsent = false;
	}
</script>

{#if showConsent}
	<div class="fixed bottom-0 left-0 w-full z-[100] p-4 md:p-6 pointer-events-none flex justify-center">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="pointer-events-auto max-w-4xl w-full bg-white border border-slate-200 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] [0_10px_40px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
		>
			<!-- Decorative Gradient -->
			<div class="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-blue-500/10 to-purple-500/5 blur-3xl pointer-events-none rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
			
			<div class="grow z-10">
				<div class="flex items-center gap-3 mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
					<h3 class="font-display font-black text-xl text-slate-900">We Value Your Privacy</h3>
				</div>
				<p class="text-sm text-slate-600 max-w-2xl leading-relaxed">
					Nexora uses essential cookies to ensure secure authentication, session management, and site performance. We also use anonymous analytics cookies to improve our platform. By continuing to use this site, you consent to our use of cookies in accordance with our Privacy Policy.
				</p>
			</div>

			<div class="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0 z-10">
				<button
					onclick={reject}
					class="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-600 font-bold text-sm transition-colors"
				>
					Strictly Necessary Only
				</button>
				<button
					onclick={accept}
					class="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-900 font-bold text-sm shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
				>
					Accept All Cookies
				</button>
			</div>
		</div>
	</div>
{/if}
