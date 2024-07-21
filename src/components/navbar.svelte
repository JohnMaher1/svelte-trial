<script lang="ts">
	import ThemeSwitch from './theme-switch.svelte';
</script>

<nav
	class="flex h-[var(--navbar-height)] w-full items-center justify-between border-b-2 px-4 shadow-md dark:bg-secondary"
>
	<div class="flex items-center space-x-4">
		<a href="/" class="text-lg font-bold">Home</a>
		<a href="/about" class="">About</a>
		<a href="/shopping-cart" class="">Shopping Cart</a>
	</div>
	<div class="flex items-end space-x-4">
		<ThemeSwitch />
	</div>
</nav>
