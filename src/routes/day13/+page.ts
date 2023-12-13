import type { Present, ResponseData } from '$lib';

export async function load({ fetch }) {
	const promise: Promise<ResponseData> = await fetch(
		'https://advent.sveltesociety.dev/data/2023/day-thirteen.json'
	);
	const presents: Present[] = await promise.json();

	return { presents };
}
