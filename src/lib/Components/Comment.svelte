<script lang="ts">
	import type { PostComment } from '$lib/index';
	export let comment: PostComment;
</script>

<div class="w-fit mt-4">
	<p class="italic opacity-70">
		{comment.content}
	</p>

	<div class="flex space-x-2 mt-1">
		<span class="">{comment.author}</span>
		<span>·</span>
		<div class="flex items-baseline space-x-1 text-secondary">
			<span style="font-family: Fern Ornaments;">f</span>
			<span>
				{comment.likes}
			</span>
		</div>
	</div>
</div>
