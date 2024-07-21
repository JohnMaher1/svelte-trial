<script lang="ts">
	import type { CartProduct } from '$lib/types';
	import CartItem from '../../components/cart-item.svelte';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import X from 'lucide-svelte/icons/X';

	let { data } = $props();

	let cartOpen = $state(false);
	let cartProducts = $state<CartProduct[]>([]);

	const cartStats = $derived.by(() => {
		let total = 0;
		let quantity = 0;
		for (const cartProduct of cartProducts) {
			quantity += cartProduct.quantity;
			total += cartProduct.quantity * cartProduct.product.price;
		}
		return {
			total,
			quantity
		};
	});

	const removeFromCart = (id: string) => {
		cartProducts = cartProducts.filter((cartProduct) => cartProduct.id !== id);
	};

	let freeShippingAlertAcount = 0;
	const qualifiesForFreeShipping = $derived(cartStats.total > 50);

	$effect(() => {
		if (freeShippingAlertAcount > 0) return;
		if (qualifiesForFreeShipping) {
			alert('You have reached the free shipping threshold!');
			freeShippingAlertAcount++;
		}
	});
</script>

<div class="flex items-center p-4">
	<span class="text-lg font-bold">SvelteMart</span>
	<div class="relative ml-auto flex items-center">
		<button onclick={() => (cartOpen = !cartOpen)} class="flex items-center rounded-full px-4 py-2">
			<ShoppingCart class="mr-2 size-5" />
			<span>Cart ({cartStats.quantity})</span>
		</button>
		{#if cartOpen}
			<div class="absolute right-0 top-8 z-10 mt-2 w-80 rounded-lg bg-secondary shadow-xl">
				<div class="relative p-4">
					<h2 class="mb-4 text-lg font-semibold">Your Cart</h2>
					<button class="absolute right-4 top-4 rounded-full p-1">
						<X class="size-4" onclick={() => (cartOpen = false)} />
					</button>
					{#each cartProducts as _, i}
						<CartItem bind:cartProduct={cartProducts[i]} removeItem={removeFromCart} />
					{/each}
					<div class="mt-4 pt-4">
						<p class="text-lg font-semibold">Total: ${cartStats.total.toFixed(2)}</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<div class="grid grid-cols-1 gap-6 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	{#each data.products as product}
		<div class="overflow-hidden rounded-xl bg-primary bg-opacity-5 shadow-sm shadow-border">
			<img src={product.thumbnail} alt={product.title} class="h-48 w-full object-cover" />
			<div class="p-4">
				<p class="mb-2 overflow-hidden truncate text-lg font-medium">
					{product.title}
				</p>
				<div class="flex items-center justify-between">
					<p class="text-xl font-bold">${product.price}</p>
					<button
						onclick={() => {
							cartProducts.push({
								id: crypto.randomUUID(),
								product: product,
								quantity: 1
							});
						}}
						class="rounded-full px-4 py-2 transition-colors duration-300 hover:bg-primary hover:text-background"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>
