<script lang="ts">
	import ThemeSwitch from './theme-switch.svelte';
</script>

<nav
	class="flex h-[var(--navbar-height)] w-full items-center justify-between border-b-2 px-4 shadow-md dark:bg-secondary"
>
	<div class="flex items-center space-x-4">
		<a href="/" class="text-lg font-bold">Home</a>
		<a href="/shopping-cart" class="">Shopping Cart</a>
		<a href="/poke-page" class="">Pokepage</a>
		<a href="/user" class="">User</a>
	</div>
	<div class="flex items-end space-x-4">
		<a href="/login" class="self-center">Login</a>
		<ThemeSwitch />
	</div>
</nav>
