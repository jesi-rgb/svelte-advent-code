<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import Post from '$lib/Components/Post.svelte';
	import type { ElfPost } from '$lib/index.js';

	export let data;

	const messages: ElfPost[] = data.messages;
</script>

<BackButton />

<Heading>ElfNet Social</Heading>

<p>Next generation platform for all things cold.</p>

{#each messages as post}
	<Post {post} />
{/each}
