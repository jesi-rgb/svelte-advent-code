<script>
	import { draggable } from '@neodrag/svelte';
</script>

<div
	class="w-fit absolute"
	use:draggable={{ defaultPosition: { x: 10, y: 10 }, bounds: 'parent', ignoreMultitouch: true }}
>
	<slot />
</div>
