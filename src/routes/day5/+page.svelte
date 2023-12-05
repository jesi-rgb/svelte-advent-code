<script lang="ts">
	import type { Task, DisplayData } from '$lib';
	import { fly } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onMount } from 'svelte';
	import { groupBy } from '$lib/utils.js';
	import LineChart from '$lib/Components/LineChart.svelte';
	import BarChart from '$lib/Components/BarChart.svelte';

	export let data;
	let history: Task[] = data.data;

	const displayTask = {
		CREATED_TOY: '⭐',
		WRAPPED_PRESENT: '🎁'
	};

	let changedData: boolean = false;

	// number of toys produced per hour,
	// the time taken for each toy,
	// the elves’ task completion rates

	$: elfGrouping = groupBy(history, (h: Task) => h.elf);
	$: hourGrouping = Object.values(groupBy(history, (h: Task) => new Date(h.date).getHours())).map(
		(a: Array<Task>, i: number) => {
			return { index: i + 1, presents: a.filter((f: Task) => f.task == 'WRAPPED_PRESENT').length };
		}
	);
	$: totalToys = hourGrouping.map((a) => a.presents).reduce((a, b) => a + b, 0);
	$: avgToyCreationTime =
		history
			.filter((f) => f.task == 'CREATED_TOY')
			.map((h) => h.minutesTaken)
			.reduce((a, b) => a + b, 0) / history.length;
	$: avgToyWrappingTime =
		history
			.filter((f) => f.task == 'WRAPPED_PRESENT')
			.map((h) => h.minutesTaken)
			.reduce((a, b) => a + b, 0) / history.length;

	$: console.log(hourGrouping);

	let displayElfData: DisplayData[] = [];

	$: Object.keys(elfGrouping).forEach((elfKey: string) => {
		let d: DisplayData = {
			elf: elfKey,

			total_creation: elfGrouping[elfKey].filter((d: Task) => d.task == 'CREATED_TOY').length,

			total_wrapping: elfGrouping[elfKey].filter((d: Task) => d.task == 'WRAPPED_PRESENT').length,

			creation_rate: (
				elfGrouping[elfKey]
					.filter((d: Task) => d.task == 'CREATED_TOY')
					.map((d: Task) => d.minutesTaken)
					.reduce((a: number, b: number) => a + b, 0) /
				elfGrouping[elfKey].filter((d: Task) => d.task == 'CREATED_TOY').length
			).toFixed(2),

			wrapping_rate: (
				elfGrouping[elfKey]
					.filter((d: Task) => d.task == 'WRAPPED_PRESENT')
					.map((d: Task) => d.minutesTaken)
					.reduce((a: number, b: number) => a + b, 0) /
				elfGrouping[elfKey].filter((d: Task) => d.task == 'WRAPPED_PRESENT').length
			).toFixed(2)
		};

		displayElfData.push(d);
	});

	async function fetchProduction() {
		let promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
		let json = await promise.json();
		changedData = history.length == json.length;
		history = json.reverse();
	}

	let time = new Date();
	onMount(() => {
		const interval = setInterval(() => {
			fetchProduction();
			time = new Date();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<BackButton />

<Heading>Elf Productivity Dashboard</Heading>

<p>Visualizing productivity for a set of alienated elves</p>

<main class="my-20 flex flex-col space-y-14">
	<div class="grid grid-cols-2 md:grid-cols-4 text-xl gap-2">
		<div class=" bg-base-200 p-3 rounded-md">
			<span class="opacity-70 italic">Current time:</span>
			<span class="tabular-nums font-bold text-2xl">{time.toLocaleTimeString()}</span>
		</div>
		<div class="bg-base-200 p-3">
			<div class="opacity-70 italic">Toys wrapped up:</div>
			<div class="text-4xl font-bold">{totalToys}</div>
		</div>
		<div class="bg-base-300 p-3">
			<div class="opacity-70 italic">Avg Creation Time:</div>
			<div class="text-4xl font-bold">{avgToyCreationTime.toFixed(2)}</div>
		</div>
		<div class="bg-base-300 p-3">
			<div class="opacity-70 italic">Avg Wrapping Time:</div>
			<div class="text-4xl font-bold">{avgToyWrappingTime.toFixed(2)}</div>
		</div>
	</div>

	<section>
		<h2 class="text-3xl font-bold mb-5">Presents per hour</h2>
		<LineChart data={hourGrouping} property="presents" />
	</section>

	<BarChart data={displayElfData} />

	<section>
		<h2 class="text-3xl font-bold mb-5">Elf Performance</h2>
		<div
			class="h-[600px] overflow-x-scroll md:ml-0 border-2 border-dashed border-base-content rounded-xl"
		>
			<table class="table text-right table-pin-rows">
				<thead>
					<tr class="text-xl">
						<td class="text-right">Elf</td>
						<td>No. ⭐</td>
						<td>No. 🎁</td>
						<td>Avg ⭐ Rate</td>
						<td>Avg 🎁 Rate</td>
					</tr>
				</thead>
				<tbody>
					{#each displayElfData as d}
						<tr class="hover:bg-base-200 hover:font-bold transition-all text-right">
							<td class="font-bold text-lg italic text-right">{d['elf']}</td>
							<td class="tabular-nums text-xl">{d['total_creation']}</td>
							<td class="tabular-nums text-xl">{d['total_wrapping']}</td>
							<td class="tabular-nums text-xl">{d['creation_rate']}</td>
							<td class="tabular-nums text-xl">{d['wrapping_rate']}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section>
		<h2 class="text-3xl font-bold mb-5">Event History</h2>
		<p class="mb-2">Only showing the latest 20 entries</p>
		<div class=" overflow-x-scroll md:ml-0 border-2 border-dashed border-base-content rounded-xl">
			{#if history}
				<table class="table-xs md:table-lg table table-pin-rows text-right">
					<thead>
						<tr class="text-xl">
							<td>Elf</td>
							<td>Date</td>
							<td>Time</td>
							<td class="text-center">Task</td>
							<td class="text-right">Duration</td>
						</tr>
					</thead>
					<tbody>
						{#each history.slice(0, 20) as event, i}
							{#key changedData}
								<tr
									in:fly={{ x: -10, duration: 300, delay: 10 / (i + 1) }}
									class="hover:bg-base-200 transition-all"
								>
									<td class="italic font-semibold text-lg">{event.elf}</td>
									<td class="tabular-nums">{new Date(event.date).toLocaleDateString()}</td>
									<td class="tabular-nums">{new Date(event.date).toLocaleTimeString()}</td>
									<td class="text-center text-xl">{displayTask[event.task]}</td>
									<td class="tabular-nums text-right text-xl">{event.minutesTaken}</td>
								</tr>
							{/key}
						{/each}
					</tbody>
				</table>
			{/if}
		</div>
	</section>
</main>
