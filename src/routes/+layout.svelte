<script>
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import CookieConsent from '$lib/components/CookieConsent.svelte';

	let { data, children } = $props();

	// Theme preference: 'dark' | 'light' | 'auto'
	let theme = $state('auto');
	let themeMenuOpen = $state(false);

	onMount(() => {
		const storedTheme = localStorage.getItem('theme') || 'auto';
		theme = storedTheme;
		applyTheme(theme);
		
		// Listen for system theme changes if set to auto
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (theme === 'auto') {
				applyTheme('auto');
			}
		});
	});

	function setTheme(newTheme) {
		theme = newTheme;
		localStorage.setItem('theme', theme);
		applyTheme(theme);
		themeMenuOpen = false;
	}

	function applyTheme(currentTheme) {
		document.documentElement.classList.remove('dark', 'light');
		
		let isDark = false;
		if (currentTheme === 'auto') {
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} else {
			isDark = currentTheme === 'dark';
		}
		
		if (isDark) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.add('light');
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Nexora - Centralized Internship Nexus</title>
</svelte:head>

<!-- Premium background mesh that responds to light/dark themes -->
<div class="min-h-screen text-slate-800 bg-slate-50 dark:bg-surface dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden flex flex-col">
	<!-- Ambient Background Glows -->
	<div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[150px] pointer-events-none"></div>
	<div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[180px] pointer-events-none"></div>

	<!-- Theme toggler float button (Bottom Left) -->
	<div class="fixed bottom-6 left-6 z-50">
		{#if themeMenuOpen}
			<div class="absolute bottom-16 left-0 flex flex-col gap-2 p-2 rounded-2xl bg-surface dark:bg-surface-dark shadow-2xl border border-divider dark:border-divider-dark animate-in slide-in-from-bottom-2">
				<button onclick={() => setTheme('light')} class="px-4 py-2 text-xs font-bold text-left rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-800 {theme === 'light' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400'}">Light</button>
				<button onclick={() => setTheme('dark')} class="px-4 py-2 text-xs font-bold text-left rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-800 {theme === 'dark' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400'}">Dark</button>
				<button onclick={() => setTheme('auto')} class="px-4 py-2 text-xs font-bold text-left rounded-xl transition hover:bg-slate-100 dark:hover:bg-slate-800 {theme === 'auto' ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10' : 'text-slate-600 dark:text-slate-400'}">System</button>
			</div>
		{/if}
		<button
			onclick={() => themeMenuOpen = !themeMenuOpen}
			class="p-4 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xl border border-divider dark:border-divider-dark hover:scale-110 active:scale-95 transition duration-300 text-slate-800 dark:text-slate-200 cursor-pointer flex items-center justify-center"
			aria-label="Toggle Theme Menu"
		>
			{#if theme === 'dark'}
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
			{:else if theme === 'light'}
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
			{:else}
				<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
			{/if}
		</button>
	</div>

	<!-- Main Router Output -->
	<main class="flex-grow flex flex-col relative z-10">
		{@render children()}
	</main>
	
	<CookieConsent />
</div>
