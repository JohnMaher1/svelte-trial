<script lang="ts">
	import { goto, invalidate, invalidateAll } from '$app/navigation';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '../components/navbar.svelte';
	import { onMount, type Snippet } from 'svelte';
	import type { SessionData } from './+layout';

	type props = SessionData & {
		children: Snippet;
	};

	const { data, children }: props = $props();
	let { user, session, supabase } = $state(data);

	supabase.auth.onAuthStateChange(async (event, session) => {
		if (event === 'SIGNED_IN') {
			invalidateAll();
		} else if (event === 'SIGNED_OUT') {
			user = null;
			session = null;
			window.location.href = '/';
			goto('/');
			invalidateAll();
		}
	});

	const logOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Sign out error', error.message);
		}
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Navbar {user} {logOut} />

<ModeWatcher />
{@render children()}
