<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import Scene from '$lib/Components/Scene.svelte';

	import type { Present3D } from '$lib/index';
	export let data: Present3D[];
</script>

<BackButton />
<Heading>Santa's Hangar</Heading>

<p>This is where all the presents are located. Sounds good huh?</p>

<Scene presents={data} />
