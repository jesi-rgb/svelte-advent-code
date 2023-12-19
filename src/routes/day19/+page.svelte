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

	function startAnimation(delay: number = timeScale) {
		// set an interval to change opacity every second
		// logic to change opacity for a random span

		let interv = setInterval(() => {
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

				setTimeout(() => {
					randomSpan.style.transition = 'none';
				}, 900);

				// fade in animation after a short delay
				setTimeout(() => {
					randomSpan.style.transition = 'all 0.8s ease-in-out';
					randomSpan.style.opacity = '.1';
					randomSpan.style.color = '#B2CCD6';
				}, 900);
			}
		}, delay);

		intervals.push(interv);
	}

	let timeScale = 1000;

	// startAnimation(1000 * timeScale); startAnimation(1300 * timeScale);
	let clear: number;
	$: {
		clearInterval(clear);
		clear = setInterval(startAnimation, timeScale);
	}

	onDestroy(() => {
		intervals.forEach((interval) => {
			clearInterval(interval);
		});
	});
</script>

<BackButton />
<Heading>Polar Lights</Heading>

<p>Christmas lights gone digital</p>

<main class="my-10">
	<input type="range" class="range" bind:value={timeScale} min="800" max="10000" step="1" />
	<div class="pattern mx-auto my-auto h-fit -top-5 -z-10" style="font-family: Fern Ornaments;">
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
