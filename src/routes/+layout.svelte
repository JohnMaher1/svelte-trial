<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '../components/navbar.svelte';
	import { onMount } from 'svelte';
	import type { SessionData } from './+layout';

	const { data }: SessionData = $props();
	let { user, session, supabase } = $state(data);

	const logOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Sign out error', error.message);
		} else {
			user = null;
			session = null;
			goto('/');
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
<slot />
