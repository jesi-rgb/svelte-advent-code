<script>
	import { scale, fade } from 'svelte/transition';
	import Heading from '$lib/Components/Heading.svelte';
	import { backIn, backOut, elasticOut } from 'svelte/easing';
	import BackButton from '$lib/Components/BackButton.svelte';

	let cookies = 0;

	let message = '';
	$: switch (cookies) {
		case 1:
			message = "Yup, let's start";
			break;
		case 3:
			message = 'Yes... continue';
			break;
		case 5:
			message = 'More, clearly not enough';
			break;
		case 10:
			message = 'Yea... that kinda feels better';
			break;
		case 13:
			message = 'More...';
			break;
		case 15:
			message = 'Mooore...';
			break;
		case 17:
			message = 'Huh, Im loving this';
			break;
		case 20:
			message = 'Oof...';
			break;
		case 25:
			message = "So... how's your day going?";
			break;
		case 30:
			message = 'This is pretty tiring, ya know...';
			break;
		case 35:
			message = "Presents, elves, world tour... I'm kinda tired of this";
			break;
		case 40:
			message = "It's always 'when are you coming, Santa?'";
			break;
		case 45:
			message = "But never 'how are you, Santa?'";
			break;
		case 50:
			message = 'And that gets tiring over time.';
			break;
		case 55:
			message = 'Also, I never get any presents myself.';
			break;
		case 60:
			message = "It's like... I am the protagonist but <em>really</em> no one cares about me.";
			break;
		case 65:
			message = 'Only about the presents.';
			break;
		case 70:
			message = 'But well. It is what it is.';
			break;
		case 75:
			message = "I didn't choose this, ya know?";
			break;
		case 80:
			message = "This was my father's labor. I'm just in charge now that he's gone.";
			break;
		case 85:
			message = "I really loved him. I'm doing this for him";
			break;
		case 90:
			message = 'I wonder if he had the same problem';
			break;
		case 95:
			message = "Maybe it's just a <em>me</em> thing.";
			break;
		case 100:
			message = 'Nevermind. Gotta get back to work.<br/><strong>Be good</strong>.';
			break;
	}
</script>

<BackButton />
<Heading>Cookie Counter</Heading>

<div class="w-2/3">
	<p>
		Santa wants to eat cookies and know how many. Little does he know that <em>that</em> is impossible
		to know!
	</p>

	<p class="opacity-50">
		Note: you can use the arrows → ← in your keyboard to play this little game
	</p>
</div>

<main class="w-1/2 mx-auto mt-10">
	<div class="flex justify-between w-full items-center">
		<button class="btn btn-outline text-4xl font-bold" on:click={() => (cookies -= 1)}>–</button>
		<div class="tabular-nums font-bold text-2xl">{cookies}</div>
		<button class="btn btn-outline text-4xl font-bold" on:click={() => (cookies += 1)}>+</button>
	</div>
	{#key message}
		<p in:fade class="text-center my-5 h-24 p-4 rounded-xl">{@html message}</p>
	{/key}
	<div class="p-4 bg-base-200 mt-10 rounded-xl border-2 border-dashed mx-auto">
		<div class="grid grid-cols-5 gap-4">
			{#each { length: cookies } as c}
				<div
					in:scale={{ easing: backOut, duration: 100 }}
					out:scale={{ easing: backIn, duration: 100 }}
					class="text-5xl text-center"
				>
					🍪
				</div>
			{/each}
		</div>
	</div>
</main>

<svelte:window
	on:keydown={(e) => {
		if (e.key === 'ArrowLeft') {
			cookies = cookies - 1;
		}
		if (e.key === 'ArrowRight') {
			cookies = cookies + 1;
			console.log(cookies);
		}
	}}
/>
