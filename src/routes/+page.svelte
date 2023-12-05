<script>
	import DayLink from '$lib/Components/DayLink.svelte';
	import Heading from '$lib/Components/Heading.svelte';
</script>

<div class="text-center mb-5 text-secondary text-4xl">
	<div style="font-family: Fern Ornaments;">W</div>
	<div style="font-family: Fern Ornaments;">ITRP</div>
	<div style="font-family: Fern Ornaments;">IGQTREFP</div>
</div>
<Heading>
	<div class="text-center">Advent of Code 2023</div></Heading
>

<p class="text-2xl">
	Compilation of the <a href="https://advent.sveltesociety.dev/#challenges" class="underline"
		>different exercises</a
	> for this year's edition.
</p>

<section class="my-10">
	<ol class="list-decimal list-inside space-y-2 flex flex-col">
		<DayLink link="/day1" title="Tally Dashboard" />
		<DayLink link="/day2" title="Cookie Counter" />
		<DayLink link="/day3" title="Sleigh Load Balancer™" />
		<DayLink link="/day4" title="Santa’s Heart Rate Monitor™" />
		<DayLink link="/day5" title="Elf Productivity Monitor" />
	</ol>
</section>

<footer>
	Made by <a href="https:jesirgb.com" class="underline hover:text-primary transition-colors"
		>Jesús Rascón</a
	>. <br /> Typeset in
	<a href="https://djr.com/fern" class="underline hover:text-primary transition-colors">Fern</a>.
	<br />
	Code in
	<a
		class="underline hover:text-primary transition-colors"
		href="https://github.com/jesi-rgb/svelte-advent-code">Github</a
	>.
</footer>
