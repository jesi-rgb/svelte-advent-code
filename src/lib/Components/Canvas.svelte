<script>
	import { Canvas } from '@threlte/core';
	import { search, searchData } from '../../stores';

	import Scene from './Scene.svelte';
	export let presents3D;
	$: console.log($searchData);
</script>

<main class="my-10 w-full h-[400px] border-2 drop-shadow-xl border-dashed rounded-xl">
	<Canvas>
		<Scene {presents3D} />
	</Canvas>

	{#if $searchData.pos != undefined}
		<div class="p-4 bg-base-100 backdrop-blur-sm absolute left-4 bottom-2 drop-shadow-md text-lg">
			<p class="font-bold">
				{$searchData.name}
			</p>
			<p>
				Position: {$searchData.pos.slice(0, -2)}
			</p>
			<p>
				Height: {$searchData.pos.slice(-1)}
			</p>
		</div>
	{/if}
</main>
