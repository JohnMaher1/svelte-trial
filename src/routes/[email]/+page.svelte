<script lang="ts">
	import { Card } from '$libshadui/components/ui/card';
	import { page } from '$app/stores';
	import Button from '$libshadui/components/ui/button/button.svelte';

	$: email = $page.params.email;

	import { supabase } from '$lib/supabaseClient';

	export const load = async () => {
		const res = await supabase.auth.signInWithOAuth({
			provider: 'discord',
			options: {
				redirectTo: 'http://localhost:5173/auth/callback'
			}
		});
	};
</script>

<Button onclick={() => load()}>Discord Time</Button>

<div class="flex h-[var(--container-height)] flex-col items-center justify-center">
	<h3 class="text-5xl">{email}'s Page</h3>
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
		</Card>
	</div>
</div>
