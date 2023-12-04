<script lang="ts">
	import Heading from '$lib/Components/Heading.svelte';
	import LineChart from '$lib/Components/LineChart.svelte';
	import { onMount } from 'svelte';

	type HeartRate = {
		heartRate: number;
	};

	let data: HeartRate;
	let history: HeartRate[] = [];

	$: avgTenSeconds =
		history
			.slice(-10, -1)
			.map((e) => e.heartRate)
			.reduce((a, b) => a + b, 0) / 10;

	$: avgThirtySeconds =
		history
			.slice(-30, -1)
			.map((e) => e.heartRate)
			.reduce((a, b) => a + b, 0) / 30;

	$: avgMinute =
		history
			.slice(-60, -1)
			.map((e) => e.heartRate)
			.reduce((a, b) => a + b, 0) / 60;

	async function fetchHeartRate() {
		let promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
		let json = await promise.json();
		data = json;
		history = [...history, data];
	}

	onMount(() => {
		const interval = setInterval(() => {
			fetchHeartRate();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<Heading>Santa’s Heart Rate Monitor (SHRM™)</Heading>
<p>Let us see how's the state of this absolute goated bro</p>

<div class="my-10">
	{#if data}
		<div class="font-bold tabular-nums text-4xl">{data.heartRate}</div>
		<div class="tabular-nums text-2xl">{avgTenSeconds.toFixed(2)}</div>
		<div class="tabular-nums text-2xl">{avgThirtySeconds.toFixed(2)}</div>
		<div class="tabular-nums text-2xl">{avgMinute.toFixed(2)}</div>
		<LineChart data={history} />
	{:else}
		<div class="text-xl">fetching data from the North Pole Health Database...</div>
	{/if}
</div>
