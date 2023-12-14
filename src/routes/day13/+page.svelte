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
	<div class="xl:hidden grid grid-cols-1 md:grid-cols-4 gap-2">
		<p>Try seeing this on your computer for a nice d3 viz!</p>
		{#each groups.slice(0, 10) as group, i}
			<ol class="bg-base-200 p-3">
				<div class="flex justify-between items-baseline">
					<div class="font-bold text-3xl mb-1">Group {i + 1}</div>
					<div class="font-bold text-3xl mb-1 opacity-60">{group.weight.toFixed(1)} kg</div>
				</div>
				{#each group.children as p}
					<div class="flex justify-between">
						<li>{p.name}</li>
						<li>{p.weight}</li>
					</div>
				{/each}
			</ol>
		{/each}
		<p class="italic">
			there's {groups.length - 10} more groups but you probably don't want to see them
		</p>
	</div>
	<div class="hidden xl:block">
		<CirclePack data={groups} />
	</div>
</main>
