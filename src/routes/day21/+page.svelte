<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { onMount } from 'svelte';
	import { scaleLinear } from 'd3-scale';
	import TemperatureChart from '$lib/Components/TemperatureChart.svelte';

	let latitude: number, longitude: number;
	let loading = false;
	let error = false;
	function getCoords() {
		loading = true;
		navigator.geolocation.getCurrentPosition(
			(position) => {
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;
				loading = false;
			},
			(e) => {
				error = true;
			}
		);
	}

	onMount(() => {
		getCoords();
	});

	let forecast;
	async function fetchWeather(latitude, longitude) {
		if (latitude == undefined || longitude == undefined) return;
		let promise = await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation_probability,snowfall`
		);
		let data = await promise.json();

		console.log(data);

		forecast = data;
	}

	$: fetchWeather(latitude, longitude);
</script>

<BackButton />

<Heading>Frightful Weather App</Heading>

<p>What's the forecast for this Christmas time?</p>

<main class="my-10">
	{#if error}
		<p>
			Something went wrong. You may have denied permission for location services. Maybe try on
			another browser?
		</p>
	{:else if loading}
		<div class="flex items-center space-x-3">
			<span class="loading loading-bars"></span>
			<p>Retrieving position</p>
		</div>
	{:else if latitude == undefined && longitude == undefined}
		<p>Press the button to give permission to see where you are</p>
		<button class="btn" on:click={getCoords}>get coords</button>
	{:else}
		<p>
			Location: {latitude}, {longitude}
		</p>

		{#if forecast != undefined}
			<TemperatureChart data={forecast} />
		{/if}
	{/if}
</main>
