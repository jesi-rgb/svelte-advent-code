export async function load({ fetch }) {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-sixteen.json');
	const presents = await promise.json();

	return { presents };
}
