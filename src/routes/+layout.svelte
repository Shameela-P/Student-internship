<script>
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Default to Light Theme
	let theme = $state('light');

	onMount(() => {
		const storedTheme = localStorage.getItem('theme') || 'light';
		theme = storedTheme;
		applyTheme(theme);

		// Global listener to sync theme changes from other components
		window.addEventListener('storage', (e) => {
			if (e.key === 'theme') {
				applyTheme(e.newValue || 'light');
			}
		});
	});

	function applyTheme(currentTheme) {
		document.documentElement.classList.remove('dark', 'light');
		if (currentTheme === 'dark') {
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

<div class="min-h-screen text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 relative overflow-x-hidden flex flex-col">
	<!-- Ambient Background Glows -->
	<div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none"></div>
	<div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[180px] pointer-events-none"></div>

	<!-- Main Router Output -->
	<main class="flex-grow flex flex-col relative z-10">
		{@render children()}
	</main>
</div>
