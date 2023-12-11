<script lang="ts">
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
		firstName = firstNames[hashCode(inputText) % firstNames.length];
		lastName = lastNames[hashCode(inputText) % lastNames.length];
	}
</script>

<BackButton />
<Heading>Elf Name Generator</Heading>
<p>
	Human names are lame in the North Pole™. Here, let me help you out finding an elf name for you.
</p>

<main class="my-20 mx-auto w-full">
	<div>
		<input
			bind:value={inputText}
			type="text"
			class="input text-2xl input-bordered w-full"
			placeholder="Your name here"
		/>
	</div>

	<div class="mt-5">
		<p>Your elf name is</p>
		<div class="relative">
			{#key firstName}
				<div class="text-4xl rounded-xl relative">
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
	</div>
</main>
