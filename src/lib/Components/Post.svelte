<script lang="ts">
	import type { ElfPost } from '$lib/index';
	import { hashCode } from '$lib/utils';
	import Comment from './Comment.svelte';

	export let post: ElfPost;

	let gender = hashCode(post.author) % 2 == 0 ? 'boy' : 'girl';
</script>

<div
	class="my-5 border-2 border-base-content/10 rounded-xl p-4 bg-gradient-to-b from-base-100 to-base-300/30"
>
	<div class="flex justify-between items-center">
		<div class="flex items-center space-x-2">
			<div class="mask mask-squircle">
				<img
					class="scale-125 pt-1"
					width="40"
					src="https://avatar.iran.liara.run/public/{gender}?username={post.author}"
					alt=""
				/>
			</div>

			<span class="font-bold">
				{post.author}
			</span>
		</div>

		<span class=" opacity-60">{new Date(post.timestamp).toLocaleString()}</span>
	</div>

	<p class="pt-3">
		{post.content}
	</p>

	<div class="flex items-baseline space-x-1 text-secondary">
		<div class="self-end">
			<span style="font-family:Fern Ornaments;">F</span>
			<span>{post.likes}</span>
		</div>
	</div>

	{#if post.comments.length > 0}
		<div class="ml-3 pl-4 mt-5 border-l border-base-content/20">
			{#each post.comments as comment}
				<Comment {comment} />
			{/each}
		</div>
	{/if}
</div>
