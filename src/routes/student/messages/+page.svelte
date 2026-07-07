<script>
	import { enhance } from '$app/forms';
<<<<<<< HEAD
	import { invalidateAll } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
=======
	import { onMount, onDestroy } from 'svelte';
	import { getDatabase, ref, onValue } from 'firebase/database';
	import { app } from '$lib/firebase';
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8

	let { data, form } = $props();

	const student = $derived(data.student);
	const contacts = $derived(data.contacts);

	// Instead of statically deriving messages, we make it reactive state
	let messages = $state(data.messages || []);
	let activeEmail = $state(null);
	let messageText = $state('');
	let showNewChatModal = $state(false);
	let newChatQuery = $state('');

	// Firebase Realtime Listener setup
	let unsubscribe = null;
	const db = getDatabase(app);

	onMount(() => {
		// Listen to all messages
		const msgsRef = ref(db, 'messages');
		unsubscribe = onValue(msgsRef, (snapshot) => {
			const val = snapshot.val();
			if (val) {
				let allMsgs = [];
				if (Array.isArray(val)) {
					allMsgs = val.filter(item => item !== null);
				} else if (typeof val === 'object') {
					allMsgs = Object.values(val).filter(item => item !== null);
				}
				// Filter for this student
				messages = allMsgs.filter(m => 
					m.senderEmail.toLowerCase() === student.email.toLowerCase() || 
					m.recipientEmail.toLowerCase() === student.email.toLowerCase()
				);
			} else {
				messages = [];
			}
		});

		const stored = localStorage.getItem(`drafts_${student.email}`);
		if (stored) {
			try {
				drafts = JSON.parse(stored);
			} catch(e) {}
		}
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	// Compute threads list (unique contacts that this user has had chat with)
	const threads = $derived.by(() => {
		const map = new Map();
		messages.forEach(m => {
			const isSender = m.senderEmail.toLowerCase() === student.email.toLowerCase();
			const contactEmail = isSender ? m.recipientEmail : m.senderEmail;
			const contactName = isSender ? m.recipientName : m.senderName;
			const contactRole = isSender ? m.recipientRole : m.senderRole;

			const existing = map.get(contactEmail.toLowerCase());
			if (!existing || new Date(m.timestamp) > new Date(existing.lastTimestamp)) {
				map.set(contactEmail.toLowerCase(), {
					email: contactEmail,
					name: contactName,
					role: contactRole,
					lastMessage: m.content || '',
					lastTimestamp: m.timestamp,
					unreadCount: !isSender && !m.read ? 1 : 0
				});
			} else {
				if (!isSender && !m.read) {
					existing.unreadCount += 1;
				}
			}
		});
		return Array.from(map.values()).sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp));
	});

	let drafts = {};

	// Get active thread details
	const activeThread = $derived(threads.find(t => t.email.toLowerCase() === activeEmail?.toLowerCase()));

	// Select the first thread if activeEmail is not set, but handle reactively if it appears
	$effect(() => {
		if (threads.length > 0 && !activeEmail) {
			selectThread(threads[0].email);
		}

		// Polling for real-time chat updates
		const pollInterval = setInterval(() => {
			invalidateAll();
		}, 3000);

		return () => clearInterval(pollInterval);
	});



	// Filter messages for the active conversation
	const activeMessages = $derived(
		messages.filter(m => 
			(m.senderEmail.toLowerCase() === student.email.toLowerCase() && m.recipientEmail.toLowerCase() === activeEmail?.toLowerCase()) ||
			(m.senderEmail.toLowerCase() === activeEmail?.toLowerCase() && m.recipientEmail.toLowerCase() === student.email.toLowerCase())
		).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
	);

	function saveDrafts() {
		localStorage.setItem(`drafts_${student.email}`, JSON.stringify(drafts));
	}

	function selectThread(email) {
		if (activeEmail) {
			drafts[activeEmail] = messageText;
		}
		activeEmail = email;
		messageText = drafts[email] || '';
		saveDrafts();
	}

	function handleMessageInput(e) {
		messageText = e.target.value;
		if (activeEmail) {
			drafts[activeEmail] = messageText;
			saveDrafts();
		}
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			const form = e.currentTarget.closest('form');
			if (messageText.trim()) {
				form.requestSubmit();
			}
		}
	}

	function startNewChat(contact) {
		if (activeEmail) {
			drafts[activeEmail] = messageText;
		}
		activeEmail = contact.email;
		messageText = drafts[contact.email] || '';
		saveDrafts();

		showNewChatModal = false;
		// If thread does not exist, add a temporary thread
		const threadExists = threads.some(t => t.email.toLowerCase() === contact.email.toLowerCase());
		if (!threadExists) {
			activeEmail = contact.email;
		}
	}

	const filteredContacts = $derived(
		contacts.filter(c => 
			c.name.toLowerCase().includes(newChatQuery.toLowerCase()) ||
			c.email.toLowerCase().includes(newChatQuery.toLowerCase())
		)
	);
