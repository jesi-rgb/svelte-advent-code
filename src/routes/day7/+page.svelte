<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { toMorse } from '$lib/utils';

	// left = dot, right = dash

	toMorse('Hello World');
</script>

<BackButton />

<Heading>Morse Code Translator</Heading>

<main class="my-10 w-full">
	<input type="text" placeholder="Input text" class="input input-bordered w-full max-w-xs" />
	<div class="input input-bordered">Output</div>
</main>
