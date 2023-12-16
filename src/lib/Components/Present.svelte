<script lang="ts">
	import { T } from '@threlte/core';
	import { search } from '../../stores';

	export let x: number;
	export let y: number;
	export let z: number;
	export let name: string;
	let scale, opacity;
	$: if ($search != '') {
		if ($search == name) {
			scale = 0.1;
			opacity = 1;
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
	<T.BoxGeometry />
	<T.MeshStandardMaterial {opacity} color={Math.random() < 0.5 ? '#FF7D5C' : '#9FE88D'} />
</T.Mesh>
