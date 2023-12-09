<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onDestroy, onMount } from 'svelte';

	let christmas = new Date('12/25/2023');
	let now = new Date();
	let time = new Date(christmas - now);

	const pattern = [
		'RHJTRHJTRHJTRHJHJTRHJTRHJTRHJT',
		'hrtjhrtjhrtjhrtrtjhrtjhrtjhrtj',
		'jfghjfghjfghjfgfghjfghjfghjfgh',
		'FJHGFJHGFJHGFJHJHGFJHGFJHGFJHG',
		'RHJTRHJTRHJTRHJHJTRHJTRHJTRHJT',
		'FJHGFJHGFJHGFJHJHGFJHGFJHGFJHG',
		'RHJTRHJTRHJTRHJHJTRHJTRHJTRHJT',
		'hrtjhrtjhrtjhrtrtjhrtjhrtjhrtj',
		'jfghjfghjfghjfgfghjfghjfghjfgh',
		'FJHGFJHGFJHGFJHJHGFJHGFJHGFJHG'
	];

	const patternLength = pattern[0].length * pattern.length;

	$: days = time.getDate().toString().padStart(2, '0');
	$: hours = time.getHours().toString().padStart(2, '0');
	$: minutes = time.getMinutes().toString().padStart(2, '0');
	$: seconds = time.getSeconds().toString().padStart(2, '0');
	$: dots = parseInt(seconds) % 2 == 0;

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
		const interval = setInterval(() => {
			time = new Date(christmas - new Date());
		}, 1000);

		startAnimation(800);
		startAnimation(1000);
		startAnimation(1300);
		startAnimation(1600);
		startAnimation(1900);
		startAnimation(2000);

		return () => {
			clearInterval(interval);
		};
	});
	onDestroy(() => {
		clearInterval(animationInterval);
		clearInterval(animationInterval2);
	});
</script>

<BackButton />
<Heading>Modern Festive Clock</Heading>

<p>How much time is there left until Christmas?</p>

<main class="my-32 md:my-52 relative w-full mx-auto">
	<div
		class="absolute -z-10 pattern bottom-[-120px] md:bottom-[-167px] w-fit mx-auto left-0 right-0"
		style="font-family: Fern Ornaments;"
	>
		<div class="text-2xl md:text-5xl md:mx-auto md:w-fit">
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
	<div
		style="font-family: Segments;"
		class="bg-base-100 w-full mx-auto rounded-xl border-2 border-dashed p-4 md:p-8 text-center text-4xl md:text-7xl"
	>
		<span class="text-base md:text-3xl opacity-70">
			{days} d
		</span>

		{hours}:{minutes}

		<span class="dots" class:on={!dots} class:off={dots}>:</span>

		{seconds}
	</div>
</main>

<style>
	.dots {
		transition: opacity 0.3s;
	}
	.on {
		opacity: 1;
	}
	.off {
		opacity: 0;
	}
	.pattern {
		left: 50%;
		transform: translateX(-50%);
	}
</style>
