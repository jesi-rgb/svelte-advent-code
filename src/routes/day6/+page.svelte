<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { backIn, backOut, elasticOut, quintIn } from 'svelte/easing';
	import { scale, fade } from 'svelte/transition';

	let bpm = 120; //beats per minute

	let bpmDisplay = 0;

	const add = () => (bpmDisplay += 1);

	let intervalId: number;
	let dynamicTimeout: number = (1000 * 60) / bpm;

	// Function to be executed at intervals
	function intervalFunction() {
		bpmDisplay += 1;
	}

	// Start the interval when the component is mounted
	onMount(() => {
		intervalId = setInterval(intervalFunction, dynamicTimeout);
	});

	// Clear the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(intervalId);
	});

	// Function to update the dynamicTimeout value
	function updateDynamicTimeout() {
		// You can calculate the new timeout value based on some logic
		dynamicTimeout = (1000 * 60) / bpm;
		// Restart the interval with the new timeout
		clearInterval(intervalId);
		intervalId = setInterval(intervalFunction, dynamicTimeout);
	}
</script>

<BackButton />
<Heading>BPM Counter</Heading>
<p>Let's get those booties bootin'</p>

<main class="my-10">
	<div class="text-center text-4xl tabular-nums">{bpm} <span class="opacity-70">bpm</span></div>
	<input
		class="range"
		bind:value={bpm}
		on:change={updateDynamicTimeout}
		type="range"
		min="30"
		max="300"
		step="1"
	/>
	<div class="text-center text-4xl tabular-nums">{bpmDisplay}</div>

	<div class="w-10 h-10 relative mx-auto">
		{#key bpmDisplay}
			<div
				in:scale={{ easing: elasticOut, duration: dynamicTimeout }}
				class="w-10 h-10 absolute bg-base-content rounded-full"
			></div>
		{/key}
	</div>
</main>
