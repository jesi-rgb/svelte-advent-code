<script lang="ts">
	import { fly } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { NamesList } from '$lib';
	import { hashCode } from '$lib/utils';
	import GarbageText from '$lib/Components/GarbageText.svelte';

	export let data: NamesList;

	const firstNames = data.firstNames;
	const lastNames = data.lastNames;

	let inputText: string;

	let firstName: string, lastName: string;
	$: if (inputText == '' || inputText == undefined) {
		firstName = '';
		lastName = '';
	} else {
		const trimmed = inputText.trim();
		firstName = firstNames[hashCode(trimmed) % firstNames.length];
		lastName = lastNames[hashCode(trimmed) % lastNames.length];
	}
</script>

<BackButton />
<Heading>Elf Name Generator</Heading>
<p>
	Human names are lame in the North Pole™. Here, let me help you out finding an elf name for you.
</p>

<main class="my-20 mx-auto w-full">
	<div>
		<label for="inputName">
			<span class="opacity-70">What's your <em>human</em> name?</span>
			<input
				bind:value={inputText}
				id="inputName"
				type="text"
				class="input text-2xl input-bordered w-full"
				placeholder="Your name here"
			/>
		</label>
	</div>

	<div class="mt-5 text-2xl">
		{#if firstName && lastName}
			<p in:fly={{ x: -20, duration: 400 }} class="mb-3">Your <em>elf</em> name is:</p>
			<div class="relative">
				{#key firstName}
					<div class="text-4xl md:text-5xl">
						<span class="names text-primary">
							<GarbageText originalText={firstName} />
						</span>
						<br />
						<span class="names text-accent">
							<GarbageText originalText={lastName} />
						</span>
					</div>
				{/key}
			</div>
		{/if}
	</div>
</main>
