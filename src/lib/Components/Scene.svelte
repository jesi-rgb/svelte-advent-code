<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import Present from './Present.svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent } from 'd3-array';

	import type { Present3D } from '$lib/index';
	export let presents: Present3D[];

	$: xScale = scaleBand()
		.domain(presents.map((d) => d.month))
		.range([-10, 10]);

	$: yScale = scaleLinear()
		.domain(extent(presents.map((d) => d.rain)))
		.range([0, 5]);

	$: zScale = scaleLinear()
		.domain(extent(presents.map((d) => d.year)))
		.range([0, 4]);
</script>

<div class="w-full h-[400px] border border-dashed">
	<Canvas>
		<Present />

		<T.PerspectiveCamera
			makeDefault
			position={[20, 20, 20]}
			zoom={10}
			on:create={({ ref }) => {
				ref.lookAt(0, 1, 0);
			}}
		/>
		<T.AmbientLight intensity={0.2} />
		<T.DirectionalLight position={[10, 5, 0]} />
	</Canvas>
</div>
