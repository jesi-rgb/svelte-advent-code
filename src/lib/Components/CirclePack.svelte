<script>
	import { stratify, pack, hierarchy } from 'd3-hierarchy';

	let width = 400,
		height = 600;

	export let data;

	/** @type {String} [idKey='id'] - The key on each object where the id value lives. */
	export let idKey = 'id';

	/** @type {String} [parentKey] - Set this if you want to define one parent circle. This will give you a [nested](https://layercake.graphics/example/CirclePackNested) graphic versus a [grouping of circles](https://layercake.graphics/example/CirclePack). */
	export let parentKey = undefined;

	/** @type {String} [valueKey='value'] - The key on each object where the data value lives. */
	export let valueKey = 'avgWeight';

	/** @type {Function} [labelVisibilityThreshold=r => r > 25] - By default, only show the text inside a circle if its radius exceeds a certain size. Provide your own function for different behavior. */
	export let labelVisibilityThreshold = (r) => r > 10;

	/** @type {Function} [sortBy=(a, b) => b.value - a.value] - The order in which circle's are drawn. Sorting on the `depth` key is also a popular choice. */
	export let sortBy = (a, b) => b.value - a.value; // 'depth' is also a popular choice

	/** @type {Number} [spacing=0] - Whitespace padding between each circle, in pixels. */
	export let spacing = 3;

	/* --------------------------------------------
	 * This component will automatically group your data
	 * into one group if no `parentKey` was passed in.
	 * Stash $data here so we can add our own parent
	 * if there's no `parentKey`
	 */
	let parent = {};

	let dataset = data;
	console.log(dataset);

	$: if (parentKey === undefined) {
		parent = { [idKey]: 'all' };
		dataset = [...dataset, parent];
	}

	$: stratifier = stratify()
		.id((d) => d[idKey])
		.parentId((d) => {
			if (d[idKey] === parent[idKey]) return '';
			return d[parentKey] || parent[idKey];
		});

	$: packer = pack().size([width, height]).padding(spacing);

	$: stratified = stratifier(dataset);

	$: root = hierarchy(stratified)
		.sum((d, i) => {
			return d.data[valueKey] || 1;
		})
		.sort(sortBy);

	$: packed = packer(root);

	$: descendants = packed.descendants();
	$: console.log(descendants);
</script>

<div bind:clientWidth={width}>
	<svg {width} {height} class="bg-base-200 border-2 border-dashed rounded-xl">
		<g>
			{#each descendants as d, i}
				{#if i == 0}
					<circle cx={d.x} cy={d.y} r={d.r} class="stroke-base-content" />
				{:else}
					<circle cx={d.x} cy={d.y} r={d.r} class="fill-base-content tooltip"></circle>
				{/if}
			{/each}
		</g>
	</svg>
</div>
