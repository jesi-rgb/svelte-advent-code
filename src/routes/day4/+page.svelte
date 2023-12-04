<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
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
		data['index'] = history.length;
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

<BackButton />
<Heading>Santa’s Heart Rate Monitor (SHRM™)</Heading>
<p>Let us see how's the state of this absolute goated bro</p>

<div class="my-10">
	{#if data}
		<div class="flex flex-col md:flex-row justify-between gap-4">
			<div class="flex flex-col justify-between items-baseline w-full md:text-3xl">
				<div class="flex items-baseline w-full justify-between">
					<div class="opacity-50">Heart Rate</div>
					<div class="font-bold tabular-nums text-5xl">{data.heartRate}</div>
				</div>
				<div class=" flex items-baseline justify-between w-full">
					<div class="opacity-50">Avg 10s</div>
					<div class="tabular-nums text-2xl">{avgTenSeconds.toFixed(2)}</div>
				</div>
				<div class="flex items-baseline w-full justify-between">
					<div class="opacity-50">Avg 30s</div>
					<div class="tabular-nums text-2xl">{avgThirtySeconds.toFixed(2)}</div>
				</div>
				<div class="flex items-baseline w-full justify-between">
					<div class="opacity-50">Avg 60s</div>
					<div class="tabular-nums text-2xl">{avgMinute.toFixed(2)}</div>
				</div>
			</div>
			<div class="mx-auto md:w-1/2">
				<LineChart data={history} />
			</div>
		</div>
	{:else}
		<div class="text-xl">fetching data from the North Pole Health Database...</div>
	{/if}
</div>
