<script lang="ts">
	import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
	import { draw } from 'svelte/transition';
	import { max, min } from 'd3-array';
	import { line } from 'd3-shape';
	import type { DisplayData } from '$lib';

	export let data: DisplayData[];

	$: vizData = data.map((d) => {
		return {
			elf: d.elf,
			dataViz: {
				creation_rate: d.creation_rate,
				wrapping_rate: d.wrapping_rate,
				total_creation: d.total_creation,
				total_wrapping: d.total_wrapping
			}
		};
	});

	let width = 600;
	let height = 300;
	const margin = { top: 30, bottom: 80, left: 40, right: 20 };

	const names = data.map((d) => d.elf);
	const subgroups = Object.keys(data[0]).slice(1);

	$: xScale = scaleBand(names, [margin.left, width - margin.right]).paddingInner(0.3);
	$: xSubScale = scaleBand(subgroups, [0, xScale.bandwidth()]);
	const yScale = scaleLinear([0, 100], [height - margin.bottom, margin.top]);
	const colorScale = scaleOrdinal(subgroups, ['#9FE88D', '#FF7D5C', '#C792E9', '#B2CCD6']);
</script>

<div>
	<h2 class="font-bold text-3xl mb-3">Aggregated Stats</h2>
	<p>Color coding is as follows:</p>

	<ul class="list-disc">
		<li class="text-primary">{subgroups[0]}: how many presents in total were created</li>

		<li class="text-secondary">{subgroups[1]}: how many presents in total were finalized</li>

		<li class="text-accent">{subgroups[2]}: average toy creation duration</li>

		<li class="text-base-content">{subgroups[3]}: average toy finalization duration</li>
	</ul>

	{#if data}
		<div bind:clientWidth={width} class="my-5">
			<svg {width} {height} class="bg-base-200">
				<g transform="translate({margin.left},{0})">
					{#each yScale.ticks(4) as tick}
						{#if tick !== 0}
							<line
								stroke="currentColor"
								stroke-opacity="0.1"
								x1={0}
								x2={width - margin.right - margin.left}
								y1={yScale(tick)}
								y2={yScale(tick)}
							/>

							<line stroke="currentColor" x1={0} x2={-6} y1={yScale(tick)} y2={yScale(tick)} />
						{/if}

						<!-- Y-Axis Tick Labels -->
						<text
							class="fill-base-content text-sm"
							text-anchor="end"
							dominant-baseline="middle"
							x={-9}
							y={yScale(tick)}
						>
							{tick}
						</text>
					{/each}
				</g>
				<g class="fill-base-content" transform="translate(0, {height - margin.bottom})">
					<line
						class="stroke-base-content"
						x1={margin.left}
						x2={width - margin.right - margin.left}
					/>

					{#each names as name}
						<!-- X-Axis Ticks -->
						<g transform="translate({xScale(name)},{0})">
							<circle r="2" cy={0} cx={0}></circle>
							<!-- X-Axis Tick Labels -->
							<text
								text-anchor="end"
								dx={-10}
								dy={5}
								x={0}
								y="0"
								class="text-xs fill-base-content -rotate-90"
							>
								{name}
							</text>
							{#each subgroups as subgroup}
								<rect
									transform="translate(0, {-height})"
									fill={colorScale(subgroup)}
									width={xSubScale.bandwidth()}
									height={height - yScale(data.find((e) => e.elf === name)[subgroup])}
									x={xSubScale(subgroup)}
									y={yScale(data.find((e) => e.elf === name)[subgroup])}
								>
								</rect>
							{/each}
						</g>
					{/each}
				</g>
			</svg>
		</div>
	{/if}
</div>
