import type { DestinationResponse } from '$lib/index';

export async function load({ fetch }): Promise<DestinationResponse> {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-twenty-four.json');

	const destinations: DestinationResponse = await promise.json();

	for (let index = 1; index < destinations.history.length; index++) {
		const curr = destinations.history[index].presentsDelivered;
		const prev = destinations.history[index - 1].presentsDelivered;

		destinations.history[index]['numberPresents'] = curr - prev;
	}

	return destinations;
}
