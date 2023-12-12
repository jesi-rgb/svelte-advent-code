<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import DraggableComponent from '$lib/Components/DraggableComponent.svelte';
	import Heading from '$lib/Components/Heading.svelte';

	export let data;
	const stickers = data.data;
	let canvasTexts: string[] = ['Merry Christmas!'];
	let canvasImgs: string[] = ['3'];
	let canvasOrnaments: string[] = ['RUYUYUYT'];

	$: textBindings = [];
	$: ornamentBindings = [];

	$: textSizes = [];
	$: imgSizes = [];
	$: ornamentSizes = [];

	let focusedText: number;
	let focusedImg: number;
	let focusedOrnament: number;
</script>

<BackButton />

<Heading>Christmas Card Editor</Heading>

<p>Let's design some Christmas postcards!</p>

<main
	on:mousedown={() => {
		focusedText = undefined;
		focusedImg = undefined;
		focusedOrnament = undefined;
	}}
	class="w-full relative h-[500px] md:h-[800px] bg-black/0 border-2 border-dashed rounded-xl my-10"
>
	<div class="w-full h-full opacity-60 absolute canvas-bg bg-base-200"></div>
	{#each canvasTexts as textObject, i}
		<DraggableComponent pos={{ x: 85, y: 130 }}>
			<h1
				contenteditable
				bind:this={textBindings[i]}
				style="font-size:{textSizes[i]}px; line-height:{textSizes[i]}px;"
				on:click={() => {
					focusedText = i;
					textBindings[i].select();
					focusedImg = undefined;
					focusedOrnament = undefined;
				}}
			>
				{textObject}
			</h1>
		</DraggableComponent>
	{/each}
	{#each canvasImgs as index, i}
		<DraggableComponent pos={{ x: 120, y: 200 }}>
			<img
				width={imgSizes[i]}
				on:click={() => {
					focusedImg = i;
					focusedText = undefined;
					focusedOrnament = undefined;
				}}
				src={stickers[parseInt(index)].url}
				alt="Sticker {index}"
			/>
		</DraggableComponent>
	{/each}
	{#each canvasOrnaments as ornament, i}
		<DraggableComponent pos={{ x: 90, y: 100 }}>
			<h1
				bind:this={ornamentBindings[i]}
				on:click={() => {
					focusedOrnament = i;
					focusedText = undefined;
					focusedImg = undefined;
				}}
				style="font-family: 'Fern Ornaments';font-size:{ornamentSizes[
					i
				]}px; line-height:{ornamentSizes[i]}px;"
				contenteditable
			>
				{ornament}
			</h1>
		</DraggableComponent>
	{/each}
</main>

<div class="h-[30px] mb-5">
	{#if focusedText != undefined}
		<input bind:value={textSizes[focusedText]} type="range" min="10" max="250" class="range" />
	{/if}
	{#if focusedImg != undefined}
		<input
			bind:value={imgSizes[focusedImg]}
			type="range"
			min="10"
			max="250"
			class="range range-secondary"
		/>
	{/if}
	{#if focusedOrnament != undefined}
		<input
			bind:value={ornamentSizes[focusedOrnament]}
			type="range"
			min="10"
			max="250"
			class="range range-primary"
		/>
	{/if}
</div>
<!-- dashboard -->
<div class="flex justify-around bg-base-200 rounded-xl py-2 mb-2">
	<button
		class="btn btn-outline"
		on:click={() => {
			canvasTexts = [...canvasTexts, 'Tap to edit'];
		}}>Add text...</button
	>
	<button
		class="btn btn-outline"
		on:click={() => {
			canvasOrnaments = [...canvasOrnaments, 'W'];
		}}>Add ornament...</button
	>
</div>
<section>
	<div class="grid grid-cols-3 md:grid-cols-5 mx-auto w-full place-items-center">
		{#each stickers as sticker, i}
			<button
				class="mask-squircle mask p-4 bg-base-200"
				on:click={() => {
					canvasImgs = [...canvasImgs, i.toString()];
					console.log(canvasImgs);
				}}
			>
				<img class="w-[40px] md:w-[60px]" src={sticker.url} alt="Sticker {sticker.index}" />
			</button>
		{/each}
	</div>
</section>

<style>
	.canvas-bg {
		background-image: radial-gradient(#b2ccd6 1px, transparent 0px);
		background-size: 40px 40px;
		mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1), transparent 75%);
	}
</style>
