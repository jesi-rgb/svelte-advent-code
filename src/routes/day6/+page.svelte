<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	let bpm = 120; //beats per minute

	let bpmDisplay = 0;
	let tapCounter = 0;
	let signature = 4;

	let tap1: Date;
	let tap2: Date;

	let intervalId: number;
	let dynamicTimeout = (1000 * 60) / bpm;

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
<p>
	Let's get those booties bootin'. Tap or click on the green button, or use the <span class="kbd"
		>Space</span
	>
	or any of the arrows <span class="kbd">←</span> <span class="kbd">↑</span>
	<span class="kbd">↓</span> <span class="kbd">→</span> to set time!
</p>

<main class="my-10">
	<div class="text-center text-4xl tabular-nums">
		{bpm.toFixed(2)} <span class="opacity-70">bpm</span>
	</div>
	<input
		class="range"
		bind:value={bpm}
		on:change={updateDynamicTimeout}
		type="range"
		min="30"
		max="300"
		step="1"
	/>
	<div class="text-center text-4xl tabular-nums">
		{(bpmDisplay % signature) + 1}
		<span class="opacity-70"
			>/ <span
				on:keydown={(e) => {
					if (e.key == 'Enter') e.preventDefault();
				}}
				bind:innerHTML={signature}
				contenteditable>{signature}</span
			></span
		>
	</div>

	<div class="flex justify-between">
		<div class="w-10 h-10 relative mx-auto">
			{#key bpmDisplay}
				<div
					in:scale={{ easing: elasticOut, duration: dynamicTimeout }}
					class="w-10 h-10 absolute bg-base-content rounded-full"
				></div>
			{/key}
		</div>
		<div class="w-10 h-10 relative mx-auto">
			{#key tapCounter}
				<div
					in:scale={{ easing: elasticOut, duration: 1000 }}
					on:click={(e) => {
						tapCounter += 1;

						let millisDiff = 0;
						if (tapCounter % 2 == 0) {
							tap2 = new Date();
						} else {
							tap1 = new Date();
						}

						if (tap1 && tap2) {
							millisDiff = Math.abs(tap2 - tap1);

							bpm = (1000 * 60) / millisDiff;
							updateDynamicTimeout();
						}
					}}
					class="w-10 h-10 absolute bg-primary rounded-full"
				></div>
			{/key}
		</div>
	</div>
</main>

<svelte:window
	on:keydown={(e) => {
		if (e.key === ' ' || e.key.includes('Arrow')) {
			tapCounter += 1;

			let millisDiff = 0;
			if (tapCounter % 2 == 0) {
				tap2 = new Date();
			} else {
				tap1 = new Date();
			}

			if (tap1 && tap2) {
				millisDiff = Math.abs(tap2 - tap1);

				bpm = (1000 * 60) / millisDiff;
				updateDynamicTimeout();
			}
		}
	}}
/>
