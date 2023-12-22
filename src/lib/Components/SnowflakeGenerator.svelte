<script>
	export let trees = 4;
	export let randomness = 0;
	export let stagger = 0.5;

	export let nBranches = 5;
	export let branchLength = 30;

	let width = 400,
		height = 400;
	export let margin = 10;

	$: randomVals = Array(nBranches);
	$: for (let index = 0; index < randomVals.length; index++) {
		randomVals[index] = Math.random() * (height / 2) * randomness;
	}
</script>

<div bind:clientWidth={width} class="border-2 border-dashed rounded-xl my-5 bg-base-300">
	<svg {width} {height}>
		<g style="--tree-count:{trees}">
			<g id="tree">
				<!-- trunk -->
				<line
					x1={width / 2}
					y1={height / 2}
					x2={width / 2}
					y2={margin}
					stroke-width="4"
					stroke-linecap="round"
					class="stroke-base-content"
				/>

				<g id="branches">
					{#each { length: nBranches } as b, i}
						<line
							x1={width / 2}
							y1={randomVals[i] + (height / 2) * ((i + 1) / nBranches) + margin}
							x2={width / 2 -
								branchLength * ((nBranches - i) / nBranches) * stagger +
								randomVals[i] * 0.5}
							y2={randomVals[i] +
								(height / 2) * ((i + 1) / nBranches) -
								branchLength * ((nBranches - i) / nBranches) * stagger +
								randomVals[i] * 0.5 +
								margin}
							stroke-width={2 * ((nBranches - i) / nBranches)}
							opacity={(nBranches - i) / nBranches}
							stroke-linecap="round"
							class="stroke-base-content"
						/>
					{/each}
				</g>

				<use href="#branches" class="flipped-branches" />
			</g>
			{#each { length: trees - 1 } as t, ti}
				<use href="#tree" class="rotated-trees" style="--index: {ti + 1};" />
			{/each}
		</g>
	</svg>
</div>

<style>
	.flipped-branches {
		scale: -1 1;
		transform-origin: center;
	}

	.rotated-trees {
		rotate: calc(360deg / var(--tree-count) * var(--index));
		transform-origin: center;
	}
</style>
