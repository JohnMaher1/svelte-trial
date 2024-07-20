<script lang="ts">
	import * as Form from '$libshadui/components/ui/form';
	import * as Select from '$libshadui/components/ui/select';
	import { Input } from '$libshadui/components/ui/input';
	import { Checkbox } from '$libshadui/components/ui/checkbox';
	import { formSchema, type FormSchema } from '$lib/forms/schema';
	import { type SuperValidated, type Infer, superForm, type SuperForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Label } from '$libshadui/components/ui/label';
	import { roles } from '$lib/forms/schema';

	export let data: SuperValidated<Infer<FormSchema>>;
	export let handleFormSubmit: (event: SubmitEvent) => void;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	$: selectedRole = $formData.role
		? {
				label: $formData.role,
				value: $formData.role
			}
		: undefined;

	const { form: formData, enhance } = form;
</script>

<div class="mt-4 w-full rounded-lg p-6 shadow-md shadow-border 2xl:w-1/2">
	<form onsubmit={handleFormSubmit} use:enhance method="post">
		<div class="grid grid-cols-1 2xl:grid-cols-2 2xl:gap-4">
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
					<Input {...attrs} bind:value={$formData.password} type="password" />
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="flex flex-col items-end 2xl:ml-4">
			<Form.Field {form} name="role" class="w-full flex-1 2xl:w-1/2">
				<Form.Control let:attrs>
					<Form.Label>Role</Form.Label>
					<Select.Root
						selected={selectedRole}
						onSelectedChange={(v) => {
							$formData.role = v!.value;
						}}
					>
						<Select.Input name={attrs.name} />
						<Select.Trigger {...attrs}>
							<Select.Value placeholder="Role" />
						</Select.Trigger>
						<Select.Content>
							{#each roles as role}
								<Select.Item value={role}>{role}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Form.Field {form} name="terms" class="items-top flex justify-end space-x-2 space-y-0 pt-4">
			<Form.Control let:attrs>
				<Checkbox {...attrs} bind:checked={$formData.terms} />
				<div class="grid gap-1.5 leading-none">
					<Label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						Accept terms and conditions
					</Label>

					<p class="text-sm text-muted-foreground">
						You agree to our Terms of Service and Privacy Policy.
					</p>
					<Form.Description />
					<Form.FieldErrors />
				</div>
				<input name={attrs.name} value={$formData.terms} hidden />
			</Form.Control>
		</Form.Field>
		<div class="flex justify-end pt-8">
			<Form.Button class="basis-[100%] 2xl:basis-[50%]">Submit</Form.Button>
		</div>
	</form>
</div>
