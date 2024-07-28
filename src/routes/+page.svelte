<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$libshadui/components/ui/button/button.svelte';

	let userData: User | null = null;

	const { data }: SessionData = $props();
	const { user, session } = data;

	import { goto } from '$app/navigation';
	import type { User } from '@supabase/supabase-js';
	import type { SessionData } from './+layout';
</script>

<div class="flex h-[var(--container-height)] flex-col items-center justify-center">
	{#if session !== null && user !== undefined}
		{goto(`/private`)};
	{:else}
		<div class="flex flex-col items-center gap-4">
			<p class="text-2xl">
				Please sign in to make your own <span class="font-bold">Pokemon Page!</span>
			</p>
			<form method="post" action="?/login">
				<button formaction="?/login">
					<Button class="w-48"
						><div>Login With Discord</div>
						<img class="h-6 w-6 pl-2" src="./discord_icon.svg" alt="Discord Icon" /></Button
					>
				</button>
			</form>
			<p class="pt-12 text-lg">
				...Or visit the <button onclick={() => goto('/community')} class="font-bold underline"
					>Community</button
				> to view other users pages!
			</p>
		</div>
	{/if}
</div>

<!-- <h3 class="text-5xl">{email}'s Page</h3>
<p class="pt-4">User description here...</p>
<div class="flex gap-4">
	<Card class="mt-4 p-8">
		<div class="w-100 flex h-60 w-40 flex-col items-center">
			<img src="" alt="pokemon" class="mx-auto h-24 w-24" />
			<div class="text-xl font-bold">Pikachu</div>
			<div class="text-primary">Electric</div>
		</div>
	</Card>
	<Card class="mt-4 p-8">
		<div class="w-100 flex h-60 w-40 flex-col items-center">
			<img src="" alt="pokemon" class="mx-auto h-24 w-24" />
			<div class="text-xl font-bold">Pikachu</div>
			<div class="text-primary">Electric</div>
		</div>
	</Card> -->
<!-- </div> -->
