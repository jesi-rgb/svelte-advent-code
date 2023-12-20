<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onDestroy, onMount } from 'svelte';

	export let data;

	const jokes = data.jokes;
	let offset = 3 * 1000;

	let utteranceSetup: SpeechSynthesisUtterance;
	let utterancePunchLine: SpeechSynthesisUtterance;

	let seconds: number = 0;
	let joke: string;
	let setup: string;
	let punchLine: string;
	let totalTime: number;
	onMount(() => {
		let voices = window.speechSynthesis.getVoices();
		joke = jokes[parseInt(Math.random() * jokes.length)];

		setup = joke.split('?')[0];
		punchLine = joke.split('?')[1];

		totalTime = parseInt(setup.split(' ').length * 200);

		utteranceSetup = new SpeechSynthesisUtterance(setup);
		utterancePunchLine = new SpeechSynthesisUtterance(punchLine);
	});
</script>

<BackButton />

<Heading>Cracker Jokes!</Heading>
<p>Let's have some fun</p>

<main class="my-10">
	<button
		class="btn btn-lg btn-outline text-3xl btn-primary mx-auto w-full"
		on:click={() => {
			seconds = 0;
			speechSynthesis.speak(utteranceSetup);

			let interval = setInterval(() => {
				seconds += 1 / 100;
			}, 10);

			setTimeout(() => {
				speechSynthesis.speak(utterancePunchLine);
				clearInterval(interval);
			}, totalTime + offset);
		}}>Play joke</button
	>
	<progress class="progress" value={seconds} max={(totalTime + offset) / 1000}></progress>
</main>
