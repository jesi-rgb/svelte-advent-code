<script>
	export let text = '';

	import { crossfade } from 'svelte/transition';

	const transition = crossfade({
		duration: 500, // Set your desired duration
		fallback(node, params) {
			// Fallback transition if crossfade is not supported
			return {
				duration: 500
			};
		}
	});
</script>

{#key text}
	<div in:transition={transition} out:transition={transition} bind:this={textNode}>
		{#if text}
			{#each Array.from(text) as char, i (char)}
				<span style="display:inline-block;" transition={{ duration: 500 }}>
					{char}
				</span>
			{/each}
		{/if}
	</div>
{/key}
