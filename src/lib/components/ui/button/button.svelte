<script lang="ts">
	import { Button as ButtonPrimitive } from "bits-ui";
	import { buttonVariants, type Props, type Events } from "./index.js";
	import { cn } from "$lib/utils";

	type $$Props = Props;
	type $$Events = Events;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let variant: $$Props["variant"] = "default";
	export let size: $$Props["size"] = "default";
	export let builders: $$Props["builders"] = [];
</script>

<ButtonPrimitive.Root
	{builders}
	class={cn(buttonVariants({ variant, size, className }))}
	type="button"
	{...$$restProps}
	on:click
	on:keydown
>
	<slot />
</ButtonPrimitive.Root>
