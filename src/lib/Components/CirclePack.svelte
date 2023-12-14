<script>
	// from https://svend3r.dev/charts/circlePack
	import {
		hierarchy,
		interpolateHcl,
		scaleOrdinal,
		interpolateZoom,
		pack,
		scaleLinear,
		transition
	} from 'd3';

	export let data;

	let width = 800; //the outer width of the chart, in pixels
	const height = width; // the outer height of the chart, in pixels
	const margin = 20; //the overall margin between the circle packs to the viewport edge
	const backgroundColor = 'transparent'; // the background color of the chart
	const fontSize = 10; //the font size of the text labels

	const color = scaleOrdinal().domain([2, 1, 0]).range(['#FF7D5C', '#B2CCD6', '#20252E']);

	const packFunc = (pData) =>
		pack()
			.size([width - margin, height - margin])
			.padding(3)(
			hierarchy({ children: pData })
				.sum((d) => d.weight)
				.sort((a, b) => b.weight - a.weight)
		);

	const root = packFunc(data);
	let activeFocus = root;
	let view;
	let activeZoomK = (width / root.r) * 2;
	let activeZoomA = root.x;
	let activeZoomB = root.y;

	const inactiveZoomTo = (v) => {
		activeZoomK = width / v[2];
		view = v;
		activeZoomA = v[0];
		activeZoomB = v[1];
	};

	inactiveZoomTo([root.x, root.y, root.r * 2 + margin]);

	const zoom = (d, e) => {
		e.stopPropagation();
		const activeFocus0 = activeFocus;

		activeFocus = d;

		transition()
			.duration(750)
			.tween('zoom', () => {
				var i = interpolateZoom(view, [activeFocus.x, activeFocus.y, activeFocus.r * 2 + margin]);
				return function (t) {
					inactiveZoomTo(i(t));
				};
			});
	};
	$: console.log(root.descendants());
</script>

<div bind:clientWidth={width}>
	<svg
		{width}
		{height}
		style="background: {backgroundColor};"
		class="w-full bg-base-200 border-dashed border-2 rounded-xl"
		on:click={(e) => zoom(root, e)}
	>
		<g transform="translate({width / 2},{height / 2})">
			{#each root.descendants() as rootDes}
				{#if rootDes.height > 0}
					<circle
						class={rootDes.parent
							? rootDes.children
								? 'node'
								: 'node node--leaf'
							: 'node node--root'}
						fill={color(rootDes.depth)}
						on:click={(e) => {
							if (activeFocus !== rootDes) zoom(rootDes, e);
						}}
						transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
							activeZoomB) *
							activeZoomK})"
						r={rootDes.r * activeZoomK}
					></circle>
				{/if}

				{#if rootDes.parent === activeFocus}
					{#if activeZoomK > 10}
						{#if rootDes.height == 0}
							<circle
								class={rootDes.parent
									? rootDes.children
										? 'node'
										: 'node node--leaf'
									: 'node node--root'}
								fill={color(rootDes.depth)}
								on:click={(e) => {
									if (activeFocus !== rootDes) zoom(rootDes, e);
								}}
								transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
									activeZoomB) *
									activeZoomK})"
								r={rootDes.r * activeZoomK}
							></circle>
						{/if}
						<text
							font-size="9px"
							text-anchor="middle"
							class="pointer-events-none"
							dy="-5"
							transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
								activeZoomB) *
								activeZoomK})"
							>{rootDes.data.name}
						</text>
					{/if}

					{#if activeZoomK < 2}
						<text
							dy={rootDes.parent === activeFocus ? '0' : '9'}
							class="pointer-events-none"
							text-anchor="middle"
							font-size={rootDes.parent === activeFocus ? '14px' : '9px'}
							fill-opacity={rootDes.parent === activeFocus ? 1 : 0}
							transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
								activeZoomB) *
								activeZoomK})">{rootDes.data.name}</text
						>
					{:else}
						<text
							dy="9"
							class="pointer-events-none"
							text-anchor="middle"
							font-size={rootDes.parent === activeFocus ? '14px' : '9px'}
							transform="translate({(rootDes.x - activeZoomA) * activeZoomK},{(rootDes.y -
								activeZoomB) *
								activeZoomK})">{parseFloat(rootDes.data.weight).toFixed(1)} kg</text
						>

						{#if rootDes.depth == 2}
							<text
								class="pointer-events-none font-bold text-center fill-white stroke-base-300 stroke-2"
								text-anchor="middle"
								dy="-230"
								opacity=".1"
								font-size="80px"
								transform="translate({(rootDes.parent.x - activeZoomA) * activeZoomK},{(rootDes
									.parent.y -
									activeZoomB) *
									activeZoomK})">{parseFloat(rootDes.parent.data.weight).toFixed(1)} kg</text
							>
						{/if}
					{/if}
				{/if}
			{/each}
		</g>
	</svg>
</div>

<style>
	.node {
		cursor: pointer;
	}

	.node:hover {
		stroke: #000;
		stroke-width: 1.5px;
	}

	.node--leaf {
		fill: white;
	}

	.label,
	.node--root,
	.node--leaf {
		pointer-events: none;
	}
</style>
