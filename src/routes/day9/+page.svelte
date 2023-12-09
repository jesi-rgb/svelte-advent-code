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
	let spans: HTMLElement[] = [];
	let randomSpan: HTMLElement;

	function startAnimation() {
		// set an interval to change opacity every second
		animationInterval = setInterval(() => {
			// logic to change opacity for a random span
			const randomIndex = Math.floor(Math.random() * patternLength);
			randomSpan = spans[randomIndex];

			randomSpan.style.transition = 'opacity 0.5s ease-in-out';
			randomSpan.style.opacity = '0.2';

			setTimeout(() => {
				randomSpan.style.transition = 'none';
			}, 900);

			// fade in animation after a short delay
			setTimeout(() => {
				randomSpan.style.transition = 'opacity 0.5s ease-in-out';
				randomSpan.style.opacity = '1';
			}, 900);
		}, 1000);
	}

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date(christmas - new Date());
		}, 1000);

		startAnimation();
		return () => {
			clearInterval(interval);
		};
	});
	onDestroy(() => {
		clearInterval(animationInterval);
	});
</script>

<BackButton />
<Heading>Modern Festive Clock</Heading>

<p>How much time is there left until Christmas?</p>

<main class="my-32 md:my-52 relative w-full mx-auto">
	<div
		class="absolute overflow-x-clip pattern bottom-[-120px] md:bottom-[-167px] w-fit mx-auto left-0 right-0"
		style="font-family: Fern Ornaments;"
	>
		<div class="text-2xl md:text-5xl md:mx-auto md:w-fit">
			{#each pattern as row, r}
				{#each row as c, i}
					<span
						bind:this={spans[i + pattern[0].length * r]}
						id={i + pattern[0].length * r}
						class="hover:text-secondary transition-colors cursor-pointer">{c}</span
					>
				{/each}
				<br />
			{/each}
		</div>
	</div>
	<div
		style="font-family: Segments;"
		class="clock bg-base-100 bg-opacity-80 w-full mx-auto rounded-xl border-2 border-dashed p-4 md:p-8 text-center text-4xl md:text-7xl"
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
	.clock {
		filter: drop-shadow(0px 0px 1px #b2ccd6);
	}
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
