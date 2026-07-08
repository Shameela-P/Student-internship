<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Nexora - Centralized Internship Nexus</title>
</svelte:head>

<div class="min-h-screen text-slate-900 bg-white transition-colors duration-300 relative overflow-x-hidden flex flex-col">
	<!-- Ambient Background Glows -->
	<div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none"></div>
	<div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/5 blur-[180px] pointer-events-none"></div>

	<!-- Main Router Output -->
	<main class="flex-grow flex flex-col relative z-10">
		{@render children()}
	</main>
</div>
