<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { toMorse } from '$lib/utils';
	import { onMount } from 'svelte';

	let inputText = 'Svelte Advent of Code';

	$: outputText = toMorse(inputText);

	let context: AudioContext, o: OscillatorNode, g: GainNode;

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function playMorseCode() {
		const morseCode = outputText;
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const timeUnit = 100; // Adjust as needed
		const characterPauseDuration = 4 * timeUnit;

		const morseMap = {
			'·': { frequency: 523.3, duration: timeUnit },
			'–': { frequency: 493.9, duration: 3 * timeUnit },
			' ': { frequency: 0, duration: timeUnit }, // Pause
			'/': { frequency: 0, duration: timeUnit } // Pause
		};

		async function playSignal(symbol) {
			const oscillator = audioContext.createOscillator();
			const g: GainNode = audioContext.createGain();
			oscillator.connect(g);

			g.connect(audioContext.destination);
			oscillator.type = 'triangle';

			if (symbol === ' ') {
				// Pause between characters
				oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
				await sleep(characterPauseDuration);
			} else {
				oscillator.frequency.setValueAtTime(morseMap[symbol].frequency, audioContext.currentTime);
				oscillator.start();
				// oscillator.stop(audioContext.currentTime + morseMap[symbol].duration / 1000);
				g.gain.linearRampToValueAtTime(
					0.00001,
					audioContext.currentTime + morseMap[symbol].duration / 1000
				);

				await sleep(morseMap[symbol].duration);
			}
		}

		for (let i = 0; i < morseCode.length; i++) {
			const symbol = morseCode[i];
			document.getElementById(i.toString()).style.color = '#FE7D5C';
			await playSignal(symbol);

			document.getElementById(i.toString()).style.color = '#B2CCD6';
			// Add a small pause between dots and dashes within the same character
			await sleep(50); // Adjust as needed
		}

		// Close the audio context after the entire sequence is played
		audioContext.close();
	}
</script>

<BackButton />

<Heading>Morse Code Translator</Heading>

<main class="my-10 w-full mx-auto">
	<label for="inputMorse">
		<span class="opacity-70 italic">Input text</span>
		<input
			id="inputMorse"
			type="text"
			bind:value={inputText}
			placeholder="Input text"
			class="text-2xl w-full input input-bordered"
		/>
	</label>
	<div class="bg-base-200 px-5 py-4 rounded-xl mt-5 border-2 border-dashed border-base-300">
		<div class="italic">Output</div>
		<div class="text-3xl font-bold">
			{#each outputText as c, i}
				{#if c === ' '}
					<span id={i.toString()} class="opacity-5">_</span>
				{:else if c === '/'}
					<span id={i.toString()} class="opacity-50">{c}</span>
				{:else}
					<span id={i.toString()}>{c}</span>
				{/if}
			{/each}
		</div>
	</div>
	<button class="btn btn-outline mt-5" on:click={playMorseCode}> Play! </button>
</main>
