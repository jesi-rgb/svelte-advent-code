export async function load({ fetch }) {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-eighteen.json');
	const questions = await promise.json();

	return { questions };
}
