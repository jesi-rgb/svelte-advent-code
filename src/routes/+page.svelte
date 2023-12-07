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
	<div class="text-center font-normal">ADVENT OF CODE 2023</div></Heading
>

<p class="text-2xl">
	Compilation of the <a href="https://advent.sveltesociety.dev/#challenges" class="underline"
		>different exercises</a
	> for this year's edition.
</p>

<section class="my-10">
	<div style="font-family: Fern Ornaments;" class="text-center text-2xl text-secondary mb-3">
		IFP
	</div>
	<ol class="list-decimal list-inside space-y-2 flex flex-col">
		<DayLink link="/day1" title="Tally Dashboard" />
		<DayLink link="/day2" title="Cookie Counter" />
		<DayLink link="/day3" title="Sleigh Load Balancer™" />
		<DayLink link="/day4" title="Santa’s Heart Rate Monitor™" />
		<DayLink link="/day5" title="Elf Productivity Monitor" />
		<DayLink link="/day6" title="BPM Counter" />
		<DayLink link="/day7" title="Morse Code Translator" />
	</ol>
	<div style="font-family: Fern Ornaments;" class="text-center text-2xl text-secondary mt-3">
		IGP
	</div>
</section>

<div class="opacity-70 my-10">
	<p>Some of the (auto-imposed rules) I want to follow:</p>
	<ol class="list-decimal list-inside">
		<li>You can <em>only</em> work on a prompt on its given day.</li>
		<li>Use as few tools as you can. As barebones as possible.</li>
		<li>Reinvent the wheel, only if it's fun to do so.</li>
		<li>Develop a consistent style all accross the project.</li>
	</ol>
</div>

<footer class="opacity-80">
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
