<script>
	import logo from '$lib/assets/logo.svg';
	import FloatingLines from '$lib/components/FloatingLines.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	let { data } = $props();
	const stats = $derived(data.stats);
	const featured = $derived(data.featured);
	const categories = $derived(data.categories);
</script>

<!-- Header & Nav (Midnight Ocean dark glass style) -->
<header class="w-full py-4 px-6 md:px-12 border-b border-divider bg-slate-100 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
	<a href={data.user ? `/${data.user.role}` : '/'} class="flex items-center gap-3 cursor-pointer">
		<img loading="lazy" src={logo} alt="Nexora Logo" class="h-10 w-10 drop-shadow-md" />
		<span class="font-display font-extrabold text-2xl tracking-wide bg-linear-to-r from-slate-900 to-slate-700 text-gradient">
			Nexora
		</span>
	</a>

	<!-- Navigation links -->
	<nav class="flex items-center gap-4">
		{#if data.user}
			<a
				href={`/${data.user.role}`}
				class="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
			>
				Go to Dashboard ({data.user.role.toUpperCase()})
			</a>
		{:else}
			<a
				href="/login"
				class="text-sm font-semibold text-slate-350 hover:text-primary transition duration-200"
			>
				Sign In
			</a>
			<a
				href="/register"
				class="px-5 py-2.5 rounded-xl text-sm font-semibold text-primary bg-blue-600 hover:bg-blue-500 shadow-md hover:shadow-blue-500/15 transition duration-200"
			>
				Get Started
			</a>
		{/if}
	</nav>
</header>

<!-- Hero Section -->
<section class="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 flex flex-col items-center text-center relative overflow-hidden">
	<FloatingLines />

	<div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-6 select-none animate-float">
		<span class="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
		Trusted by 10,000+ students and 500+ companies
	</div>

	<h1 class="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight max-w-5xl tracking-tight text-primary">
		Launch your next opportunity with <br class="hidden md:inline" />
		<span class="bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400 text-gradient">
			clarity and momentum
		</span>
	</h1>

	<p class="mt-6 text-lg text-slate-600 max-w-3xl leading-relaxed">
		Discover vetted internships, manage applications, and connect with verified employers in one focused platform built for modern student career growth.
	</p>

	<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
		{#if !data.user}
			<a
				href="/register?role=student"
				class="px-8 py-4 rounded-2xl text-base font-bold text-primary bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
			>
				Register as Student
			</a>
			<a
				href="/register?role=company"
				class="px-8 py-4 rounded-2xl text-base font-bold text-slate-300 glass border border-divider hover:bg-slate-900 hover:text-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
			>
				Register as Company
			</a>
		{:else}
			<a
				href={`/${data.user.role}`}
				class="px-8 py-4 rounded-2xl text-base font-bold text-primary bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
			>
				Enter Dashboard
			</a>
		{/if}
	</div>
</section>

<!-- Stats Grid -->
<section class="w-full bg-slate-100 border-y border-divider py-12 px-6 md:px-12 backdrop-blur-sm">
	<div class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
		<!-- Stat 1 -->
		<div class="flex flex-col items-center text-center p-4">
			<span class="font-display font-black text-3xl md:text-5xl text-blue-400">
				{stats.activeInternships}+
			</span>
			<span class="text-sm font-semibold text-slate-600 mt-2">
				Active Internships
			</span>
		</div>
		<!-- Stat 2 -->
		<div class="flex flex-col items-center text-center p-4">
			<span class="font-display font-black text-3xl md:text-5xl text-emerald-400">
				{stats.registeredCompanies}+
			</span>
			<span class="text-sm font-semibold text-slate-600 mt-2">
				Verified Companies
			</span>
		</div>
		<!-- Stat 3 -->
		<div class="flex flex-col items-center text-center p-4">
			<span class="font-display font-black text-3xl md:text-5xl text-purple-400">
				{stats.totalStudents}+
			</span>
			<span class="text-sm font-semibold text-slate-600 mt-2">
				Registered Students
			</span>
		</div>
		<!-- Stat 4 -->
		<div class="flex flex-col items-center text-center p-4">
			<span class="font-display font-black text-3xl md:text-5xl text-pink-400">
				{stats.successfulPlacements}+
			</span>
			<span class="text-sm font-semibold text-slate-600 mt-2">
				Successful Placements
			</span>
		</div>
	</div>
</section>

<!-- Domain Catalog Overview -->
<section class="max-w-7xl mx-auto px-6 md:px-12 py-20">
	<div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
		<div>
			<h2 class="font-display font-extrabold text-3xl md:text-4xl text-primary">
				Explore 150+ Domains
			</h2>
			<p class="text-slate-600 mt-2 max-w-xl">
				Find the internship that perfectly aligns with your career targets. Discover technical, business, creative, and emerging roles.
			</p>
		</div>
		<a
			href="/register?role=student"
			class="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold mt-4 md:mt-0 transition group cursor-pointer"
		>
			View All Categories
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition duration-200"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
		</a>
	</div>

	<!-- Domain Cards with Vector SVGs, NO Emojis -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each categories as category}
			<div class="p-6 rounded-2xl bg-surface border border-divider hover:border-blue-500/35 transition duration-300 hover:scale-[1.01] flex flex-col justify-between h-40">
				<div class="flex items-center justify-between">
					<!-- Render clean vectors instead of emojis -->
					<div class="p-2 bg-slate-950 rounded-xl text-blue-400 border border-divider">
						{#if category.type === 'software'}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
						{:else if category.type === 'engineering'}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
						{:else if category.type === 'finance'}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
						{:else}
							<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
						{/if}
					</div>
					<span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
						{category.count} Openings
					</span>
				</div>
				<div>
					<h3 class="font-display font-bold text-base text-primary">
						{category.name}
					</h3>
					<span class="text-xs text-slate-500 block mt-0.5">
						Explore jobs & projects
					</span>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Featured Postings -->
<section class="max-w-7xl mx-auto px-6 md:px-12 pb-24">
	<div class="text-center mb-12">
		<h2 class="font-display font-extrabold text-3xl md:text-4xl text-primary">
			Featured Internships
		</h2>
		<p class="text-slate-600 mt-2 max-w-xl mx-auto">
			Apply to some of the highest-rated opportunities from certified companies on Nexora.
		</p>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
		{#each featured as internship}
			<div class="p-8 rounded-2xl bg-surface hover:bg-slate-900/60 border border-divider hover:border-blue-500/20 hover:shadow-blue-500/5 transition duration-300 relative group overflow-hidden">
				<div class="absolute top-0 right-0 w-24 h-24 rounded-full bg-linear-to-bl from-blue-500/5 to-transparent blur-md pointer-events-none group-hover:scale-150 transition duration-500"></div>

				<div>
					<div class="flex items-start justify-between">
						<div>
							<span class="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
								{internship.type}
							</span>
							<h3 class="font-display font-bold text-xl text-primary mt-3.5 group-hover:text-blue-400 transition duration-200">
								{internship.title}
							</h3>
							<p class="text-xs font-semibold text-slate-600 mt-0.5">
								{internship.companyName}
							</p>
						</div>
						<!-- Mock Logo Placeholder -->
						<div class="h-10 w-10 rounded-xl bg-slate-950 border border-divider flex items-center justify-center font-display font-black text-slate-500 text-sm shrink-0">
							{internship.companyName.charAt(0)}
						</div>
					</div>

					<p class="mt-4 text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal">
						{internship.description}
					</p>

					<!-- Metas, NO Emojis -->
					<div class="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[11px] font-bold text-slate-600 border-t border-divider pt-4">
						<div class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
							{internship.location} ({internship.mode})
						</div>
						<div class="flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-slate-500"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							{internship.duration}
						</div>
						{#if internship.stipendAmount > 0}
							<div class="flex items-center gap-1.5 text-emerald-400 font-bold">
								₹{internship.stipendAmount}/mo
							</div>
						{/if}
					</div>
				</div>

				<div class="mt-8 pt-4 border-t border-divider flex items-center justify-between">
					<span class="text-[10px] text-slate-500 font-bold">
						Apply by: <strong class="text-slate-600">{internship.lastDateToApply}</strong>
					</span>
					<a
						href="/register?role=student"
						class="text-xs font-bold text-blue-450 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
					>
						Apply Now
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</section>


<!-- Footer -->
<footer class="w-full bg-slate-100 border-t border-divider pt-16 pb-8">
	<div class="max-w-7xl mx-auto px-6 md:px-12">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
			<!-- Left Section -->
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-3">
					<img loading="lazy" src={logo} alt="Nexora Logo" class="h-10 w-10 drop-shadow-sm" />
					<span class="font-display font-black text-2xl tracking-wide bg-linear-to-r from-slate-900 to-slate-700 text-gradient">
						Nexora
					</span>
				</div>
				<p class="text-sm text-slate-600 leading-relaxed max-w-xs mt-2">
					Connecting students with leading companies through internships and career opportunities.
				</p>
			</div>

			<!-- Quick Links -->
			<div class="flex flex-col gap-4">
				<h4 class="font-display font-bold text-lg text-primary mb-2">Quick Links</h4>
				<nav class="flex flex-col gap-3 text-sm text-slate-600 font-medium">
					<a href="/" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Home</a>
					<a href="/about" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">About</a>
					<a href="/features" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Features</a>
					<a href="/internships" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Explore Internships</a>
					<a href="/companies" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Explore Companies</a>
					<a href="/contact" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Contact</a>
				</nav>
			</div>

			<!-- Resources -->
			<div class="flex flex-col gap-4">
				<h4 class="font-display font-bold text-lg text-primary mb-2">Resources</h4>
				<nav class="flex flex-col gap-3 text-sm text-slate-600 font-medium">
					<a href="/privacy" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Privacy Policy</a>
					<a href="/terms" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Terms & Conditions</a>
					<a href="/help" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">Help Center</a>
					<a href="/faq" class="hover:text-blue-500 hover:translate-x-1 transition-all duration-300 w-fit">FAQ</a>
				</nav>
			</div>

			<!-- Contact Info & Social -->
			<div class="flex flex-col gap-6">
				<div>
					<h4 class="font-display font-bold text-lg text-primary mb-4">Contact</h4>
					<div class="flex flex-col gap-3 text-sm text-slate-600 font-medium">
						<a href="mailto:shameela5qts@gmail.com" class="flex items-center gap-3 hover:text-blue-500 transition-colors duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
							shameela5qts@gmail.com
						</a>
						<a href="tel:+916383649156" class="flex items-center gap-3 hover:text-blue-500 transition-colors duration-300">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
							+91 6383649156
						</a>
					</div>
				</div>
				
				<div>
					<h4 class="font-display font-bold text-sm text-primary mb-3">Follow Us</h4>
					<div class="flex items-center gap-4">
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="GitHub">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="LinkedIn">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
						</a>
						<a href="mailto:shameela5qts@gmail.com" class="p-2 rounded-lg bg-slate-200 text-slate-600 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:-translate-y-1" aria-label="Gmail">
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
						</a>
					</div>
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-xs text-slate-500 font-medium">
				&copy; {new Date().getFullYear()} Nexora. All Rights Reserved.
			</p>
			<p class="text-xs text-slate-500 font-medium flex items-center gap-1">
				Designed and Developed by <span class="font-bold text-slate-700">Shameela and Team</span>
			</p>
		</div>
	</div>
</footer>

<CookieConsent />
