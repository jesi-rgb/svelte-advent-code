<script lang="ts">
	import { fade } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Card from '$lib/Components/Card.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { CardType } from '$lib';
	import { onDestroy, onMount } from 'svelte';

	export let data;
	let cards: CardType[] = data.cards;

	let flippedCards: number[] = [];
	let foundPairs = 0;

	$: selectedCards = Array(cards.length).fill(false);
	let foundCards: number[] = [];

	function resetCards() {
		flippedCards = [];
		selectedCards = selectedCards.fill(false);
	}

	let reset_timeout: number;

	onDestroy(() => {
		clearTimeout(reset_timeout);
	});

	let startTime = new Date();
	let time = startTime;
	$: minutes = new Date(time).getMinutes();
	$: seconds = new Date(time).getSeconds();

	onMount(() => {
		const interval = setInterval(() => {
			let timeDiff = new Date() - startTime;
			time = new Date(timeDiff);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	$: if (flippedCards.length === 2) {
		if (flippedCards[0] != flippedCards[1]) {
			reset_timeout = setTimeout(() => {
				flippedCards = [];
				selectedCards = selectedCards.fill(false);
			}, 1000);
		} else {
			foundPairs += 1;
			foundCards = [...foundCards, flippedCards[0]];
			// resetCards();
			flippedCards = [];
			selectedCards = selectedCards.fill(false);
		}
	}
</script>

<BackButton />
<Heading>Santa's <em>Mysterious</em> Deck of Doubles</Heading>

<div
	class="grid grid-cols-6 md:grid-cols-12 bg-base-200 gap-1 mx-auto p-2 border-2 border-dashed rounded-xl"
>
	{#each cards as card, i}
		<Card bind:flippedCards {card} {foundCards} bind:selected={selectedCards[i]} />
	{/each}
</div>
<div class="flex justify-between items-baseline">
	<div class="text-xl mt-2 tabular-nums">
		Found pairs:

		{#key foundPairs}
			<span in:fade={{ duration: 500 }} class="font-bold">{foundPairs}</span>
		{/key}

		<span class="opacity-70">/24</span>
	</div>
	<div class="tabular-nums" style="font-feature-settings: 'case';">
		{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
	</div>
</div>
