<script lang="ts">
	import type { Label as LabelPrimitive } from "bits-ui";
	import { getFormControl } from "formsnap";
	import { cn } from "$libshadui/utils.js";
	import { Label } from "$libshadui/components/ui/label/index.js";

	type $$Props = LabelPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export { className as class };

	const { labelAttrs } = getFormControl();
</script>

<Label {...$labelAttrs} class={cn("data-[fs-error]:text-destructive", className)} {...$$restProps}>
	<slot {labelAttrs} />
</Label>
