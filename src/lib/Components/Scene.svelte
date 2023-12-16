<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, OrbitControls } from '@threlte/extras';
	import Present from './Present.svelte';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent } from 'd3-array';
	import type { Present3D } from '$lib/index';

	export let presents3D: Present3D[];

	let presentScale = 0.1;
	$: xScale = scaleLinear().domain([1, 20]).range([-1, 1]);
	$: yScale = scaleLinear().domain([1, 20]).range([-1, 1]);

	const maxHeight = extent(presents3D.map((p) => p.z));
	$: zScale = scaleLinear()
		.domain(extent(presents3D.map((p) => p.z)))
		.range([0, 0.65]);
</script>

{#each presents3D as p}
	<Present x={xScale(p.x)} z={yScale(p.y)} y={zScale(p.z)} />
{/each}

<Grid cellColor="#B2CCD6" sectionColor="#B2CCD6" />

<T.AmbientLight intensity={0.1} />
<T.RectAreaLight
	position={[0, 20, 0]}
	intensity={5}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>
<T.RectAreaLight
	position={[10, 20, 0]}
	intensity={5}
	on:create={({ ref }) => {
		ref.lookAt(10, 0, 0);
	}}
/>
<T.RectAreaLight
	position={[-10, 20, 0]}
	intensity={5}
	on:create={({ ref }) => {
		ref.lookAt(-10, 0, 0);
	}}
/>

<T.OrthographicCamera
	makeDefault
	zoom={150}
	position={[5, 6, 5]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0.3, 0);
	}}
>
	<OrbitControls></OrbitControls></T.OrthographicCamera
>
