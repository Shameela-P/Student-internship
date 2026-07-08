<script>
	import { onMount, onDestroy } from 'svelte';
	import { getDatabase, ref, onValue, update } from 'firebase/database';
	import { app } from '$lib/firebase';

	let { data } = $props();
	const student = $derived(data.student);

	let notifications = $state([]);
	let unsubscribe = null;
	const db = getDatabase(app);

	onMount(() => {
		const notifRef = ref(db, 'notifications');
		unsubscribe = onValue(notifRef, (snapshot) => {
			const val = snapshot.val();
			if (val) {
				let allNotifs = [];
				if (Array.isArray(val)) {
					allNotifs = val.map((n, idx) => n ? { ...n, _index: idx } : null).filter(Boolean);
				} else if (typeof val === 'object') {
					allNotifs = Object.entries(val).map(([key, n]) => n ? { ...n, _index: Number(key) } : null).filter(Boolean);
				}
				
				notifications = allNotifs
					.filter(n => n.recipientEmail.toLowerCase() === student.email.toLowerCase())
					.sort((a, b) => new Date(b.date) - new Date(a.date));
			} else {
				notifications = [];
			}
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	let activeIndex = $state(null);

	async function markRead(idx) {
		const notif = notifications[idx];
		if (!notif.read && notif._index !== undefined) {
			const updates = {};
			updates[`notifications/${notif._index}/read`] = true;
			await update(ref(db), updates);
			window.dispatchEvent(new Event('storage'));
		}
	}

	async function markAllRead() {
		const unreadNotifs = notifications.filter(n => !n.read);
		if (unreadNotifs.length > 0) {
			const updates = {};
			unreadNotifs.forEach(n => {
				if (n._index !== undefined) {
					updates[`notifications/${n._index}/read`] = true;
				}
			});
			await update(ref(db), updates);
			window.dispatchEvent(new Event('storage'));
		}
	}

	async function toggleDetails(index) {
		if (activeIndex === index) {
			activeIndex = null;
		} else {
			activeIndex = index;
			await markRead(index);
		}
	}
</script>

<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
	<div>
		<h1 class="font-display font-black text-3xl text-slate-900 tracking-tight">
			Interactive Alert Inbox
		</h1>
		<p class="text-sm text-slate-500 mt-1">
			Nexora email simulation inbox. Check automated emails, alerts, and registration notifications.
		</p>
	</div>

	{#if notifications.some(n => !n.read)}
		<button 
			onclick={markAllRead}
			class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0"
		>
			Mark All Read
		</button>
	{/if}
</div>

{#if notifications.length === 0}
	<div class="p-12 rounded-3xl bg-white border border-slate-200 text-center flex flex-col items-center">
		<div class="h-12 w-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-4">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="M2 9.5 12 14l10-4.5"/></svg>
		</div>
		<p class="text-sm font-semibold text-slate-650">Inbox is empty</p>
		<p class="text-xs text-slate-500 mt-1">When automated triggers run, copies will appear here.</p>
	</div>
{:else}
	<div class="space-y-3">
		{#each notifications as notif, idx}
			{@const isCritical = notif.subject.toLowerCase().includes('fraud') || notif.subject.toLowerCase().includes('critical') || notif.subject.toLowerCase().includes('warning') || notif.subject.toLowerCase().includes('reject')}
			{@const isSuccess = notif.subject.toLowerCase().includes('welcome') || notif.subject.toLowerCase().includes('approved') || notif.subject.toLowerCase().includes('success') || notif.subject.toLowerCase().includes('hired')}
			
			<div class="rounded-2xl bg-white border transition-all duration-300 overflow-hidden {activeIndex === idx ? 'border-indigo-500 shadow-md' : 'border-slate-200 '}">
				<!-- Summary Row -->
				<div class="w-full p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition duration-150">
					<button
						onclick={() => toggleDetails(idx)}
						class="flex-grow text-left flex items-start gap-3.5 focus:outline-none cursor-pointer"
					>
						<!-- Type-specific Icon -->
						<div class="h-10 w-10 rounded-full flex items-center justify-center shrink-0 {isCritical ? 'bg-rose-50 text-rose-600' : isSuccess ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}">
							{#if isCritical}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12" y1="17" y2="17"/></svg>
							{:else if isSuccess}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
							{:else}
								<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
							{/if}
						</div>

						<div class="min-w-0 flex-grow pt-0.5">
							<div class="flex items-center gap-2 flex-wrap">
								<span class="text-[10px] font-bold uppercase tracking-wider {isCritical ? 'text-rose-600' : isSuccess ? 'text-emerald-600' : 'text-indigo-600'}">
									{isCritical ? 'CRITICAL ALERT' : isSuccess ? 'Confirmation' : 'System Mail'}
								</span>
								<span class="text-[10px] text-slate-400 font-semibold">{new Date(notif.date).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
							</div>

							<h3 class="font-display font-bold text-sm text-slate-900 mt-1 truncate">
								{notif.subject}
							</h3>
						</div>
					</button>

					<!-- Right Badges / Read triggers -->
					<div class="flex items-center gap-3 shrink-0">
						{#if !notif.read}
							<span class="h-2.5 w-2.5 rounded-full bg-blue-600" title="Unread notification"></span>
							<button 
								onclick={() => markRead(idx)}
								class="px-2.5 py-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition rounded-lg cursor-pointer"
							>
								Mark Read
							</button>
						{/if}
						
						<button
							onclick={() => toggleDetails(idx)}
							class="text-slate-400 p-1 rounded-lg hover:bg-slate-100 transition duration-150 cursor-pointer"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="transform transition duration-200 {activeIndex === idx ? 'rotate-90' : ''}"><path d="m9 18 6-6-6-6"/></svg>
						</button>
					</div>
				</div>

				<!-- Detail Drawer -->
				{#if activeIndex === idx}
					<div class="px-5 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50 text-xs md:text-sm text-slate-700 leading-relaxed font-sans whitespace-pre-line">
						{notif.body}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
