<script>
	import { fade } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onMount } from 'svelte';

	let christmas = new Date('12/25/2023');
	let now = new Date();
	let time = new Date(christmas - now);

	$: days = time.getDate().toString().padStart(2, '0');
	$: hours = time.getHours().toString().padStart(2, '0');
	$: minutes = time.getMinutes().toString().padStart(2, '0');
	$: seconds = time.getSeconds().toString().padStart(2, '0');
	$: dots = seconds % 2 == 0;

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date(christmas - new Date());
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

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
</script>

<BackButton />
<Heading>Modern Festive Clock</Heading>

<p>How much time is there left until Christmas?</p>

<main class="my-32 md:my-52 relative w-full mx-auto">
	<div
		class="absolute pattern bottom-[-120px] md:bottom-[-167px] w-fit mx-auto left-0 right-0"
		style="font-family: Fern Ornaments;"
	>
		<div class="text-2xl md:text-5xl md:mx-auto md:w-fit">
			{#each pattern as row}
				{#each row as c}
					<span class="hover:text-secondary transition-all cursor-pointer opacity-80">{c}</span>
				{/each}
				<br />
			{/each}
		</div>
	</div>
	<div
		style="font-family: Segments;"
		class="clock backdrop-blur-md w-full mx-auto rounded-xl border-2 border-dashed p-4 md:p-8 text-center text-4xl md:text-7xl"
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
		filter: drop-shadow(0px 0px 2px #2a303c);
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
