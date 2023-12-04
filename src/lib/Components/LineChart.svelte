<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { draw } from 'svelte/transition';
	import { max, min } from 'd3-array';
	import { line } from 'd3-shape';

	import { tweened } from 'svelte/motion';
	import { backOut, cubicInOut } from 'svelte/easing';

	// Receive plot data as prop.
	export let data: any;

	const tweenScaleL = tweened(0, {
		duration: 1500
	});
	const tweenScaleR = tweened(data.length, {
		duration: 1500
	});

	// The chart dimensions and margins as optional props.

	let width = 900;
	let height = 300;
	let marginTop = 20;
	let marginRight = 20;
	let marginBottom = 30;
	let marginLeft = 50;

	let offset = 50;
	$: if (data.length > offset) {
		$tweenScaleL += 1;
		$tweenScaleR += 1;
	} else {
		tweenScaleR.set(data.length);
	}

	let xScale: any, yScale: any;
	$: if (data.length > 0) {
		xScale = scaleLinear([$tweenScaleL, $tweenScaleR], [marginLeft, width - marginRight]);
		yScale = scaleLinear(
			[min(data, (d) => d.heartRate) - 2, max(data, (d: any) => d.heartRate) + 2],
			[height - marginBottom, marginTop]
		);
	}

	$: linePath = line()
		.x((d) => xScale(d.index))
		.y((d) => yScale(d.heartRate));
</script>

{#if data}
	<div bind:clientWidth={width}>
		<svg {width} {height} class="border border-dashed rounded-xl bg-base-200">
			<g class="fill-base-content" transform="translate(0, {height - marginBottom})">
				<line class="stroke-base-content" x1={marginLeft} x2={width - marginRight} />

				{#each xScale.ticks(3) as tick}
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
							x2={width - marginRight - marginLeft}
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
					<rect
						x={0}
						y={0}
						width={width - marginRight}
						height={height - marginBottom}
						fill="black"
					/>
					<!-- Everything under a black pixel will be invisible -->
				</mask>

				<!-- Y-Axis Label -->
			</g>
			<defs>
				<clipPath id="cut-off-bottom">
					<rect
						x={marginLeft}
						y={0}
						width={width - marginRight - marginLeft}
						height={height - marginBottom}
					/>
				</clipPath>
			</defs>
			<g clip-path="url(#cut-off-bottom)">
				{#each data as point, i}
					<circle r="2" cy={yScale(point.heartRate)} cx={xScale(i)} class="fill-primary"></circle>
				{/each}
				<path in:draw fill="none" class="stroke-primary" opacity=".5" d={linePath(data)}></path>
			</g>
		</svg>
	</div>
{/if}
