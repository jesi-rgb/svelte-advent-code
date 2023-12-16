export async function load({ fetch }) {
	const promise = await fetch('https://advent.sveltesociety.dev/data/2023/day-sixteen.json');
	const presents = await promise.json();

	let presents3D = [];
	let slots = {};
	for (const i in presents) {
		const p = presents[i];
		let currSlot = `${p.x},${p.y}`;

		if (slots[currSlot] != undefined) {
			presents3D.push({ x: p.x, y: p.y, z: slots[currSlot] });
			slots[currSlot] = slots[currSlot] + 1;
		} else {
			slots[currSlot] = 0;
		}
	}

	return { presents3D };
}
