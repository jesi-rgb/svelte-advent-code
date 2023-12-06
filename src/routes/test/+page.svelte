<script>
	import { onMount, onDestroy } from 'svelte';

	let intervalId;
	let dynamicTimeout = 1000; // Initial timeout value (in milliseconds)

	// Function to be executed at intervals
	function intervalFunction() {
		console.log('Interval triggered');
		// Your code here
	}

	// Start the interval when the component is mounted
	onMount(() => {
		intervalId = setInterval(intervalFunction, dynamicTimeout);
	});

	// Clear the interval when the component is destroyed
	onDestroy(() => {
		clearInterval(intervalId);
	});

	// Function to update the dynamicTimeout value
	function updateDynamicTimeout() {
		// You can calculate the new timeout value based on some logic
		dynamicTimeout = Math.random() * 2000 + 1000; // Example: random value between 1000 and 3000
		// Restart the interval with the new timeout
		clearInterval(intervalId);
		intervalId = setInterval(intervalFunction, dynamicTimeout);
	}
</script>

<main>
	<p>Dynamic Timeout: {dynamicTimeout} ms</p>
	<button on:click={updateDynamicTimeout}>Update Timeout</button>
</main>
