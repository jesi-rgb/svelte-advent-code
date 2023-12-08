<script lang="ts">
	import type { CardType } from '$lib';
	export let card: CardType;
	export let flippedCards: number[];

	export let selected: boolean = false;
	export let foundCards: number[];

	$: found = foundCards?.includes(card.index);

	function addCard() {
		flippedCards = [...flippedCards, card.index];
	}

	$: console.log(selected);
	$: if (selected) addCard();
	// $: if (flippedCards.length == 0) selected = false;
</script>

<button
	disabled={selected || found}
	on:click={(e) => {
		e.preventDefault();
		selected = !selected;
	}}
	class="card relative w-full h-full"
>
	<div
		class:flipped={selected || found}
		style="font-family: Fern Ornaments;"
		class="w-full h-full bg-base-300 rounded-sm border absolute transition-all"
	>
		<div class="flex flex-col justify-around text-sm h-full">
			<div class="text-center text-base-content">L</div>
			<div class="text-center text-primary">J</div>
			<div class="text-center text-base-content">o</div>
		</div>
	</div>
	<img
		class="place-self-center transition-all"
		src={card.url}
		id={card.index.toString()}
		alt="Card Number {card.index}"
	/>
</button>

<style>
	.flipped {
		opacity: 0;
	}
	.card {
		transition: filter 0.2s;
		transform-style: preserve-3d;
		transform: rotateY(180deg);
		user-select: none;
		transition: transform 0.4s;
	}
</style>
