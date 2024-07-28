<script lang="ts">
	import { onMount } from 'svelte';
	import type { SessionData } from '../+layout';
	import { Card } from '$libshadui/components/ui/card';
	import { goto } from '$app/navigation';

	type Profile = {
		user_id: any;
		description: any;
		pokemon_ids: any;
		username: any;
	};

	type Props = SessionData & {
		profiles: Profile[];
	};

	const { data }: Props = $props();
	const { user, session, supabase, profiles } = data;

	const goToProfile = (profile: Profile) => {
		goto(`/community/${profile.user_id}`);
	};
</script>

<div class="flex h-[var(--container-height)] flex-col items-center">
	<p class="mb-4 mt-4 text-3xl font-bold">Community</p>
	<p class="text-lg">Checkout some users pages to see their favorite Pokemon!</p>
	<div class="grid grid-cols-1 items-center gap-2 lg:grid-cols-2 xl:grid-cols-3">
		{#each profiles as profile}
			<Card onclick={() => goToProfile(profile)} class="mt-4 cursor-pointer p-4">
				<div class="w-100 flex h-24 flex-col items-center">
					<div class="text-center text-xl font-bold">{profile.username}</div>
				</div></Card
			>
		{/each}
	</div>
</div>
