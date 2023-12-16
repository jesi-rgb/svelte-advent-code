<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Canvas from '$lib/Components/Canvas.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { search } from '../../stores';
	import Select from 'svelte-select';

	import type { Present3D } from '$lib/index';
	export let data;

	const presents3D: Present3D[] = data.presents3D;
</script>

<BackButton />
<Heading>Santa's Hangar</Heading>

<p>This is where all the presents are located. Sounds good huh?</p>

<Canvas {presents3D} />

<Select
	class="selected"
	placeholder="Search for a kid"
	bind:value={$search}
	items={presents3D.map((p) => p.name)}
	--placeholder-color="#B2CCD6"
	--list-background="#2a303c"
	--background="#2a303c"
	--item-hover-bg="#20252E"
	--selected-item-background="#B2CCD6"
	--item-is-active-bg="#B2CCD6"
	--item-is-active-color="#2A303C"
/>
