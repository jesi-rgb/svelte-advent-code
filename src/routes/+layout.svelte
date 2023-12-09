<script>
	import '../app.css';
</script>

<div class="overflow-x-clip">
	<main class="my-10 md:my-20 max-w-xs md:max-w-2xl xl:max-w-3xl mx-auto text-lg">
		<slot />
	</main>
</div>

<style>
	main {
		font-variation-settings: 'opsz' 8;
	}
</style>
