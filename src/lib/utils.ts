export const groupBy = (x, f) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

const alphabet = '^ETIANMSURWDKGOHVF L PJBXCYZQ'.split('');

function generateMorseCharacter(c: string) {
	let indexInAlphabet = alphabet.findIndex((e) => e === c);
	let morseChar = '';

	let currentChar = c;
	let parentIndex = Math.floor(indexInAlphabet / 2);

	if (parentIndex % 2 == 0) {
		parentIndex -= 1;
		morseChar += '-';
	} else {
		morseChar += '.';
	}

	while (alphabet[parentIndex] != '^') {
		let currentIndex = alphabet.findIndex((e) => e === currentChar);
		parentIndex = Math.floor(currentIndex / 2);

		if (currentIndex % 2 == 0) {
			parentIndex -= 1;
			morseChar += '-';
		} else {
			morseChar += '.';
		}

		currentChar = alphabet[parentIndex];
	}

	return morseChar.split('').reverse().slice(0, -1).join('');
}

export function toMorse(data: string) {
	data = data.toUpperCase();
	let words = data.split(' ');

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
