<script>
	import { draw } from 'svelte/transition';
	import { scaleLinear, scaleTime } from 'd3-scale';
	import { extent } from 'd3-array';
	import { line } from 'd3-shape';
	import { utcMinute, unixDay } from 'd3';

	export let data;

	let temps = data.hourly.temperature_2m;
	let apparents = data.hourly.apparent_temperature;
	let times = data.hourly.time.map((d) => new Date(d));

	let lineData = [];
	for (let i = 0; i < times.length; i++) {
		lineData.push({
			temperature: temps[i],
			time: times[i],
			apparent_temperature: temps[i] - apparents[i]
		});
	}

	let width = 900;
	let height = 300;
	let marginTop = 20;
	let marginRight = 30;
	let marginBottom = 30;
	let marginLeft = 30;

	$: y = scaleLinear()
		.domain(extent(temps))
		.range([height - marginBottom, marginTop])
		.nice();

	$: x = scaleTime()
		.domain(extent(times))
		.range([marginLeft, width - marginRight - marginLeft])
		.nice();

	$: temp = line()
		.x((d) => x(new Date(d.time)))
		.y((d) => y(d.temperature));

	$: apparent = line()
		.x((d) => x(new Date(d.time)))
		.y((d) => y(d.apparent_temperature));

	$: ticks = width > 400 ? x.ticks(unixDay.every(1)) : x.ticks(2);
</script>

<div bind:clientWidth={width} class="border-2 border-dashed rounded-xl p-2">
	<svg {height} {width}>
		<g transform="translate({0},{height - marginBottom})">
			<line class="stroke-base-content" x1={marginLeft} x2={width - marginRight} />
			{#each ticks as tick}
				<!-- X-Axis Ticks -->
				<line class="stroke-base-content" x1={x(tick)} x2={x(tick)} y1={0} y2={6} />

				<!-- X-Axis Tick Labels -->
				<text
					text-anchor="middle"
					x={x(tick)}
					y={22}
					class="tabular-nums text-xs fill-base-content font-bold"
				>
					{tick.toLocaleDateString().slice(0, 5)}
				</text>
			{/each}
		</g>
		<g transform="translate({marginLeft},{0})">
			<line class="stroke-base-content" y1={marginTop} y2={height - marginBottom} />

			{#each y.ticks(6) as tick}
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

			<path in:draw fill="none" class="stroke-primary" stroke-width="3" d={temp(lineData)}></path>
			<path in:draw fill="none" class="stroke-secondary" stroke-width="3" d={apparent(lineData)}
			></path>
		</g></svg
	>
</div>
