<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import Snow from '$lib/Components/Snow.svelte';
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

	const patternLength = pattern[0].length * pattern.length;
	let animationInterval: number;
	let animationInterval2: number;
	let spans: HTMLElement[] = [];
	// let randomSpan: HTMLElement;

	function startAnimation(delay: number = 1000) {
		// set an interval to change opacity every second
		let interv;
		interv = setInterval(() => {
			// logic to change opacity for a random span
			const randomIndex = Math.floor(Math.random() * patternLength);
			let randomSpan = spans[randomIndex];

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
		}, delay);
		return interv;
	}

	onMount(() => {
		startAnimation(800);
		startAnimation(1000);
		startAnimation(1300);
	});
	onDestroy(() => {
		clearInterval(animationInterval);
		clearInterval(animationInterval2);
	});
</script>

<BackButton />
<Heading>Snow Globe</Heading>

<p>Cybernetically enhanced Snow Globes</p>

<main class="my-10">
	<div
		class="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-opacity-0 mx-auto rounded-full border-8 border-dashed border-base-content"
	>
		<div class="relative w-full h-full rounded-full mask mask-circle">
			<div
				class="text-3xl md:text-4xl w-full drop-shadow-lg z-10 balance font-bold text-center stroke-base-100 stroke-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
			>
				Happy Svelte Advent of Code!
			</div>
			<Snow fullScreen={false} weight={0.31} rate={0.4} wind={2.3} />

			<div
				class="absolute pattern mx-auto my-auto h-fit -top-5 -z-10"
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
		</div>
	</div>
</main>

<style>
	.pattern {
		left: 50%;
		transform: translateX(-50%);
	}
	.balance {
		text-wrap: balance;
	}
</style>
