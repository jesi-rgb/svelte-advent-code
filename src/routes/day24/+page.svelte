<script lang="ts">
	import { scale } from 'svelte/transition';
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import type { Destination, DestinationResponse } from '$lib/index';

	import { PUBLIC_MAPBOX_PK } from '$env/static/public';
	import { Map, Marker } from '@beyonk/svelte-mapbox';
	import { onMount } from 'svelte';

	export let data: DestinationResponse;

	let history = data.history;

	$: last = history[history.length - 1];

	// map stuff
	let mapComponent: any;

	let zoom: number, center: number[];

	function onReady() {
		mapComponent.flyTo({
			center: [last.location.lng, last.location.lat],
			zoom: 6,
			pitch: 40,
			duration: 700
		});
	}

	onMount(() => {
		setInterval(() => {
			fetch('https://advent.sveltesociety.dev/data/2023/day-twenty-four.json').then((res) => {
				res.json().then((v) => {
					history = v.history;
				});
			});
		}, 1000 * 60);
	});

	$: totalPresents = history.map((d) => d.presentsDelivered).reduce((a, b) => a + b, 0);
	$: totalCities = history.length - 1;
	$: avgPresentsPerHour = totalPresents / (new Date().getHours() - 11);
	$: avgPresentPerMin = totalPresents / ((new Date().getHours() - 11) * 60);
</script>

<BackButton />

<Heading>Santa's Magical Tracker</Heading>
<p>Where is Santa now, where is he heading and where has he been? All answered here.</p>

<main class="my-10">
	<div class="mb-3 md:text-right tabular-nums md:w-3/4 md:ml-auto">
		<div class="flex justify-between items-end">
			<div class="">Presents delivered:</div>
			<span class="font-bold">{totalPresents.toLocaleString()}</span>
		</div>
		<div class="flex justify-between items-end">
			<div class="">Avg. present delivery per hour:</div>
			<span class="font-bold">{avgPresentsPerHour.toLocaleString()}</span>
		</div>
		<div class="flex justify-between items-end">
			<div class="">Avg. present delivery per minute:</div>
			<span class="font-bold">{avgPresentPerMin.toLocaleString()}</span>
		</div>
		<div class="flex justify-between items-end">
			<div class="">Cities visited:</div>
			<span class="font-bold">{totalCities.toLocaleString()}</span>
		</div>
	</div>
	<div class="italic text-xl font-bold">Trail</div>
	<div class="text-sm breadcrumbs border border-base-content/40 rounded-xl p-2">
		<ul>
			{#each history as h}
				<li>{h.city}</li>
			{/each}
		</ul>
	</div>

	<div class="mt-3 w-screen -translate-x-1/2 left-1/2 right-0 absolute h-[600px] md:h-[800px]">
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
					{#if zoom >= 5}
						<div class="bg-base-200 bg-opacity-50 backdrop-blur p-4 rounded-xl">
							<div class="font-sans font-bold text-lg">{i + 1}. {d.city}</div>
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
								r={1 + (d.presentsDelivered / totalPresents) * 90}
								class="fill-primary/40 stroke-primary"
							/>
						</svg>
					{/if}
				</Marker>
			{/each}
		</Map>
	</div>
</main>
