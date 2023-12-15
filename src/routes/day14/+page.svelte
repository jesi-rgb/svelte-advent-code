<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import Snow from '$lib/Components/Snow.svelte';

	let size: number = 1;
	let rate: number = 3;
	let wind: number = 1;
	let weight: number = 1;
</script>

<BackButton />
<Heading>Snow Simulator</Heading>

<p>Let it snow! Now with adjustable parameters for maximum convenience.</p>

<Snow {size} {rate} {wind} {weight} />

<main class="my-10">
	<label for="size">
		<span>size</span>
		<input id="size" bind:value={size} type="range" min="0.01" max="6" step="0.01" class="range" />
	</label>
	<label for="rate">
		<span>rate</span>
		<input id="rate" bind:value={rate} type="range" min="1" max="100" class="range" />
	</label>

	<label for="wind">
		<span>wind</span>
		<input id="wind" bind:value={wind} type="range" min=".1" max="20" step=".01" class="range" />
	</label>

	<label for="weight">
		<span>weight</span>
		<input id="weight" bind:value={weight} type="range" min=".1" max="10" step=".1" class="range" />
	</label>
</main>
