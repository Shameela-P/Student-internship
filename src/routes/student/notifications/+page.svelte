<script>
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { getDatabase, ref, onValue } from 'firebase/database';
	import { app } from '$lib/firebase';

	let { data } = $props();
	const student = $derived(data.student);

	let notifications = $state(data.notifications || []);
	let unsubscribe = null;
	const db = getDatabase(app);

	onMount(() => {
		const notifRef = ref(db, 'notifications');
		unsubscribe = onValue(notifRef, (snapshot) => {
			const val = snapshot.val();
			if (val) {
				let allNotifs = [];
				if (Array.isArray(val)) {
					allNotifs = val.filter(item => item !== null);
				} else if (typeof val === 'object') {
					allNotifs = Object.values(val).filter(item => item !== null);
				}
				// Filter for this student email
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

	// Accordion state to open/close details
	let activeIndex = $state(null);

	async function toggleDetails(index) {
		if (activeIndex === index) {
			activeIndex = null;
		} else {
			activeIndex = index;
			const notif = notifications[index];
			if (!notif.read) {
				// Optimistically update UI
				notif.read = true;
				try {
					await fetch('/api/notifications/mark-read', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ id: notif.id })
					});
					await invalidateAll(); // Refresh layout badge counts
				} catch (e) {
					console.error('Failed to mark read', e);
				}
			}
		}
	}
</script>

<div class="mb-8">
	<h1 class="font-display font-black text-3xl text-primary dark:text-primary-dark tracking-tight">
		Interactive Alert Inbox
	</h1>
	<p class="text-sm text-muted dark:text-muted-dark mt-1">
		Nexora email simulation inbox. Check automated emails, alerts, and registration notifications.
	</p>
</div>

{#if notifications.length === 0}
	<div class="p-12 rounded-3xl glass border border-slate-200/10 dark:border-slate-800/40 text-center flex flex-col items-center">
		<div class="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 dark:text-slate-500 flex items-center justify-center mb-4">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><path d="M2 9.5 12 14l10-4.5"/></svg>
		</div>
		<p class="text-sm font-semibold text-slate-600 dark:text-slate-400">Inbox is empty</p>
		<p class="text-xs text-slate-600 dark:text-slate-400 mt-1">When automated triggers run, copies will appear here.</p>
	</div>
{:else}
	<div class="space-y-4">
		{#each notifications as notif, idx}
			{@const isFraud = notif.subject.toLowerCase().includes('fraud') || notif.subject.toLowerCase().includes('critical') || notif.subject.toLowerCase().includes('warning')}
			<div class="rounded-2xl glass-card border transition-all duration-200 overflow-hidden {activeIndex === idx ? 'border-indigo-500/25 ring-2 ring-indigo-500/5' : isFraud ? 'border-rose-500/20 bg-rose-500/5' : 'border-slate-200/10 dark:border-slate-800/40'}">
				
				<!-- Summary Row -->
				<button
					onclick={() => toggleDetails(idx)}
					class="w-full text-left p-5 flex items-center justify-between gap-6 hover:bg-slate-200/20 dark:hover:bg-slate-900/20 transition cursor-pointer focus:outline-none"
				>
					<div class="flex-grow min-w-0">
						<div class="flex items-center gap-2 flex-wrap">
							{#if isFraud}
								<span class="px-2 py-0.5 rounded bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[10px] font-black tracking-wider uppercase">
									CRITICAL ALERT
								</span>
							{:else}
								<span class="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase">
									System Mail
								</span>
							{/if}
							<span class="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{new Date(notif.date).toLocaleString()}</span>
						</div>

						<h3 class="font-display font-bold text-sm md:text-base text-primary dark:text-primary-dark mt-2 truncate">
							{notif.subject}
						</h3>
					</div>

					<!-- Toggle Arrow -->
					<div class="text-slate-600 dark:text-slate-400 shrink-0 transform transition duration-200 {activeIndex === idx ? 'rotate-90' : ''}">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
					</div>
				</button>

				<!-- Detail Drawer -->
				{#if activeIndex === idx}
					<div class="px-5 pb-6 pt-2 border-t border-slate-200/5 dark:border-slate-800/10 bg-slate-100/10 dark:bg-slate-900/10 text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
						<!-- Message Body -->
						<div class="whitespace-pre-line text-xs md:text-sm">
							{notif.body}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}
