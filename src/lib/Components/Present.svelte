<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { search, searchData } from '../../stores';

	export let x: number;
	export let y: number;
	export let z: number;
	export let pos: string;
	export let name: string;

	let scale: number;
	$: if ($search != undefined && $search != '') {
		if ($search.value === name) {
			scale = 0.1;
			searchData.set({ name: name, pos: pos });
		} else {
			scale = 0.01;
		}
	} else {
		scale = 0.1;
	}
	$: selected = $search != undefined && $search.value === name;
</script>

<T.Mesh position={[x, y, z]} {scale}>
	{#if selected}
		<HTML position={[1, 0, 1]}>
			<div class="backdrop-blur-xl px-2 py-1 rounded-xl border border-dashed">
				<p class="text-xl font-bold">{name}</p>
				<p class="text-base">Position: ({pos.slice(0, -2)})</p>
				<p class="text-base">Floor: {pos.slice(-1)}</p>
			</div>
		</HTML>
	{/if}
	<T.BoxGeometry />
	<T.MeshStandardMaterial color={selected ? '#9FE88D' : '#C792E9'} />
</T.Mesh>
