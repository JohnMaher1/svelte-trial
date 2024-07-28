<script lang="ts">
	import type { DiscordUserMetaData } from '$lib/types';
	import { user } from '$lib/user-store';
	import { Card } from '$libshadui/components/ui/card';
	import type { User } from '@supabase/supabase-js';
	import * as Avatar from '$libshadui/components/ui/avatar';
	import UserIcon from 'lucide-svelte/icons/user';
	import type { SessionProps } from '../../+layout';
	let { session, supabase }: SessionProps = $props();
	let userData: User | undefined = $state();
	let userMetaData: DiscordUserMetaData | undefined = $state();
	user.subscribe((value) => {
		if (value !== null && value.data.user !== null) {
			userData = value.data.user;
			userMetaData = value.data.user.user_metadata as DiscordUserMetaData;
		}
	});
</script>

{#if userData && userMetaData}
	<div class="absolute flex w-full justify-end">
		<Avatar.Root class="mr-4 mt-4">
			<Avatar.Image src={userMetaData.picture} alt="Pofile Picture" />
			<Avatar.Fallback><UserIcon /></Avatar.Fallback>
		</Avatar.Root>
	</div>
	<div class="flex h-[var(--container-height)] flex-col items-center justify-center">
		<div class="flex flex-col items-center">
			<h3 class="text-5xl">{userMetaData.custom_claims.global_name}'s Page</h3>
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
	</div>
{/if}
