<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { max, min } from 'd3-array';

	// Receive plot data as prop.
	export let data: any;
	$: console.log(data);

	// The chart dimensions and margins as optional props.

	let width = 600;
	let height = 300;
	let marginTop = 20;
	let marginRight = 40;
	let marginBottom = 30;
	let marginLeft = 50;

	let lExt = 0;
	$: rExt = data.length;

	let offset = 20;
	$: if (data.length > offset) {
		lExt += 1;
		rExt += 1;
		console.log(lExt, rExt);
	}

	let xScale: any, yScale: any;
	$: if (data.length > 0) {
		xScale = scaleLinear([lExt, rExt], [marginLeft, width - marginRight]);
		yScale = scaleLinear(
			[min(data, (d) => d.heartRate) - 5, max(data, (d: any) => d.heartRate) + 5],
			[height - marginBottom, marginTop]
		).nice();
	}
</script>

{#if xScale && yScale}
	<svg {width} {height} class="border border-dashed rounded-xl">
		<g class="fill-base-content" transform="translate(0, {height - marginBottom})">
			<line class="stroke-base-content" x1={marginLeft} x2={width - marginRight} />

			{#each xScale.ticks() as tick}
				<!-- X-Axis Ticks -->
				<line class="stroke-base-content" x1={xScale(tick)} x2={xScale(tick)} y1={0} y2={6} />

				<!-- X-Axis Tick Labels -->
				<text
					text-anchor="middle"
					x={xScale(tick)}
					y={22}
					class="tabular-nums text-sm fill-base-content"
				>
					{tick}
				</text>
			{/each}
		</g>

		<g transform="translate({marginLeft},0)">
			{#each yScale.ticks(5) as tick}
				{#if tick !== 0}
					<!-- 
          Grid Lines. 
          Note: First line is skipped since the x-axis is already present at 0. 
        -->
					<line
						stroke="currentColor"
						stroke-opacity="0.1"
						x1={0}
						x2={width - marginLeft}
						y1={yScale(tick)}
						y2={yScale(tick)}
					/>

					<!-- 
          Y-Axis Ticks. 
          Note: First tick is skipped since the x-axis already acts as a tick. 
        -->
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

			<mask id="mask">
				<rect x={0} y={0} width={width - marginRight} height={height - marginBottom} fill="black" />
				<!-- Everything under a black pixel will be invisible -->
			</mask>
			<defs>
				<clipPath id="cut-off-bottom">
					<rect x={0} y={0} width={width - marginRight} height={height - marginBottom} />
				</clipPath>
			</defs>

			<!-- Y-Axis Label -->
			<g clip-path="url(#cut-off-bottom)">
				{#each data as point, i}
					<circle r="2" cy={yScale(point.heartRate)} cx={xScale(i)} class="fill-primary"></circle>
				{/each}
			</g>
		</g>
	</svg>
{/if}
