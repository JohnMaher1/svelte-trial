<script lang="ts">
	import { invalidate } from '$app/navigation';
	import '../app.pcss';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '../components/navbar.svelte';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<Navbar />

<ModeWatcher />
<slot />
