<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import SnowflakeGenerator from '$lib/Components/SnowflakeGenerator.svelte';

	let trees = 6;
	let randomness = 0;
	let stagger = 1;

	let nBranches = 5;
	let branchLength = 35;
	let margin = 10;
</script>

<BackButton />

<Heading>Snowflake Generator</Heading>

<p>Let us model mother nature inside our shiny bright box that is our computer.</p>

<main>
	<SnowflakeGenerator {nBranches} {stagger} {branchLength} {margin} {trees} {randomness} />

	<label for="margin">
		<span>Margin: {margin}</span>
		<input class="range" id="margin" type="range" min="0" max="100" step="1" bind:value={margin} />
	</label>

	<label for="nbranches">
		<span>No. Branches: {nBranches}</span>
		<input id="nbranches" class="range" type="range" min="1" max="30" bind:value={nBranches} />
	</label>

	<label for="branchlength">
		<span>Branch length: {branchLength}</span>
		<input
			class="range"
			id="branchlength"
			type="range"
			min="1"
			max="80"
			bind:value={branchLength}
		/>
	</label>

	<label for="trees">
		<span>No. Trees: {trees}</span>
		<input class="range" id="trees" type="range" min="3" max="30" bind:value={trees} />
	</label>

	<label for="stagger">
		<span>Stagger branch length: {stagger}</span>
		<input
			class="range"
			id="stagger"
			type="range"
			min="0"
			max="2"
			step=".01"
			bind:value={stagger}
		/>
	</label>

	<label for="randomness">
		<span>Randomness: {randomness}</span>
		<input
			class="range"
			id="randomness"
			type="range"
			min="0"
			max="1"
			step=".01"
			bind:value={randomness}
		/>
	</label>
</main>
