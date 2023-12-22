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

<p class="text-2xl mb-10">
	Compilation of the <a href="https://advent.sveltesociety.dev/#challenges" class="underline"
		>different exercises</a
	> for this year's edition.
</p>

<section class="my-5">
	<div class="divider">
		<div style="font-family: Fern Ornaments;" class="text-2xl text-secondary">IFP</div>
	</div>
	<ol class="list-decimal list-inside space-y-3 flex flex-col items-baseline">
		<DayLink link="/day1" title="Tally Dashboard" />
		<DayLink link="/day2" title="Cookie Counter" />
		<DayLink link="/day3" title="Sleigh Load Balancer™" />
		<DayLink link="/day4" title="Santa’s Heart Rate Monitor™" />
		<DayLink link="/day5" title="Elf Productivity Monitor" />
		<DayLink link="/day6" title="BPM Counter" />
		<DayLink link="/day7" title="Morse Code Translator" />
		<DayLink link="/day8" title="Santa's Mysterious Deck of Doubles" />
		<DayLink link="/day9" title="Modern Festive Clock" />
		<DayLink link="/day10" title="Holiday Greeting Pop-Up" />
		<DayLink link="/day11" title="Elf Name Generator" />
		<DayLink link="/day12" title="Christmas Card Editor" />
		<DayLink link="/day13" title="Auto Sleigh Load Balancer™" />
		<DayLink link="/day14" title="Snow Simulator" />
		<DayLink link="/day15" title="Snow Globe" />
		<DayLink link="/day16" title="Santa's Hangar" />
		<DayLink link="/day17" title="Festive Funds" />
		<DayLink link="/day18" title="Santa's Quiz" />
		<DayLink link="/day19" title="Polar Lights" />
		<DayLink link="/day20" title="Cracker Jokes" />
		<DayLink link="/day21" title="Frightful Weather App" />
		<DayLink link="/day22" title="Snowflake Generator" />
	</ol>

	<div class="divider mt-7">
		<div style="font-family: Fern Ornaments;" class="text-center text-2xl text-secondary">IGP</div>
	</div>
</section>

<div class="opacity-70 my-10">
	<p>Some of the (auto-imposed rules) I want to follow:</p>
	<ol class="list-decimal list-inside">
		<li>
			You can <em>only</em> work on a prompt on its given day.
			<ol class="list-decimal list-inside ml-4 opacity-60 italic">
				<li>due to reasons beyond my control, this was not possible on some ambitious days</li>
			</ol>
		</li>
		<li>Use as few tools as you can. As barebones as possible.</li>
		<li>Reinvent the wheel, only if it's fun to do so.</li>
		<li>Develop a consistent style all accross the project.</li>
	</ol>
</div>

<footer class="my-10">
	<div class="divider">
		<div style="font-family: Fern Ornaments;" class="text-secondary">FRTG</div>
	</div>
	<div class="opacity-80">
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
	</div>
</footer>
