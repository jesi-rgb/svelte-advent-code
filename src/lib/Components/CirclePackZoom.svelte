<script>
	import { afterUpdate } from 'svelte';
	import * as d3 from 'd3';

	// Your data
	export let data;

	let width = 400,
		height = 400;

	// Set up the SVG container
	let svg;
	let circles = [];

	// Create a pack layout
	const pack = d3.pack().size([width, height]).padding(2);

	// Create a hierarchy structure from your data
	const hierarchy = d3
		.hierarchy({ children: data })
		.sum(function (d) {
			return d.weight;
		})
		.sort((a, b) => b.weight - a.weight);

	// Apply the pack layout to the hierarchy
	const packedData = pack(hierarchy);

	// Use Svelte's #each directive to render circles
	// based on the packedData array
	$: circles = packedData.descendants();
</script>

<div bind:clientWidth={width}>
	<svg {height} class="w-full bg-base-300 border-dashed border-2 rounded-xl">
		{#each circles as { x, y, r, data, height }}
			{#if height == 0}
				<!-- actual presents -->
				<circle cx={x} cy={y} {r} class="fill-base-content" opacity="0.7" />
			{:else if height == 1}
				<!-- groups -->
				<circle cx={x} cy={y} {r} fill="#B2CCD6" opacity="0.7" />
			{:else}
				<!-- big circle -->
				<circle cx={x} cy={y} {r} fill="#2A303C" class="stroke-white" opacity="0.7" />
			{/if}
		{/each}
	</svg>
</div>

<style>
	.chart {
		left: 50%;
		transform: translateX(-50%);
	}
</style>
