<script>
	import { Canvas } from '@threlte/core';

	import Scene from './Scene.svelte';
	export let presents3D;
</script>

<main class="my-10 w-full h-[400px] border border-dashed">
	<Canvas>
		<Scene {presents3D} />
	</Canvas>
</main>
