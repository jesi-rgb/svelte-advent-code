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
</script>

<BackButton />
<Heading>Modern Festive Clock</Heading>

<p>How much time is there left until Christmas?</p>

<main class="my-20">
	<div
		style="font-family: Segments;"
		class="clock bg-base-200 w-fit mx-auto rounded-xl border-2 border-dashed p-4 md:p-8 text-center text-2xl md:text-7xl font-bold tabular-nums"
	>
		<span class="text-xl md:text-3xl opacity-70">
			{days} d
		</span>

		{hours}:{minutes}

		<span class="dots" class:on={!dots} class:off={dots}>:</span>

		{seconds}
	</div>
</main>

<style>
	.clock {
		filter: drop-shadow(0px 0px 30px #b2ccd699);
	}
	.dots {
		transition: opacity 0.4s;
	}
	.on {
		opacity: 1;
	}
	.off {
		opacity: 0;
	}
</style>
