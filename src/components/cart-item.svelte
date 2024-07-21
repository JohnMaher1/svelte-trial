<script lang="ts">
	import type { CartProduct } from '$lib/types';
	import Minus from 'lucide-svelte/icons/minus';
	import Plus from 'lucide-svelte/icons/plus';
	import Trash from 'lucide-svelte/icons/trash-2';

	type Props = {
		cartProduct: CartProduct;
		removeItem: (id: string) => void;
	};

	let { cartProduct = $bindable(), removeItem }: Props = $props();
</script>

<div class="flex items-center justify-between py-2">
	<div class="flex items-center">
		<img
			src={cartProduct.product.thumbnail}
			alt="Product"
			class="mr-4 size-12 rounded object-cover"
		/>
		<div>
			<p class="font-medium">{cartProduct.product.title}</p>
			<p class="text-sm">{cartProduct.product.price}</p>
		</div>
	</div>
	<div class="flex items-center">
		<button
			onclick={() => {
				if (cartProduct.quantity === 1) {
					removeItem(cartProduct.id);
				} else {
					cartProduct.quantity -= 1;
				}
			}}
			class="rounded p-1"
			aria-label="Subtract 1 from quantity"
		>
			<Minus class="size-4" />
		</button>
		<span class="mx-2">{cartProduct.quantity}</span>
		<button
			onclick={() => {
				cartProduct.quantity += 1;
			}}
			class="rounded p-1"
			aria-label="Add 1 to quantity"
		>
			<Plus class="size-4" />
		</button>
		<button onclick={() => removeItem(cartProduct.id)} class="ml-4 rounded p-1">
			<Trash class="size-4" />
		</button>
	</div>
</div>
