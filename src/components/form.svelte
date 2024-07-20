<script lang="ts">
	import * as Form from '$libshadui/components/ui/form';
	import { Input } from '$libshadui/components/ui/input';
	import { formSchema, type FormSchema } from '$lib/forms/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<div class="w-1/2">
		<div class="flex gap-4">
			<Form.Field {form} name="username" class="flex-1 basis-1/2">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password" class="flex-1 basis-1/2">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input {...attrs} bind:value={$formData.password} />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="flex justify-end">
			<Form.Button class="basis-36">Submit</Form.Button>
		</div>
	</div>
</form>
