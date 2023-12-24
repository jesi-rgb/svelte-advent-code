import type { DestinationResponse } from '$lib/index';

export async function load({ fetch }): Promise<DestinationResponse> {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-twenty-four.json');

	const destinations: DestinationResponse = await promise.json();

	return destinations;
}
