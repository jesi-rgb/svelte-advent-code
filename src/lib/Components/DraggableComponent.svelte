<script>
	import { draggable } from '@neodrag/svelte';
	export let pos = { x: 10, y: 10 };
</script>

<div
	class="w-fit absolute"
	use:draggable={{ defaultPosition: pos, bounds: 'parent', ignoreMultitouch: true }}
>
	<slot />
</div>
