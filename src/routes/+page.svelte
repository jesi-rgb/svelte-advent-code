<script>
	//yea

	import DayLink from '$lib/Components/DayLink.svelte';
	import Heading from '$lib/Components/Heading.svelte';
</script>

<Heading>Advent of Code for Svelte 2023</Heading>

<p class="text-2xl">Compilation of the different days of advent of code for this year's edition.</p>

<section class="my-10">
	<ol class="list-decimal space-y-2 flex flex-col">
		<DayLink link="/day1" title="Tally Dashboard" />
		<DayLink link="/day2" title="Cookie Counter" />
	</ol>
</section>
