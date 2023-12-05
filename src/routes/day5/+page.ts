export async function load({ fetch }) {
	let promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json');
	let json = await promise.json();
	return { data: json.reverse() };
}
