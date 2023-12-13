<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { GroupBalance, Present } from '$lib/index.js';
	import { pack, hierarchy, stratify } from 'd3-hierarchy';

	import { autoLoadBalance } from '$lib/utils.js';
	import CirclePack from '$lib/Components/CirclePack.svelte';
	import CirclePackZoom from '$lib/Components/CirclePackZoom.svelte';

	let width = 300,
		height = 400;

	export let data;
	const presents: Present[] = data.presents;

	let groups: GroupBalance[] = autoLoadBalance(presents);
	let rootGroups = { presents: groups };
</script>

<BackButton />
<Heading>Auto Sleigh Load Balancer™</Heading>

<p>Just a good old optimization problem in a festive custome.</p>

<main class="my-10">
	<div class="grid grid-cols-1 md:grid-cols-4 gap-2">
		{#each groups as group, i}
			<ol class="bg-base-200 p-3">
				<div class="font-bold mb-1">Group {i + 1}</div>
				{#each group.presents as p}
					<div class="flex justify-between">
						<li>{p.name}</li>
						<li>{p.weight}</li>
					</div>
				{/each}
			</ol>
		{/each}
	</div>
</main>
