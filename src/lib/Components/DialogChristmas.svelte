<script lang="ts">
	import { onMount } from 'svelte';

	let modal: HTMLElement;

	export let seconds = 4;

	onMount(() => {
		let interval = setInterval(() => {
			seconds -= 1;
		}, 1000);

		setTimeout(() => {
			modal.showModal();
			clearInterval(interval);
		}, seconds * 1000);
	});
</script>

<dialog bind:this={modal} id="modal" class="modal">
	<div class="modal-box border-2 border-dashed border-opacity-50">
		<div class="text-center text-secondary text-3xl">
			<div style="font-family: Fern Ornaments;">W</div>
			<div style="font-family: Fern Ornaments;">ITRP</div>
			<div style="font-family: Fern Ornaments;">IGQTREFP</div>
		</div>
		<div class="my-5">
			<h3 class="font-bold text-3xl text-center balance mb-2">
				Merry Christmas to everyone celebrating!
			</h3>
			<p class="text-center balance opacity-80 text-xl">
				And happy new year. Bring joy to everyone around you and be respectful to each other.
			</p>
		</div>
		<div class="text-center text-secondary text-3xl">
			<div style="font-family: Fern Ornaments;">ITZGFCRP</div>
			<div style="font-family: Fern Ornaments;">IGFP</div>
			<div style="font-family: Fern Ornaments;">X</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	.balance {
		text-wrap: balance;
	}
</style>
