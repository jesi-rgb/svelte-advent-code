<script lang="ts">
	type Elf = {
		name: string;
		tally: number;
	};
	async function fetchElves() {
		let elvesPromise = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
		let elves = await elvesPromise.json();

		elves.sort((b: Elf, a: Elf) => a.tally - b.tally);

		return elves;
	}
</script>

{#await fetchElves()}
	loading...
{:then elves}
	<div class="h-[600px] overflow-y-scroll rounded-xl border hide-scrollbar">
		<table class="table table-lg table-pin-rows">
			<thead class="text-xl text-base-content">
				<tr class="bg-base-200">
					<th>Name</th>
					<th class="text-right">Tally</th>
				</tr>
			</thead>
			<tbody>
				{#each elves as e}
					<tr class="hover:bg-primary hover:text-primary-content transition-all hover:font-bold">
						<td>{e.name}</td>

						<td class="tabular-nums text-right">{e.tally}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/await}

<style>
	.hide-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: transparent transparent;

		&::-webkit-scrollbar {
			width: 0px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: transparent;
		}
	}
</style>
