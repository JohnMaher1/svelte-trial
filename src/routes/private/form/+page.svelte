<script lang="ts">
	import type { FormSchema } from '$lib/forms/schema';
	import * as Tabs from '$libshadui/components/ui/tabs/index.js';
	import { type Infer, type SuperValidated } from 'sveltekit-superforms';
	import Form from '../../../components/form.svelte';

	type TabValues = 'form' | 'checklist' | 'settings';
	const form: TabValues = 'form';
	const checklist: TabValues = 'checklist';
	const settings: TabValues = 'settings';
	const t: number = $state(0);
	let selectedValue: TabValues = $state(form);
	//let selectedTab: TabValues | undefined = form;

	const { data, form: formm } = $props();

	let formData: SuperValidated<Infer<FormSchema>> = $state({
		data: {
			email: '',
			password: '',
			age: 1,
			rememberMe: false,
			terms: false,
			username: '',
			role: ''
		},
		id: 'form',
		errors: {},
		posted: false,
		valid: false
	});
	//export { formData };

	function handleFormSubmit(event: SubmitEvent) {
		const val: HTMLFormElement = event.target as HTMLFormElement;
		// Prevent default form submission behavior
		event.preventDefault();

		// Assuming the action returns a message or form errors
		const formData = new FormData(val);
		fetch(val.action, {
			method: 'POST',
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.form && data.form.valid) {
					//message = 'Form submitted successfully!';
				} else {
					//message = 'Validation failed.';
					// Handle validation errors
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<div class="h-full w-full">
	{#if formData.errors}
		{#each Object.entries(formData.errors) as [key, value]}
			<p>{key}: {value}</p>
		{/each}
	{/if}
	<Tabs.Root class="p-8" bind:value={selectedValue}>
		<Tabs.List class="grid w-full grid-cols-3 gap-1">
			<Tabs.Trigger value={form}>Form</Tabs.Trigger>
			<Tabs.Trigger value={checklist}>Check List</Tabs.Trigger>
			<Tabs.Trigger value={settings}>Settings</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value={form}>
			<Form bind:data={formData} handleFormSubmit={(event) => handleFormSubmit(event)} />
		</Tabs.Content>
		<Tabs.Content value={checklist}></Tabs.Content>
		<Tabs.Content value={settings}></Tabs.Content>
	</Tabs.Root>
</div>
