export async function load({ fetch }) {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-twenty-three.json');
	let messages = await promise.json();

	messages.reverse();

	return { messages };
}
