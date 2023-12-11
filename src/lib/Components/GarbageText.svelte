<script lang="ts">
	import { onMount } from 'svelte';

	export let originalText: string;
	let scrambledText = '';
	let transitionDuration = 700; // Adjust as needed
	let framesPerUpdate = 2; // Update every N frames

	onMount(() => {
		scrambleText();
	});

	function scrambleText() {
		let startTime;
		let frameCount = 0;

		function step(timestamp) {
			if (!startTime) {
				startTime = timestamp;
			}

			const progress = timestamp - startTime;
			const percentage = Math.min(progress / transitionDuration, 1);

			if (percentage < 1) {
				// Scramble the text during the transition
				if (frameCount === 0) {
					scrambledText = generateScrambledText(originalText, percentage);
				}

				frameCount = (frameCount + 1) % framesPerUpdate;
				requestAnimationFrame(step);
			} else {
				// Transition complete, reveal the original text
				scrambledText = originalText;
			}
		}

		requestAnimationFrame(step);
	}

	function generateScrambledText(original: string, percentage: string) {
		// Interpolate between scrambled text and original text
		const characters = '!@#$%^&*()_-+=[]{}|;:,.<>?/~`';
		let currentScramble = '';

		for (let i = 0; i < original.length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			const scrambledChar = characters.charAt(randomIndex);

			currentScramble += scrambledChar;
		}

		let percentageIndex = original.length * percentage;
		let percentageScrambled = currentScramble.slice(percentageIndex, original.length);
		let percentageOriginal = original.slice(0, percentageIndex);
		let output = percentageOriginal + percentageScrambled;

		return output;
	}

	function interpolateCharacters(char1, char2, percentage) {
		// Simple linear interpolation between characters
		const char1Code = char1.charCodeAt(0);
		const char2Code = char2.charCodeAt(0);

		const interpolatedCode = Math.round(char1Code + (char2Code - char1Code) * percentage);
		return String.fromCharCode(interpolatedCode);
	}
</script>

<div class="scrambled">{scrambledText}</div>

<style>
	.scrambled {
		display: inline-block;
	}
</style>
