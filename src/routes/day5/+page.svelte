<script lang="ts">
	import type { TaskType, Task } from '$lib';
	import { fly } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onMount } from 'svelte';
	import { groupBy } from '$lib/utils.js';

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
	$: hourGrouping = groupBy(history, (h: Task) => new Date(h.date).getHours());

	type DisplayData = {
		elf: string;
		total_creation: Array<number>;
		total_wrapping: Array<number>;
		creation_rate: string;
		wrapping_rate: string;
	};

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

	onMount(() => {
		const interval = setInterval(() => {
			fetchProduction();
		}, 5000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<BackButton />

<Heading>Elf Productivity Dashboard</Heading>

<p>Visualizing productivity for a set of alienated elves</p>

<div class="my-20 overflow-x-scroll md:ml-0 border-2 border-dashed border-base-content rounded-xl">
	<table class="table md:table-lg table-xs">
		<thead>
			<tr>
				<td>Elf</td>
				<td>No. ⭐</td>
				<td>No. 🎁</td>
				<td>Avg ⭐ Speed</td>
				<td>Avg 🎁 Speed</td>
			</tr>
		</thead>
		<tbody>
			{#each displayElfData as d}
				<tr>
					<td>{d['elf']}</td>
					<td class="tabular-nums">{d['total_creation']}</td>
					<td class="tabular-nums">{d['total_wrapping']}</td>
					<td class="tabular-nums">{d['creation_rate']}</td>
					<td class="tabular-nums">{d['wrapping_rate']}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div
	class="my-20 h-[900px] overflow-y-scroll overflow-x-scroll md:ml-0 border-2 border-dashed border-base-content rounded-xl"
>
	{#if history}
		<table class="table-xs md:table-lg table table-pin-rows">
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
				{#each history as event, i}
					{#key changedData}
						<tr in:fly={{ x: -10, duration: 300, delay: 10 / (i + 1) }}>
							<td class="italic font-semibold text-lg">{event.elf}</td>
							<td class="tabular-nums">{new Date(event.date).toLocaleDateString()}</td>
							<td class="tabular-nums">{new Date(event.date).toLocaleTimeString()}</td>
							<td class="text-center text-xl">{displayTask[event.task]}</td>
							<td class="tabular-nums text-right text-lg">{event.minutesTaken}</td>
						</tr>
					{/key}
				{/each}
			</tbody>
		</table>
	{/if}
</div>
