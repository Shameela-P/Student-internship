<script>
	import { enhance } from '$app/forms';
	import { onMount, onDestroy } from 'svelte';
	import { getDatabase, ref, onValue, update } from 'firebase/database';
	import { app } from '$lib/firebase';

	let { data, form } = $props();

	let messages = $state([]);
	const contacts = $derived(data.contacts);
	const adminEmail = 'admin@nexora.com';

	let activeEmail = $state(null);
	let messageText = $state('');
	let showNewChatModal = $state(false);
	let newChatQuery = $state('');

	let unsubscribe = null;
	const db = getDatabase(app);

	onMount(() => {
		const msgsRef = ref(db, 'messages');
		unsubscribe = onValue(msgsRef, (snapshot) => {
			const val = snapshot.val();
			if (val) {
				let allMsgs = [];
				if (Array.isArray(val)) {
					allMsgs = val.map((m, idx) => m ? { ...m, _index: idx } : null).filter(Boolean);
				} else if (typeof val === 'object') {
					allMsgs = Object.entries(val).map(([key, m]) => m ? { ...m, _index: Number(key) } : null).filter(Boolean);
				}
				
				messages = allMsgs.filter(m => 
					m.senderEmail.toLowerCase() === adminEmail.toLowerCase() || 
					m.recipientEmail.toLowerCase() === adminEmail.toLowerCase()
				);

				if (activeEmail) {
					markActiveThreadAsRead(activeEmail, messages);
				}
			} else {
				messages = [];
			}
		});

		const stored = localStorage.getItem(`drafts_${adminEmail}`);
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

	function markActiveThreadAsRead(email, currentMessages) {
		const unreadMsgs = currentMessages.filter(m => 
			m.senderEmail.toLowerCase() === email.toLowerCase() && 
			m.recipientEmail.toLowerCase() === adminEmail.toLowerCase() && 
			!m.read
		);

		if (unreadMsgs.length > 0) {
			const updates = {};
			unreadMsgs.forEach(m => {
				if (m._index !== undefined) {
					updates[`messages/${m._index}/read`] = true;
				}
			});
			update(ref(db), updates).then(() => {
				window.dispatchEvent(new Event('storage'));
			});
		}
	}

	const threads = $derived.by(() => {
		const map = new Map();
		messages.forEach(m => {
			const isSender = m.senderEmail.toLowerCase() === adminEmail.toLowerCase();
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

	const activeThread = $derived(threads.find(t => t.email.toLowerCase() === activeEmail?.toLowerCase()));

	$effect(() => {
		if (threads.length > 0 && !activeEmail) {
			selectThread(threads[0].email);
		}
	});

	let chatContainer = $state(null);
	
	const activeMessages = $derived(
		messages.filter(m => 
			(m.senderEmail.toLowerCase() === adminEmail.toLowerCase() && m.recipientEmail.toLowerCase() === activeEmail?.toLowerCase()) ||
			(m.senderEmail.toLowerCase() === activeEmail?.toLowerCase() && m.recipientEmail.toLowerCase() === adminEmail.toLowerCase())
		).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
	);

	$effect(() => {
		if (activeMessages.length && chatContainer) {
			setTimeout(() => {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}, 50);
		}
	});

	function saveDrafts() {
		localStorage.setItem(`drafts_${adminEmail}`, JSON.stringify(drafts));
	}

	function selectThread(email) {
		if (activeEmail) {
			drafts[activeEmail] = messageText;
		}
		activeEmail = email;
		messageText = drafts[email] || '';
		saveDrafts();
		markActiveThreadAsRead(email, messages);
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
			const formElement = e.currentTarget.closest('form');
			if (messageText.trim() && formElement) {
				formElement.requestSubmit();
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

<div class="grow flex flex-col md:flex-row h-[78vh] rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
	
	<!-- Conversations Sidebar -->
	<div class="w-full md:w-80 border-r border-slate-200 bg-slate-50 flex flex-col justify-between shrink-0">
		<div class="flex flex-col h-full">
			<div class="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
				<h2 class="font-display font-bold text-lg text-slate-900">Inbox</h2>
				<button 
					onclick={() => { showNewChatModal = true; newChatQuery = ''; }}
					class="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition cursor-pointer"
					title="Start Conversation"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
				</button>
			</div>

			<!-- Threads List -->
			<div class="divide-y divide-slate-150 overflow-y-auto grow">
				{#if threads.length === 0}
					<div class="p-8 text-center text-slate-500 text-xs font-semibold">
						No active message threads yet. Click the edit icon to compose a chat.
					</div>
				{:else}
					{#each threads as thread}
						<button
							onclick={() => selectThread(thread.email)}
							class="w-full text-left p-4 hover:bg-slate-100/80 transition duration-150 flex items-start gap-3 relative focus:outline-none {activeEmail?.toLowerCase() === thread.email.toLowerCase() ? 'bg-white border-l-4 border-indigo-650' : ''}"
						>
							<div class="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold relative shrink-0">
								{thread.name.charAt(0)}
								<span class="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
							</div>
							<div class="min-w-0 grow">
								<div class="flex items-center justify-between">
									<h4 class="text-xs font-bold text-slate-850 truncate">{thread.name}</h4>
									<span class="text-[9px] text-slate-400 font-semibold">{new Date(thread.lastTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
								</div>
								<p class="text-xs text-slate-500 truncate mt-0.5">{thread.lastMessage}</p>
							</div>

							{#if thread.unreadCount > 0}
								<span class="absolute top-4 right-4 h-4 w-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[9px] font-bold">
									{thread.unreadCount}
								</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</div>

	<!-- Main Chat Panel -->
	<div class="grow flex flex-col bg-white">
		{#if activeEmail}
			<!-- Header -->
			<div class="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
				<div class="flex items-center gap-3">
					<div class="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
						{activeThread?.name?.charAt(0) || activeEmail.charAt(0).toUpperCase()}
					</div>
					<div>
						<h3 class="font-display font-bold text-sm text-slate-900">{activeThread?.name || activeEmail}</h3>
						<span class="inline-flex items-center gap-1 mt-0.5 text-[10px] text-emerald-500 font-bold">
							<span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active Now
						</span>
					</div>
				</div>
			</div>

			<!-- Message Thread list -->
			<div 
				bind:this={chatContainer}
				class="grow p-6 overflow-y-auto space-y-4 bg-white"
			>
				{#if activeMessages.length === 0}
					<div class="h-full flex flex-col items-center justify-center text-center p-8">
						<p class="text-xs text-slate-400 font-semibold">This is the start of your message history with this contact.</p>
					</div>
				{:else}
					{#each activeMessages as msg}
						{@const isMe = msg.senderEmail.toLowerCase() === adminEmail.toLowerCase()}
						<div class="flex {isMe ? 'justify-end' : 'justify-start'}">
							<div class="max-w-[70%]">
								<div class="p-3.5 rounded-2xl text-xs font-semibold leading-relaxed {isMe ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}">
									{msg.content}
								</div>
								<div class="flex items-center gap-1.5 justify-end mt-1 text-[9px] text-slate-400 font-semibold px-1">
									<span>{new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
									{#if isMe}
										{#if msg.read}
											<span class="text-indigo-600">✓✓</span>
										{:else}
											<span>✓</span>
										{/if}
									{/if}
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Footer Input field -->
			<div class="p-4 border-t border-slate-200 bg-slate-50">
				<form
					action="?/sendMessage"
					method="POST"
					use:enhance={() => {
						const currentText = messageText;
						messageText = '';
						if (activeEmail) {
							drafts[activeEmail] = '';
							saveDrafts();
						}
						return async ({ update }) => {
							await update();
						};
					}}
					class="flex items-center gap-3"
				>
					<input type="hidden" name="recipientEmail" value={activeEmail} />
					<input type="hidden" name="recipientRole" value={activeThread?.role || 'student'} />
					<input type="hidden" name="recipientName" value={activeThread?.name || 'User'} />

					<input 
						type="text" 
						name="content"
						placeholder="Write a message..."
						bind:value={messageText}
						oninput={handleMessageInput}
						onkeydown={handleKeydown}
						required
						autocomplete="off"
						class="grow px-4 py-2.5 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500"
					/>
					
					<button 
						type="submit"
						class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center shrink-0 cursor-pointer"
					>
						Send
					</button>
				</form>
			</div>
		{:else}
			<div class="grow flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
				<div class="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
				</div>
				<h3 class="font-display font-bold text-sm text-slate-900">Select a Thread</h3>
				<p class="text-xs text-slate-500 mt-1 max-w-xs">Pick a conversation from the sidebar or click compose to start messaging recruiters or candidates.</p>
			</div>
		{/if}
	</div>
</div>

<!-- Compose Dialog Modal -->
{#if showNewChatModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm" onclick={() => showNewChatModal = false} role="button" tabindex="0" onkeydown={(e) => { if(e.key === 'Escape') showNewChatModal = false; }}>
		<div class="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl relative" onclick={(e) => e.stopPropagation()} role="presentation">
			<button aria-label="Close modal" onclick={() => showNewChatModal = false} class="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
			</button>

			<h3 class="font-display font-bold text-lg text-slate-900 mb-2">Start Conversation</h3>
			
			<div class="mt-4">
				<input 
					type="text" 
					placeholder="Search users or support by name..." 
					bind:value={newChatQuery}
					class="w-full px-3 py-2.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-500"
				/>
			</div>

			<div class="mt-4 max-h-60 overflow-y-auto divide-y divide-slate-100">
				{#each filteredContacts as contact}
					<button 
						onclick={() => startNewChat(contact)}
						class="w-full text-left py-3 px-2 hover:bg-slate-50 rounded-lg transition flex items-center gap-3 cursor-pointer"
					>
						<div class="h-8 w-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
							{contact.name.charAt(0)}
						</div>
						<div>
							<h4 class="text-xs font-bold text-slate-850">{contact.name}</h4>
							<span class="text-[10px] text-slate-500 block capitalize">{contact.role} support</span>
						</div>
					</button>
				{:else}
					<p class="py-4 text-center text-xs text-slate-500 font-semibold">No contacts match your query.</p>
				{/each}
			</div>
		</div>
	</div>
{/if}
