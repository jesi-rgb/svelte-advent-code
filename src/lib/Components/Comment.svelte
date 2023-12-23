<script lang="ts">
	import type { PostComment } from '$lib/index';
	export let comment: PostComment;
</script>

<div class="w-fit mt-4 text-base">
	<p class="italic opacity-70">
		{comment.content}
	</p>

	<div class="flex space-x-2 mt-1 items-baseline">
		<span class="">{comment.author}</span>
		<span>·</span>
		<div class="flex items-baseline space-x-1">
			<span style="font-family: Fern Ornaments;" class="text-secondary">f</span>
			<span class="text-secondary">
				{comment.likes}
			</span>
		</div>

		<span>·</span>
		<span class="text-sm opacity-70">{new Date(comment.timestamp).toLocaleString()}</span>
	</div>
</div>
