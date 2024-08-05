<script lang="ts">
	import { toPascalCase } from '$lib/helpers/string.helpers';
	import { getPokemonByName } from '$lib/pokemonAPI';
	import { Card } from '$libshadui/components/ui/card';
	import type { Pokemon } from 'pokenode-ts';
	import { onMount } from 'svelte';
	import Spinner from '../../../components/spinner.svelte';
	const { data } = $props();
	const { profile } = data;

	let pokemonData: Pokemon[] = $state([]);
	let pokemonDataLoaded: boolean = $state(false);

	onMount(async () => {
		await refreshPokemonData();
	});

	const refreshPokemonData = async () => {
		pokemonDataLoaded = false;
		pokemonData = [];
		await Promise.all(
			profile.pokemon_ids.map(async (id: number) => {
				const pokemon = await getPokemonByName(id.toString());
				if (pokemonData.length === 0) {
					pokemonData = [pokemon];
				} else {
					pokemonData.push(pokemon);
				}
			})
		);
		pokemonDataLoaded = true;
	};
</script>

<div class="flex h-[var(--container-height)] flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<h3 class="text-5xl">{profile.username}'s Page</h3>
		<p class="pt-4">{profile.description}</p>
		{#if pokemonDataLoaded === false}
			<div class="pt-8">
				<Spinner size="xl" />
			</div>
		{:else}
			<div class="grid grid-cols-3 gap-4">
				{#each pokemonData as pokemon}
					<Card class="mt-4 p-8">
						<div class="w-100 flex h-60 w-40 flex-col items-center">
							<img src={pokemon.sprites.front_default} alt="pokemon" class="mx-auto h-24 w-24" />
							<div class="text-xl font-bold">{toPascalCase(pokemon.name)}</div>
							<div class="text-primary">
								{pokemon.types
									.map((type) => {
										return toPascalCase(type.type.name);
									})
									.join(' | ')}
							</div>
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	</div>
</div>
