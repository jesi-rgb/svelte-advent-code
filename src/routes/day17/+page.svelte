<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { backOut, cubicOut, elasticOut, quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { interpolateLab } from 'd3-interpolate';

	type Present = {
		name: string;
		price: number;
	};

	const percentageSpent = tweened(0, {
		duration: 300,
		easing: cubicOut
	});

	const colors = ['#9FE88D', '#EFD057', '#FE7D5C'];
	const color = tweened(colors[0], {
		duration: 300,
		interpolate: interpolateLab
	});

	let budget: number = 30,
		name: string,
		price: number;
	let items: Present[] = [];
	$: sum = items.map((p) => p.price).reduce((a, b) => a + b, 0);
	$: percentageSpent.set((sum / budget) * 100);

	$: console.log($percentageSpent);
	$: budgetLeft = 100 - $percentageSpent;

	$: if (budgetLeft > 69) {
		color.set(colors[0]);
	}
	$: if (budgetLeft < 70) {
		color.set(colors[1]);
	}
	$: if (budgetLeft < 10) {
		color.set(colors[2]);
	}
</script>

<BackButton />

<Heading>Festive Funds</Heading>

<p>Tiny little funds calculator</p>

<main class="my-10">
	<div class="my-5">
		<label for="budget" class="">
			<span class="text-2xl font-bold mb-1">Your budget</span>
			<input
				bind:value={budget}
				type="number"
				id="budget"
				class="input input-bordered text-2xl w-full"
				placeholder="30"
			/>
		</label>
	</div>

	<div class="divider">
		<span style="font-family: Fern Ornaments;" class="text-secondary">QWE</span>
	</div>

	<h1 class="text-2xl font-bold mb-5">New items</h1>
	<form class="flex flex-col">
		<label for="name" class="flex justify-between items-baseline">
			<span>Name</span>
			<input bind:value={name} type="text" id="name" class="input input-bordered" />
		</label>
		<label for="price" class="flex justify-between items-baseline">
			Price
			<input type="number" bind:value={price} id="price" class="input input-bordered" />
		</label>

		<button
			class="btn btn-outline w-fit text-2xl font-bold self-end"
			on:click={() => {
				items.push({ name: name, price: price });
				items = items;
			}}>+</button
		>
	</form>

	<div class="divider">
		<span style="font-family: Fern Ornaments;" class="text-secondary">ZXC</span>
	</div>

	<svg
		height="50px"
		width="100%"
		class="mt-10 border-2 border-dashed border-base-content rounded-xl"
	>
		<rect x="0" y="0" height="100px" width="{$percentageSpent}%" fill={$color} />
	</svg>
	<p class="mb-10 mt-2 text-xl">Total Spent: {sum} out of {budget}§</p>

	<h2 class="text-2xl font-bold mb-2">Present list</h2>
	<ol
		class="list-decimal list-inside w-full h-[300px] [&_li:last-child]:border-0 overflow-y-scroll border-2 border-dashed border-base-content p-2 rounded-xl"
	>
		{#each items as p, i}
			<li
				class="flex justify-between border-b border-base-content border-opacity-50 py-2 tabular-nums"
			>
				<span class="w-1/12">{i + 1}.</span>
				<span class="w-11/12">{p.name}</span>
				<span>{p.price}§</span>
			</li>
		{/each}
	</ol>
</main>
