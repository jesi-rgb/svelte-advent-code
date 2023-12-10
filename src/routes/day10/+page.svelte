<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import DialogChristmas from '$lib/Components/DialogChristmas.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	let seconds: number;
</script>

<BackButton />

<Heading>Holiday Greeting Pop-Up</Heading>

<p class="text-3xl my-20 text-center font-bold">Wait for it... {seconds}</p>

<DialogChristmas bind:seconds />
