const NUM_CARDS = 24;

import { shuffle } from '$lib/utils';
export async function load({ fetch }) {
	let cards = [];
	for (let i = 1; i <= NUM_CARDS; i++) {
		let url = `https://advent.sveltesociety.dev/data/2023/day-eight/${i}.png`;
		cards.push({ index: i, url: url });
		cards.push({ index: i, url: url });
	}

	// shuffle(cards);
	return { cards };
}
