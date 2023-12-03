<script lang="ts">
	type Present = {
		name: string;
		weight: number;
		isChecked: boolean;
		id: number;
	};

	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';

	export let data;
	let presents: Present[] = data.data;

	$: selectedSum = presents.reduce((sum, item) => (item.isChecked ? sum + item.weight : sum), 0);
	$: weightLeft = 100 - selectedSum;

	function handleCheckboxChange(id: number) {
		presents = presents.map((item) =>
			item.id === id ? { ...item, isChecked: !item.isChecked } : item
		);
	}
</script>

<BackButton />
<Heading>Sleigh Load Balancer™</Heading>

<p>Let's pack this booga up.</p>

<div class="mx-auto w-min flex flex-col space-y-3 my-10">
	<div class="tabular-nums">
		<span class="font-bold">{selectedSum.toFixed(2)}</span> kg out of 100 kg max.
	</div>
	<svg height="50px" class="my-10 border-2 border-dashed border-base-content rounded-xl">
		<rect x="0" y="0" height="100px" width="{selectedSum}%" class="fill-primary" />
	</svg>

	{#if presents}
		<div class="border-2 border-dashed border-base-content rounded-xl h-[500px] overflow-y-scroll">
			<table class="table table-lg font-normal mx-auto table-pin-rows">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th class="text-right">Weight</th>
					</tr>
				</thead>
				<tbody>
					{#each presents as p, i}
						<tr class="">
							<th
								><input
									type="checkbox"
									disabled={p.weight > weightLeft && p.isChecked == false}
									id={i.toString()}
									on:change={() => handleCheckboxChange(i)}
									class="checkbox checkbox-lg"
								/></th
							>
							<th>
								{p.name}
							</th>
							<th class="text-right tabular-nums">{p.weight}</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
