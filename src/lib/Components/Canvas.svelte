<script>
	import { Canvas } from '@threlte/core';
	import { search, searchData } from '../../stores';

	import Scene from './Scene.svelte';
	export let presents3D;
	$: console.log($searchData);
</script>

<main
	class="relative my-10 w-full h-[400px] md:h-[700px] border-2 drop-shadow-xl border-dashed rounded-xl"
>
	<Canvas>
		<Scene {presents3D} />
	</Canvas>
</main>
