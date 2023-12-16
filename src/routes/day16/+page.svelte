<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Canvas from '$lib/Components/Canvas.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { search } from '../../stores';

	import type { Present3D } from '$lib/index';
	export let data;

	const presents3D: Present3D[] = data.presents3D;
</script>

<BackButton />
<Heading>Santa's Hangar</Heading>

<p>This is where all the presents are located. Sounds good huh?</p>

<Canvas {presents3D} />

<input bind:value={$search} type="text" class="input input-bordered" />