</script>

<div class="flex-grow flex flex-col md:flex-row h-[78vh] rounded-2xl bg-slate-905 border border-divider dark:border-divider-dark overflow-hidden shadow-2xl">
	
	<!-- Conversations Sidebar -->
	<div class="w-full md:w-80 border-r border-divider dark:border-divider-dark/50 bg-surface dark:bg-surface-dark/40 flex flex-col justify-between shrink-0">
		<div>
			<div class="p-4 border-b border-divider dark:border-divider-dark/50 flex items-center justify-between">
				<h2 class="font-display font-black text-lg text-primary dark:text-primary-dark">Inbox</h2>
				<button 
					onclick={() => { showNewChatModal = true; newChatQuery = ''; }}
					class="p-1.5 rounded-lg hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary dark:text-primary-dark transition cursor-pointer"
					title="Start Conversation"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="shrink-0"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
				</button>
			</div>

			<!-- Threads List -->
			<div class="divide-y divide-slate-850/50 max-h-[68vh] overflow-y-auto">
				{#if threads.length === 0}
					<div class="p-8 text-center text-slate-500 text-xs font-semibold">
						No active message threads yet. Click the edit icon to compose a chat.
					</div>
				{:else}
					{#each threads as thread}
						<button
							onclick={() => selectThread(thread.email)}
							class="w-full text-left p-4 hover:bg-surface dark:bg-surface-dark/50 transition duration-150 flex items-start gap-3 relative focus:outline-none {activeEmail?.toLowerCase() === thread.email.toLowerCase() ? 'bg-slate-900/80 border-l-2 border-blue-500' : ''}"
						>
							<div class="h-9 w-9 rounded-xl bg-slate-950 text-slate-600 dark:text-slate-400 border border-divider dark:border-divider-dark flex items-center justify-center font-display font-black text-sm shrink-0">
								{thread.name.charAt(0)}
							</div>
							<div class="min-w-0 flex-grow">
								<div class="flex items-center justify-between">
									<h4 class="font-display font-bold text-xs text-primary dark:text-primary-dark truncate pr-2">{thread.name}</h4>
									<span class="text-[9px] text-slate-500 font-bold shrink-0">{new Date(thread.lastTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
								</div>
								<p class="text-[10px] text-slate-600 dark:text-slate-400 truncate mt-1 leading-normal">{thread.lastMessage}</p>
							</div>

							{#if thread.unreadCount > 0}
								<span class="absolute top-4 right-4 h-4 w-4 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-black text-primary dark:text-primary-dark animate-pulse">
									{thread.unreadCount}
								</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Current profile indicator at bottom -->
		<div class="p-4 border-t border-divider dark:border-divider-dark/50 bg-slate-900/20 text-slate-500 text-[10px] font-bold">
			Connected as: {student.email}
		</div>
	</div>

	<!-- Conversation Main Body -->
	<div class="flex-grow flex flex-col justify-between bg-slate-950/20">
		{#if activeEmail}
			<!-- Header -->
			<div class="p-4 border-b border-divider dark:border-divider-dark/50 bg-slate-100 dark:bg-slate-900/30 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="h-9 w-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-950 border border-divider dark:border-divider-dark text-blue-400 flex items-center justify-center font-display font-black text-sm">
						{activeThread ? activeThread.name.charAt(0) : activeEmail.charAt(0).toUpperCase()}
					</div>
					<div>
						<h3 class="font-display font-bold text-sm text-primary dark:text-primary-dark">{activeThread ? activeThread.name : activeEmail}</h3>
						<span class="text-[10px] text-blue-400 font-bold uppercase tracking-wider">{activeThread ? activeThread.role : 'Support'}</span>
					</div>
				</div>
			</div>

			<!-- Message list container -->
			<div class="flex-grow p-4 space-y-4 overflow-y-auto max-h-[58vh]">
				{#if activeMessages.length === 0}
					<div class="h-full flex flex-col items-center justify-center text-slate-550 text-xs">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
						</svg>
						Say hello to start the discussion
					</div>
				{:else}
					{#each activeMessages as msg}
						{@const isSelf = msg.senderEmail.toLowerCase() === student.email.toLowerCase()}
						<div class="flex {isSelf ? 'justify-end' : 'justify-start'}">
							<div class="max-w-[70%]">
								<!-- Message Bubble -->
								<div class="p-3.5 rounded-2xl text-xs leading-relaxed {isSelf ? 'bg-blue-600 text-primary dark:text-primary-dark rounded-tr-none' : 'bg-slate-900 border border-divider dark:border-divider-dark text-slate-200 rounded-tl-none'}">
									<p class="whitespace-pre-wrap">{msg.content}</p>

									<!-- Attachment Fallback for legacy messages -->
									{#if msg.attachmentPath}
										<div class="mt-2 text-xs italic text-slate-500 opacity-70">
											Attachment unavailable
										</div>
									{/if}
								</div>
								<!-- Date -->
								<span class="text-[9px] text-slate-500 mt-1 block {isSelf ? 'text-right' : 'text-left'} font-semibold">
									{new Date(msg.timestamp).toLocaleString()}
								</span>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<form
				action="?/sendMessage"
				method="POST"
				enctype="multipart/form-data"
				use:enhance={() => {
					if (activeEmail) {
						drafts[activeEmail] = '';
						saveDrafts();
					}
					messageText = '';
					return ({ update }) => {
						update({ resetForm: true });
					};
				}}
				class="p-4 border-t border-divider dark:border-divider-dark/50 bg-slate-900/20"
			>
				<input type="hidden" name="recipientEmail" value={activeEmail} />
				<input type="hidden" name="recipientRole" value={activeThread ? activeThread.role : 'support'} />
				<input type="hidden" name="recipientName" value={activeThread ? activeThread.name : 'Nexora Admin'} />

				<div class="flex items-end gap-3 bg-slate-100 dark:bg-slate-950/40 border border-divider dark:border-divider-dark rounded-2xl p-2">
					<!-- Text box -->
					<div class="flex-grow min-w-0 flex flex-col gap-1 pl-2">
						<textarea
							name="content"
							bind:value={messageText}
							oninput={handleMessageInput}
							onkeydown={handleKeydown}
							required
							rows="1"
							placeholder="Type your message here..."
							class="w-full bg-transparent text-xs text-primary dark:text-primary-dark placeholder-slate-500 focus:outline-none max-h-20 py-1 resize-none"
						></textarea>
					</div>

					<!-- Send Button -->
					<button
						type="submit"
						class="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-primary dark:text-primary-dark font-bold text-xs transition cursor-pointer shrink-0"
					>
						Send
					</button>
				</div>
			</form>
		{:else}
			<div class="flex-grow flex flex-col items-center justify-center text-slate-500 text-xs">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-3 text-slate-650" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
				</svg>
				Select a conversation from the sidebar to view chat messages
			</div>
		{/if}
	</div>
</div>

<!-- Start Conversation Drawer / Modal -->
{#if showNewChatModal}

	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm" onclick={() => showNewChatModal = false} role="button" tabindex="0" onkeydown={(e) => { if(e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') showNewChatModal = false; }}>
		<div
			class="w-full max-w-md rounded-2xl bg-slate-900 border border-divider dark:border-divider-dark p-6 shadow-2xl relative max-h-[80vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
			role="presentation"
			onkeydown={(e) => e.stopPropagation()}
		>
<<<<<<< HEAD
			<button onclick={() => showNewChatModal = false} aria-label="Close modal" class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white cursor-pointer transition">
=======
			<button onclick={() => showNewChatModal = false} class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-primary dark:text-primary-dark cursor-pointer transition">
>>>>>>> 5d366a2a4dc395f3384571ee5f12913df8f6d8b8
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
			</button>

			<h3 class="font-display font-bold text-lg text-primary dark:text-primary-dark mb-4">Start Conversation</h3>
			
			<div class="relative mb-4">
				<input
					type="text"
					bind:value={newChatQuery}
					placeholder="Search contact by name or email..."
					class="w-full pl-9 pr-4 py-2.5 rounded-xl border border-divider dark:border-divider-dark bg-slate-100 dark:bg-slate-950/40 text-xs text-primary dark:text-primary-dark focus:outline-none focus:border-blue-500"
				/>
				<svg class="absolute left-3 top-3.5 h-3.5 w-3.5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="11" cy="11" r="8" stroke-width="2"/><line x1="21" x2="16.65" y1="21" y2="16.65" stroke-width="2" stroke-linecap="round"/></svg>
			</div>

			<div class="space-y-1 divide-y divide-slate-850/50">
				{#each filteredContacts as contact}
					<button
						onclick={() => startNewChat(contact)}
						class="w-full text-left py-3 px-2 rounded-lg hover:bg-slate-950/30 flex items-center gap-3 transition cursor-pointer text-xs"
					>
						<div class="h-8 w-8 rounded-lg bg-slate-950 border border-divider dark:border-divider-dark/50 flex items-center justify-center font-display font-black text-slate-600 dark:text-slate-400">
							{contact.name.charAt(0)}
						</div>
						<div class="min-w-0 flex-grow">
							<h4 class="font-display font-bold text-primary dark:text-primary-dark truncate">{contact.name}</h4>
							<span class="text-[10px] text-slate-500 block truncate">{contact.email} • <strong class="text-blue-400 uppercase tracking-wider">{contact.role}</strong></span>
						</div>
					</button>
				{:else}
					<div class="py-6 text-center text-slate-500 text-xs font-semibold">
						No verified contacts found matching your query
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
