import type { GroupBalance, Present } from '$lib/index';

export const groupBy = (x, f) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

export const alphabet = '^ETIANMSURWDKGOHVF L PJBXCYZQ'.split('');

function generateMorseCharacter(c: string) {
	let indexInAlphabet = alphabet.findIndex((e) => e === c);
	let morseChar = '';

	let currentChar = c;
	let parentIndex = Math.floor(indexInAlphabet / 2);

	if (parentIndex % 2 == 0) {
		parentIndex -= 1;
		morseChar += '–';
	} else {
		morseChar += '·';
	}

	while (alphabet[parentIndex] != '^') {
		let currentIndex = alphabet.findIndex((e) => e === currentChar);
		parentIndex = Math.floor(currentIndex / 2);

		if (currentIndex % 2 == 0) {
			parentIndex -= 1;
			morseChar += '–';
		} else {
			morseChar += '·';
		}

		currentChar = alphabet[parentIndex];
	}

	return morseChar.split('').reverse().slice(0, -1).join('');
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export function toMorse(data: string) {
	data = data.toUpperCase();

	const filtered = data
		.split('')
		.filter((e) => alphabet.includes(e))
		.join('');

	let words = filtered.split(' ');

	let morse: string[] = [];
	words.forEach((w) => {
		let chars = w.split('');

		let character: string[] = [];
		for (let c = 0; c < chars.length; c++) {
			character.push(generateMorseCharacter(chars[c]));
		}
		character = character.join(' ');
		morse.push(character);
	});
	morse = morse.join(' / ');
	return morse;
}

export function hashCode(text: string) {
	if (text === undefined) return;
	var hash = 0;
	for (var i = 0; i < text.length; i++) {
		var char = text.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return Math.abs(hash);
}

const MAX_LOAD = 100; // maximum weight the sleigh can support

export function autoLoadBalance(presents: Present[]): GroupBalance[] {
	let groups: GroupBalance[] = [];

	let cumWeight = 0;
	let cumIndex = 0;
	let lastIndex = 0;

	for (let i = 0; i < presents.length; i++) {
		const p = presents[i];

		cumIndex += 1;

		if (cumWeight + p.weight > MAX_LOAD) {
			groups.push({
				children: presents.slice(lastIndex, cumIndex),
				avgWeight: cumWeight / (cumIndex - 1 - lastIndex),
				weight: cumWeight,
				name: `${groups.length + 1}`
			});

			lastIndex = cumIndex - 1;
			cumWeight = 0;
		} else {
			cumWeight += p.weight;
		}
	}

	return groups;
}

export function uniform(min, max): number {
	return min + Math.random() * (max - min);
}
