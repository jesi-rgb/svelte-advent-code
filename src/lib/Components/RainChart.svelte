<script>
	import { draw } from 'svelte/transition';
	import { scaleLinear, scaleBand } from 'd3-scale';
	import { extent } from 'd3-array';

	export let data;

	let rain = data.hourly.rain;
	let times = data.hourly.time.map((d) => new Date(d));

	// let lineData = [];
	// for (let i = 0; i < times.length; i++) {
	// 	lineData.push({
	// 		precipitation_probability: temps[i],
	// 		time: times[i],
	// 		apparent_temperature: apparents[i]
	// 	});
	// }

	let width = 900;
	let height = 300;
	let marginTop = 20;
	let marginRight = 0;
	let marginBottom = 30;
	let marginLeft = 30;

	$: y = scaleLinear()
		.domain(extent(rain))
		.range([height - marginBottom, marginTop])
		.nice();

	$: x = scaleBand()
		.domain(times)
		.range([marginLeft, width - marginRight - marginLeft])
		.padding(0.1);

	$: interval = width > 400 ? 20 : 50;
</script>

<div bind:clientWidth={width} class="border-2 border-dashed rounded-xl p-2">
	<svg {height} {width}>
		<g transform="translate({0},{height - marginBottom})">
			<line class="stroke-base-content" x1={marginLeft} x2={width - marginRight - marginLeft} />
			{#each times as time, i}
				<!-- X-Axis Ticks -->
				<line class="stroke-base-content" x1={x(time)} x2={x(time)} y1={0} y2={6} />

				<!-- X-Axis Tick Labels -->
				{#if i % interval == 0}
					<text
						text-anchor="middle"
						x={x(time)}
						y={22}
						class="tabular-nums text-xs fill-base-content font-bold"
					>
						{time.toLocaleDateString().slice(0, 5)}
					</text>
				{/if}
			{/each}
		</g>
		<g>
			{#each times as time, i}
				<rect
					x={x(time)}
					y={y(rain[i])}
					width={x.bandwidth()}
					height={height - marginBottom - y(rain[i])}
					class="fill-info"
					in:draw={{ delay: i * 10 }}
				/>
			{/each}
		</g>
		<g transform="translate({marginLeft},{0})">
			<line class="stroke-base-content" y1={marginTop} y2={height - marginBottom} />

			{#each y.ticks() as tick}
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
						y1={y(tick)}
						y2={y(tick)}
					/>

					<!-- 
          Y-Axis Ticks. 
          Note: First tick is skipped since the x-axis already acts as a tick. 
        -->
					<line stroke="currentColor" x1={0} x2={-6} y1={y(tick)} y2={y(tick)} />
				{/if}

				<!-- Y-Axis Tick Labels -->
				<text
					class="fill-base-content text-sm"
					text-anchor="end"
					dominant-baseline="middle"
					x={-9}
					y={y(tick)}
				>
					{tick}
				</text>
			{/each}
		</g></svg
	>
	<div class="ml-3">
		<div class="flex items-center space-x-3">
			<div class="w-3 h-3 bg-info rounded-sm"></div>
			<div>Rain in mm</div>
		</div>
	</div>
</div>
