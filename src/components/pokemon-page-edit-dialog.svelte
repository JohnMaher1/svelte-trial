<script lang="ts">
	import type { PokemonProfile } from '$lib/types';
	import { Button } from '$libshadui/components/ui/button';
	import * as Dialog from '$libshadui/components/ui/dialog';
	import { Textarea } from '$libshadui/components/ui/textarea';
	import type { NamedAPIResource } from 'pokenode-ts';
	import { toPascalCase } from '$lib/helpers/string.helpers';
	let {
		isOpen,
		onClose,
		pokemonList,
		pokemonProfile,
		togglePokemon,
		onSave
	}: {
		isOpen: boolean;
		onClose: () => void;
		pokemonList: NamedAPIResource[];
		pokemonProfile: PokemonProfile;
		togglePokemon: (id: number) => void;
		onSave: () => void;
	} = $props();

	let search = $state('');

	console.log(pokemonProfile);

	const onOpenChange = () => {
		search = '';
		if (isOpen) {
			onClose();
		}
	};
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={() => onOpenChange()}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit your Pokemon Profile!</Dialog.Title>
			<Dialog.Description>
				<p class="py-4 font-bold">Edit your description</p>
				<Textarea bind:value={pokemonProfile.description} class="h-20" />

				<p class="pt-4 font-bold">Select your 3 favorite Pokemon:</p>
				<p class="text-sm font-semibold">
					Currently selected: {pokemonList
						.filter((_, i) => pokemonProfile.pokemon_ids.includes(i + 1))
						.flatMap((x) => `${toPascalCase(x.name)}`)
						.join(' | ')}
				</p>
				<p class="pb-2 pt-4 font-bold">Search</p>
				<Textarea bind:value={search} class="h-10" />
				<div class="min-h-[300px]">
					<div class="mt-4 grid max-h-[300px] grid-cols-3 overflow-y-scroll">
						{#each pokemonList as pokemon, index}
							{#if pokemon.name.includes(search)}
								<button
									onclick={() => togglePokemon(index + 1)}
									class={`mx-1 my-1 h-10 cursor-pointer rounded-lg border-2 border-transparent bg-secondary p-2 text-center shadow-md ${
										pokemonProfile.pokemon_ids.includes(index + 1)
											? 'box-border border-black dark:border-primary-foreground'
											: ''
									}`}
								>
									<span class="font-bold">{toPascalCase(pokemon.name)}</span>
								</button>
							{/if}
						{/each}
					</div>
				</div>
				<Button
					onclick={() => {
						onSave();
						onClose();
					}}
					class="mt-4 w-full">Save Edits</Button
				>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
