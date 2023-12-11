import type { NamesList } from '$lib';

export async function load({ fetch }) {
	const promise: Promise<NamesList> = await fetch(
		'https://advent.sveltesociety.dev/data/2023/day-eleven.json'
	);

	const names = promise.json();
	return names;
}
