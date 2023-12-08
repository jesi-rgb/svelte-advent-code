<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
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

	let reset_timeout: number;

	onDestroy(() => {
		clearTimeout(reset_timeout);
	});

	let startTime = new Date();
	let time = new Date() - startTime;
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
			}, 700);
		} else {
			foundPairs += 1;
			foundCards = [...foundCards, flippedCards[0]];
			flippedCards = [];
			selectedCards = selectedCards.fill(false);
		}
	}
</script>

<BackButton />
<Heading>Santa's <em>Mysterious</em> Deck of Doubles</Heading>
<p>
	There are 24 pairs of cards. Tap on two cards to see if they're the same. They'll flip back if
	not, so pay attention!
</p>

<div
	class="grid grid-cols-6 md:grid-cols-12 bg-base-200 mt-10 gap-1 mx-auto p-2 border-2 border-dashed rounded-xl"
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

{#if foundPairs === 24}
	<div class="confetti" use:confetti={{ stageWidth: innerWidth, stageHeight: outerWidth }} />
{/if}

<style>
	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
</style>
