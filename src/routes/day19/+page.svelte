<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onDestroy, onMount } from 'svelte';

	const pattern = [
		'QETRQETRQE',
		'ZCGFZCGFZC',
		'TRQETRQETR',
		'GFZCGFZCGF',
		'QETRQETRQE',
		'ZCGFZCGFZC',
		'TRQETRQETR',
		'GFZCGFZCGF',
		'QETRQETRQE',
		'ZCGFZCGFZC'
	];
	let acceleration;

	const patternLength = pattern[0].length * pattern.length;
	let spans: HTMLElement[] = [];

	let intervals: number[] = [];
	let nLights: number = 3;
	let offset: number = 1;
	let duration = 1000;

	let clear: number;
	function startAnimation(delay: number = timeScale) {
		clear = setInterval(() => {
			for (let i = 0; i < nLights; i++) {
				const randomIndex = Math.floor(Math.random() * patternLength);
				let randomSpan = spans[randomIndex];

				if (randomSpan != undefined) {
					randomSpan.style.transition = 'opacity 0.2s ease-in-out';
					randomSpan.style.opacity = '1';
					if (Math.random() < 0.5) {
						randomSpan.style.color = '#9FE88D';
					}
					if (Math.random() < 0.2) {
						randomSpan.style.color = '#FE7D5C';
					}

					setTimeout(
						() => {
							randomSpan.style.transition = 'none';
						},
						2000 + (i + 1) * offset
					);

					// fade in animation after a short delay
					setTimeout(
						() => {
							randomSpan.style.transition = 'all 0.8s ease-in-out';
							randomSpan.style.opacity = '.1';
							randomSpan.style.color = '#B2CCD6';
						},
						duration + (i + 1) * offset
					);
				}
			}
		}, delay);
	}

	let timeScale = 1000;

	onMount(() => {
		startAnimation(timeScale);
	});

	onDestroy(() => {
		clearInterval(clear);
	});

	$: {
		// This reactive statement will be re-evaluated whenever `delay` changes
		clearInterval(clear);
		startAnimation(timeScale);
	}
</script>

<BackButton />
<Heading>Polar Lights</Heading>

<p>Christmas lights gone digital</p>

<main class="my-10 flex flex-col-reverse md:flex-row gap-3 items-start">
	<div class="flex space-y-2 w-full flex-col md:w-1/2">
		<label for="speed" class="">
			<span>Speed</span>
			<input
				type="range"
				id="speed"
				class="range"
				bind:value={timeScale}
				min="10"
				max="5000"
				step="10"
			/>
		</label>
		<label for="nLights" class="">
			<span>No. Lights</span>
			<input
				type="range"
				id="nLights"
				class="range"
				bind:value={nLights}
				min="1"
				max="20"
				step="1"
			/>
		</label>
		<label for="offset" class="">
			<span>Offset</span>
			<input
				type="range"
				id="offset"
				class="range"
				bind:value={offset}
				min=".01"
				max="5"
				step=".01"
			/>
		</label>
		<label for="duration" class="">
			<span>Duration</span>
			<input
				type="range"
				class="range"
				id="offset"
				bind:value={duration}
				min="100"
				max="5000"
				step="1"
			/>
		</label>
	</div>

	<div
		class="pattern text-center mx-auto my-auto h-fit -top-5 -z-10"
		style="font-family: Fern Ornaments;"
	>
		<div class="text-3xl md:text-4xl">
			{#each pattern as row, r}
				{#each row as c, i}
					<span
						bind:this={spans[i + pattern[0].length * r]}
						id={i + pattern[0].length * r}
						class="hover:opacity-100 transition-opacity opacity-10 cursor-pointer">{c}</span
					>
				{/each}
				<br />
			{/each}
		</div>
	</div>
</main>
