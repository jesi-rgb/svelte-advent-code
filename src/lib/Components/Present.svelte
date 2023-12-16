<script lang="ts">
	import { T } from '@threlte/core';

	export let x: number;
	export let y: number;
	export let z: number;
</script>

<T.Mesh position={[x, y, z]} scale={0.1}>
	<T.BoxGeometry />
	<T.MeshStandardMaterial color={Math.random() < 0.5 ? '#FF7D5C' : '#9FE88D'} />
</T.Mesh>
