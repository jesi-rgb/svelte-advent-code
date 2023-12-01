<script>
	async function fetchElves() {
		let elvesPromise = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		return await elvesPromise.json();
	}
	//yea
</script>

{#await fetchElves()}
	loading...
{:then elves}
	<ol
		class="h-[300px] overflow-y-scroll border border-dashed rounded-xl p-4 [&_div:last-child]:border-none text-xl"
	>
		{#each elves as e}
			<div class="flex justify-between border-b py-1">
				<span>{e.name}</span>

				<span class="tabular-nums">{e.tally}</span>
			</div>
		{/each}
	</ol>
{/await}
