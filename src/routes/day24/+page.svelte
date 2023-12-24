<script lang="ts">
	import { scale } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { Destination, DestinationResponse } from '$lib/index';

	import { PUBLIC_MAPBOX_PK } from '$env/static/public';
	import { Map, Marker } from '@beyonk/svelte-mapbox';

	export let data: DestinationResponse;

	let history = data.history;
	let next = data.next;
	let current = data.current;

	let last = history[history.length - 1];

	// map stuff
	let mapComponent: any;

	let zoom: number, center: number[];

	function onReady() {
		mapComponent.flyTo({
			center: [last.location.lng, last.location.lat],
			zoom: 3,
			pitch: 40,
			duration: 700
		});
	}

	let totalPresents = history.map((d) => d.presentsDelivered).reduce((a, b) => a + b, 0);
	let totalCities = history.length - 1;
</script>

<BackButton />

<Heading>Santa's Magical Tracker</Heading>
<p>Where is Santa now, where is he heading and where has he been? All answered here.</p>

<main class="my-10">
	<div>
		Total presents delivered so far: <span class="font-bold">{totalPresents.toLocaleString()}</span>
	</div>
	<div>
		Total cities visited so far: <span class="font-bold">{totalCities.toLocaleString()}</span>
	</div>
	<div class="w-screen -translate-x-1/2 left-1/2 right-0 absolute h-[600px] md:h-[800px]">
		<Map
			accessToken={PUBLIC_MAPBOX_PK}
			on:zoom={(e) => {
				zoom = e.detail.zoom;
			}}
			style="mapbox://styles/jesi-rgb/clqja1dr600j101qycrr49jms"
			bind:this={mapComponent}
			on:ready={onReady}
		>
			<!-- <Marker lat={current.location.lat} lng={current.location.lng} label="North Pole"> -->
			<!-- 	<div class="text-4xl">🎁</div> -->
			<!-- </Marker> -->
			{#each history.slice(1) as d, i}
				<Marker lat={d.location.lat} lng={d.location.lng} label={d.city}>
					{#if zoom >= 6}
						<div class="bg-base-200 bg-opacity-50 backdrop-blur p-4 rounded-xl">
							<div class="font-sans font-bold text-lg">{i}. {d.city}</div>
							<div class="font-sans text-sm mb-2">{d.region}</div>
							<div class="font-sans text-sm">
								🎁 {d.presentsDelivered.toLocaleString()} presents
							</div>
							<div class="font-sans">🕛 {new Date(d.arrival).toLocaleString()}</div>
						</div>
					{:else}
						<!-- <div in:scale class="w-4 h-4 bg-primary border border-primary rounded-xl"></div> -->
						<svg width="100" height="100">
							<circle
								cx="50%"
								cy="50%"
								r={(d.presentsDelivered / totalPresents) * 90}
								class="fill-primary/40 stroke-primary"
							/>
						</svg>
					{/if}
				</Marker>
			{/each}
		</Map>
	</div>
</main>
