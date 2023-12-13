<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { Present } from '$lib/index.js';

	import { autoLoadBalance } from '$lib/utils.js';

	export let data;
	const presents: Present[] = data.presents;

	let groups = autoLoadBalance(presents);
</script>

<BackButton />
<Heading>Auto Sleigh Load Balancer™</Heading>

<p>Just a good old optimization problem in a festive custome.</p>
