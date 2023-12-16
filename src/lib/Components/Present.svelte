<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { search, searchData } from '../../stores';

	export let x: number;
	export let y: number;
	export let z: number;
	export let pos: string;
	export let name: string;

	let scale, opacity;
	$: if ($search != undefined && $search != '') {
		if ($search.value === name) {
			scale = 0.1;
			opacity = 1;
			searchData.set({ name: name, pos: pos });
		} else {
			scale = 0.01;
			opacity = 0.3;
		}
	} else {
		scale = 0.1;
		opacity = 1;
	}
</script>

<T.Mesh position={[x, y, z]} {scale}>
	{#if $search != undefined && $search.value === name}
		<HTML position.y={1.45} transform>
			<p class="text-4xl">{name}</p>
			<p class="text-4xl">{pos}</p>
		</HTML>
	{/if}
	<T.BoxGeometry />
	<T.MeshStandardMaterial {opacity} color={Math.random() < 0.5 ? '#FF7D5C' : '#9FE88D'} />
</T.Mesh>
