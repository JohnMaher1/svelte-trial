<script lang="ts">
	import Button from '$libshadui/components/ui/button/button.svelte';
	import { onMount } from 'svelte';

	let { data } = $props(); // data is a keyword for export from server
	let randomWord: string | undefined = $state();
	let isLoadingRandomWord: boolean = $state(true);
	onMount(async () => {
		getNewRandomWord();
	});

	const getNewRandomWord = async () => {
		try {
			isLoadingRandomWord = true;
			const res = await fetch('https://random-word-api.herokuapp.com/word');
			const json = await res.json();
			randomWord = json[0];
		} catch (error) {
			console.error(error);
		} finally {
			isLoadingRandomWord = false;
		}
	};
</script>

<div class="flex h-[var(--container-height)] flex-col">
	<div class="flex flex-1 flex-col items-center justify-center gap-6">
		<h2>Server message: <strong>{data.serverMessage}</strong></h2>
		{#if randomWord === undefined || isLoadingRandomWord}
			<p>Loading random word...</p>
		{:else}
			<h2>Random word: <strong>{randomWord}</strong></h2>
			<Button on:click={getNewRandomWord}>Get new random word</Button>
		{/if}
	</div>
</div>
