<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { toMorse } from '$lib/utils';
	import { onMount } from 'svelte';

	let inputText = 'Svelte Advent of Code';

	$: outputText = toMorse(inputText);

	let context, o, g;

	// onMount(() => {
	// 	context = new AudioContext();
	// 	o = context.createOscillator();
	// 	o.type = 'triangle';
	// 	o.frequency.setValueAtTime(440, context.currentTime); //
	// 	g = context.createGain();
	//
	// 	// g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);
	// });
</script>

<BackButton />

<Heading>Morse Code Translator</Heading>

<main class="my-10 w-full mx-auto">
	<label for="inputMorse">
		<span class="opacity-70">Input text</span>
		<input
			id="inputMorse"
			type="text"
			bind:value={inputText}
			placeholder="Input text"
			class="text-2xl w-full input input-bordered"
		/>
	</label>
	<div class="bg-base-200 px-5 py-4 rounded-xl mt-5">
		<div>Output</div>
		<div class="text-primary text-3xl font-bold">{outputText}</div>
	</div>
</main>
