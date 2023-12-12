export function load() {
	let data = [];

	for (let i = 1; i <= 11; i++) {
		data.push({ index: i, url: `https://advent.sveltesociety.dev/data/2023/day-twelve/${i}.png` });
	}

	return { data };
}
