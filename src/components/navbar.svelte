<script lang="ts">
	import type { User } from '@supabase/supabase-js';
	import ThemeSwitch from './theme-switch.svelte';
	const prefix = 'private';
	let { user, logOut }: { user: User | null; logOut: () => void } = $props();
</script>

<nav
	class="flex h-[var(--navbar-height)] w-full items-center justify-between border-b-2 px-4 shadow-md dark:bg-secondary"
>
	<div class="flex items-center space-x-4">
		{#if user}
			<a href={`/${prefix}`} class="text-lg font-bold">Home</a>
			<a href={`/${prefix}/shopping-cart`} class="">Shopping Cart</a>
			<a href={`/${prefix}/poke-page`} class="">Pokepage</a>
			<a href={`/${prefix}/form`} class="">Form</a>
		{/if}
	</div>

	<div class="flex items-end space-x-4">
		{#if user}
			<button onclick={() => (logOut !== undefined ? logOut() : null)} class="self-center"
				>Logout</button
			>
		{/if}

		<ThemeSwitch />
	</div>
</nav>
