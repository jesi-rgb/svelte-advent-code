<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { Destination, DestinationResponse } from '$lib/index';

	import { PUBLIC_MAPBOX_PK } from '$env/static/public';
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: DestinationResponse;
	let history = data.history;
	let next = data.next;
	let current = data.current;

	let last = history[history.length - 1];

	console.log(data);

	// map stuff
	let mapComponent: any;

	function onReady() {
		mapComponent.flyTo({
			center: [last.location.lng, last.location.lat],
			zoom: 3,
			pitch: 40,
			duration: 700
		});
	}
</script>

<BackButton />

<Heading>Santa's Magical Tracker</Heading>
<p>Where is Santa now, where is he heading and where has he been? All answered here.</p>

<main class="my-10">
	<div
		class="w-screen -translate-x-1/2 left-1/2 right-0 absolute h-[600px] md:relative md:w-full md:translate-x-0"
	>
		<Map
			accessToken={PUBLIC_MAPBOX_PK}
			style="mapbox://styles/jesi-rgb/clqja1dr600j101qycrr49jms"
			bind:this={mapComponent}
			on:ready={onReady}
		>
			<!-- <Marker lat={current.location.lat} lng={current.location.lng} label="North Pole"> -->
			<!-- 	<div class="text-4xl">🎁</div> -->
			<!-- </Marker> -->
			{#each history.slice(1) as d}
				<Marker lat={d.location.lat} lng={d.location.lng} label="North Pole">
					<div>
						<div class="font-sans font-bold text-lg">{d.city}</div>
						<div class="font-sans text-sm">
							🎁 {d.presentsDelivered.toLocaleString()} presents
						</div>
						<div class="font-sans">🕛 {new Date(d.arrival).toLocaleString()}</div>
					</div>
				</Marker>
			{/each}
		</Map>
	</div>
</main>
