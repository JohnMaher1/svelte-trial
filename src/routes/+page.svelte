<script lang="ts">
	import Navbar from '../components/navbar.svelte';
	import * as Tabs from '$libshadui/components/ui/tabs/index.js';
	import TabsContent from '$libshadui/components/ui/tabs/tabs-content.svelte';
	import Form from '../components/form.svelte';
	import type { PageData } from './$types';

	type TabValues = 'form' | 'checklist' | 'settings';
	const form: TabValues = 'form';
	const checklist: TabValues = 'checklist';
	const settings: TabValues = 'settings';

	let selectedValue: TabValues = form;
	//let selectedTab: TabValues | undefined = form;

	export let formData: PageData = {
		form: {
			data: {
				email: '',
				password: '',
				age: 1,
				rememberMe: false,
				terms: false,
				username: ''
			},
			id: 'form',
			errors: {},
			posted: false,
			valid: false
		}
	};
</script>

<div class="h-full w-full">
	<Navbar />
	<Tabs.Root class="p-8" bind:value={selectedValue}>
		<Tabs.List class="grid w-full grid-cols-3 gap-1">
			<Tabs.Trigger value={form}>Form</Tabs.Trigger>
			<Tabs.Trigger value={checklist}>Check List</Tabs.Trigger>
			<Tabs.Trigger value={settings}>Settings</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value={form}>
			<Form data={formData.form} />
		</Tabs.Content>
		<Tabs.Content value={checklist}></Tabs.Content>
		<Tabs.Content value={settings}></Tabs.Content>
	</Tabs.Root>
</div>
