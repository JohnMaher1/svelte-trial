<script lang="ts">
	import { getPokemonByName, getPokemonList } from '$lib/pokemonAPI';
	import type { DiscordUserMetaData, PokemonProfile } from '$lib/types';
	import * as Avatar from '$libshadui/components/ui/avatar';
	import Button from '$libshadui/components/ui/button/button.svelte';
	import { Card } from '$libshadui/components/ui/card';
	import UserIcon from 'lucide-svelte/icons/user';
	import type { NamedAPIResource, Pokemon } from 'pokenode-ts';
	import { onDestroy, onMount } from 'svelte';
	import type { SessionData } from '../+layout';
	import PokemonPageEditDialog from '../../components/pokemon-page-edit-dialog.svelte';
	import Spinner from '../../components/spinner.svelte';
	import { toPascalCase } from '$lib/helpers/string.helpers';

	const { data }: SessionData = $props();
	const { user, session, supabase } = data;
	const userMetaData = user!.user_metadata as DiscordUserMetaData;

	let pokemonList: NamedAPIResource[] = $state([]);
	let pokemonData: Pokemon[] = $state([]);
	let pokemonProfile: PokemonProfile = $state({
		description: '',
		pokemon_ids: []
	});
	let pokemonDataLoaded: boolean = $state(false);

	let editPokemonDialogOpen: boolean = $state(false);
	let onEditPokemonDialogClose = () => {
		editPokemonDialogOpen = false;
	};

	const refreshPokemonData = async () => {
		pokemonDataLoaded = false;
		pokemonData = [];
		await Promise.all(
			pokemonProfile.pokemon_ids.map(async (id: number) => {
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

	onMount(async () => {
		pokemonList = await getPokemonList();

		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('description, pokemon_ids')
			.eq('user_id', user?.id);
		console.log(profileData);
		if (profileError) {
			throw new Error(profileError.message);
		}
		if (profileData?.length === 0) {
			await saveProfile();
		} else if (profileData && profileData.length > 0) {
			pokemonProfile = profileData[0];
		}

		await refreshPokemonData();
	});

	const saveProfile = async () => {
		const { data: profileData, error: profileError } = await supabase
			.from('profiles')
			.select('description, pokemon_ids')
			.eq('user_id', user?.id);

		if (profileError) {
			throw new Error(profileError.message);
		}
		if (profileData?.length === 0) {
			// Create
			await supabase.from('profiles').insert([
				{
					user_id: user?.id,
					username: userMetaData.custom_claims?.global_name ?? userMetaData.name,
					description: pokemonProfile.description,
					pokemon_ids: pokemonProfile.pokemon_ids
				}
			]);
		} else {
			// Update
			await supabase
				.from('profiles')
				.update([
					{
						description: pokemonProfile.description,
						pokemon_ids: pokemonProfile.pokemon_ids
					}
				])
				.eq('user_id', user?.id);
		}
	};

	const togglePokemon = (id: number) => {
		console.log(id);
		const index = pokemonProfile.pokemon_ids.indexOf(id);
		if (index !== -1) {
			pokemonProfile.pokemon_ids.splice(index, 1);
			return;
		}
		if (index === -1 && pokemonProfile.pokemon_ids.length < 3) {
			pokemonProfile.pokemon_ids.push(id);
		} else {
			alert('You can only select 3 Pokemon');
			return;
		}
	};

	const savePageEdits = async () => {
		await saveProfile();
		await refreshPokemonData();
	};

	onDestroy(() => {});
</script>

{#if user}
	<div class="flex h-[var(--container-height)] flex-col items-center justify-center">
		<div class="flex flex-col items-center">
			<h3 class="text-5xl">
				{userMetaData.custom_claims?.global_name ?? userMetaData.full_name}'s Page
			</h3>
			<Avatar.Root class="mt-4">
				<Avatar.Image src={userMetaData.picture} alt="Pofile Picture" />
				<Avatar.Fallback><UserIcon /></Avatar.Fallback>
			</Avatar.Root>
			<p class="pt-4">{pokemonProfile.description}</p>

			{#if pokemonDataLoaded}
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
			{:else}
				<div class="grid- flex items-center justify-center pt-4">
					<Spinner size="md" />
				</div>
			{/if}
		</div>

		<Button
			class="mt-4"
			onclick={() => {
				editPokemonDialogOpen = true;
			}}>Edit Profile</Button
		>
	</div>
{/if}

<PokemonPageEditDialog
	isOpen={editPokemonDialogOpen}
	onClose={() => {
		onEditPokemonDialogClose();
	}}
	{pokemonList}
	{pokemonProfile}
	{togglePokemon}
	onSave={savePageEdits}
/>
