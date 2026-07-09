<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';
	import { onMount, onDestroy } from 'svelte';
	import { getDatabase, ref, onValue } from 'firebase/database';
	import { app } from '$lib/firebase';

	let { data, children } = $props();
	const student = $derived(data.student);
	
	let unread = $state(0);
	let unreadMsgs = $state(0);
	let unsubscribeMsgs = null;

	$effect(() => {
		if (data.lazy) {
			data.lazy.unreadNotifications.then(val => unread = val);
		}
	});

	onMount(() => {
		if (student && student.email) {
			const db = getDatabase(app);
			const msgsRef = ref(db, 'messages');
			unsubscribeMsgs = onValue(msgsRef, (snapshot) => {
				const val = snapshot.val();
				if (val) {
					let allMsgs = [];
					if (Array.isArray(val)) {
						allMsgs = val.filter(Boolean);
					} else if (typeof val === 'object') {
						allMsgs = Object.values(val).filter(Boolean);
					}
					
					unreadMsgs = allMsgs.filter(m => 
						m.recipientEmail.toLowerCase() === student.email.toLowerCase() && !m.read
					).length;
				} else {
					unreadMsgs = 0;
				}
			});
		}
	});

	onDestroy(() => {
		if (unsubscribeMsgs) {
			unsubscribeMsgs();
		}
	});

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function getLinkClass(path) {
		const baseClass = "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-355 cursor-pointer ";
		const activeClass = "bg-indigo-600 text-white shadow-md shadow-indigo-500/10";
		const inactiveClass = "text-slate-600 hover:bg-slate-50 hover:text-slate-900";
		
		if (page.url.pathname === path) {
			return baseClass + activeClass;
		}
		return baseClass + inactiveClass;
	}
</script>

<div class="min-h-screen flex flex-col md:flex-row bg-slate-50 transition-colors duration-300">
	<!-- Sidebar (Desktop) -->
	<aside class="hidden md:flex flex-col w-64 border-r border-slate-200 bg-white fixed top-0 bottom-0 left-0 z-20">
		<!-- Brand Logo -->
		<div class="p-6 border-b border-slate-200 flex items-center gap-3">
			<img loading="lazy" src={logo} alt="Nexora Logo" class="h-9 w-9 drop-shadow-sm" />
			<span class="font-display font-extrabold text-xl text-slate-900">
				Nexora
			</span>
		</div>

		<!-- Nav Links -->
		<nav class="grow p-4 space-y-1 mt-4 overflow-y-auto">
			<a href="/student" class={getLinkClass('/student')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
				Overview
			</a>
			<a href="/student/internships" class={getLinkClass('/student/internships')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
				Find Internships
			</a>
			<a href="/student/companies" class={getLinkClass('/student/companies')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
				Companies
			</a>
			<a href="/student/certificates" class={getLinkClass('/student/certificates')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
				Certificates
			</a>
			<a href="/student/messages" class={getLinkClass('/student/messages')}>
				<div class="relative flex items-center gap-3 w-full">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
					<span>Messages</span>
					{#if unreadMsgs > 0}
						<span class="absolute right-0 h-5 w-5 bg-indigo-650 text-white rounded-full flex items-center justify-center text-[10px] font-bold animate-pulse">
							{unreadMsgs}
						</span>
					{/if}
				</div>
			</a>
			<a href="/student/notifications" class={getLinkClass('/student/notifications')}>
				<div class="relative flex items-center gap-3 w-full">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
					<span>Notifications</span>
					{#if unread > 0}
						<span class="absolute right-0 h-5 w-5 bg-rose-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
							{unread}
						</span>
					{/if}
				</div>
			</a>
			<a href="/student/profile" class={getLinkClass('/student/profile')}>
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
				My Profile
			</a>
		</nav>

		<!-- Bottom User Block -->
		<div class="p-4 border-t border-slate-200 bg-slate-50">
			<div class="flex items-center gap-3">
				<div class="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold font-display uppercase border border-indigo-50/5">
					{#if student.profilePhoto}
						<img loading="lazy" src={student.profilePhoto} alt={student.fullName} class="h-10 w-10 rounded-full object-cover" />
					{:else}
						{student.fullName.charAt(0)}
					{/if}
				</div>
				<div class="grow min-w-0">
					<h4 class="text-sm font-bold text-slate-850 truncate">{student.fullName}</h4>
					<span class="text-xs text-slate-550 truncate block font-semibold">Student</span>
				</div>
			</div>

			<a
				href="/logout"
				class="mt-4 flex items-center justify-center gap-2 py-2 w-full rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition duration-150 cursor-pointer"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
				Sign Out
			</a>
		</div>
	</aside>

	<!-- Mobile Header Navbar -->
	<header class="md:hidden w-full flex items-center justify-between py-4 px-6 border-b border-slate-200 bg-white/90 backdrop-blur-lg sticky top-0 z-30">
		<div class="flex items-center gap-3">
			<img loading="lazy" src={logo} alt="Nexora Logo" class="h-8 w-8 drop-shadow-sm" />
			<span class="font-display font-extrabold text-lg">Nexora</span>
		</div>
		<div class="flex items-center gap-3">
			<!-- Notification quick badge -->
			<a href="/student/notifications" class="relative p-2 text-slate-600">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
				{#if unread > 0}
					<span class="absolute top-1 right-1 h-2.5 w-2.5 bg-rose-500 rounded-full animate-pulse"></span>
				{/if}
			</a>
			<!-- Mobile Hamburger Button -->
			<button onclick={toggleMobileMenu} class="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 focus:outline-none cursor-pointer">
				{#if mobileMenuOpen}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
				{/if}
			</button>
		</div>
	</header>

	<!-- Mobile Menu Drawer -->
	{#if mobileMenuOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="md:hidden fixed inset-x-0 top-[69px] bottom-0 bg-slate-950/20 backdrop-blur-md z-40" onclick={toggleMobileMenu}>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="w-64 h-full bg-white border-r border-slate-200 p-4 space-y-2 flex flex-col justify-between" onclick={(e) => e.stopPropagation()}>
				<nav class="space-y-1">
					<a href="/student" class={getLinkClass('/student')} onclick={toggleMobileMenu}>Dashboard</a>
					<a href="/student/internships" class={getLinkClass('/student/internships')} onclick={toggleMobileMenu}>Explore Internships</a>
					<a href="/student/companies" class={getLinkClass('/student/companies')} onclick={toggleMobileMenu}>Explore Companies</a>
					<a href="/student/messages" class={getLinkClass('/student/messages')} onclick={toggleMobileMenu}>Chat Messages</a>
					<a href="/student/notifications" class={getLinkClass('/student/notifications')} onclick={toggleMobileMenu}>Notifications</a>
					<a href="/student/profile" class={getLinkClass('/student/profile')} onclick={toggleMobileMenu}>My Profile</a>
				</nav>
				<div class="border-t border-slate-200 pt-4">
					<a href="/logout" class="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/10 transition duration-150">Sign Out</a>
				</div>
			</div>
		</div>
	{/if}

	<!-- Right Side Scrollable Page Content Container -->
	<div class="grow md:ml-64 p-6 md:p-10 min-h-screen relative flex flex-col">
		<div class="max-w-6xl w-full mx-auto grow flex flex-col">
			{@render children()}
		</div>
	</div>
</div>
