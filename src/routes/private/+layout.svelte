<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import type { SessionData } from '../+layout';
	import '../../app.pcss';
	import Navbar from '../../components/navbar.svelte';

	const { data }: SessionData = $props();
	const { user, session, supabase } = data;

	const logOut = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('Sign out error', error.message);
		} else {
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
