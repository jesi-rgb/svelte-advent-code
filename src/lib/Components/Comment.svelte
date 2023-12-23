<script lang="ts">
	import type { PostComment } from '$lib/index';
	export let comment: PostComment;
</script>

<div class="mt-4 text-base">
	<p class="italic opacity-70">
		{comment.content}
	</p>

	<div class="flex flex-col md:flex-row md:space-x-2 mt-1 items-baseline">
		<span class="">{comment.author}</span>
		<span class="hidden md:block">·</span>
		<div class="flex items-baseline space-x-1">
			<span style="font-family: Fern Ornaments;" class="text-secondary">f</span>
			<span class="text-secondary">
				{comment.likes}
			</span>
		</div>

		<span class="hidden md:block">·</span>
		<span class="text-xs md:text-sm opacity-70 self-end md:self-auto"
			>{new Date(comment.timestamp).toLocaleString()}</span
		>
	</div>
</div>
