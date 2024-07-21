<script lang="ts">
	import Navbar from '../components/navbar.svelte';
	import * as Tabs from '$libshadui/components/ui/tabs/index.js';
	import TabsContent from '$libshadui/components/ui/tabs/tabs-content.svelte';
	import Form from '../components/form.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { error } from '@sveltejs/kit';
	import type { FormSchema } from '$lib/forms/schema';
	import { type SuperValidated, type Infer, superForm, type SuperForm } from 'sveltekit-superforms';

	type TabValues = 'form' | 'checklist' | 'settings';
	const form: TabValues = 'form';
	const checklist: TabValues = 'checklist';
	const settings: TabValues = 'settings';
	const t: number = $state(0);
	let selectedValue: TabValues = $state(form);
	//let selectedTab: TabValues | undefined = form;

	let formData: PageData = $state({
		form: {
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
		}
	});
	//export { formData };

	function handleFormSubmit(event: SubmitEvent) {
		console.log(event);
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
				console.log('Success:', data);
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
	{#if formData.form.errors}
		{#each Object.entries(formData.form.errors) as [key, value]}
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
			<Form bind:data={formData.form} handleFormSubmit={(event) => handleFormSubmit(event)} />
		</Tabs.Content>
		<Tabs.Content value={checklist}></Tabs.Content>
		<Tabs.Content value={settings}></Tabs.Content>
	</Tabs.Root>
</div>
