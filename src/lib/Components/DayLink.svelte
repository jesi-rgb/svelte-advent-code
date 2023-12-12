<script lang="ts">
	export let link: string;
	export let title: string;
</script>

<a href={link}>
	<li class="underline hover:text-primary transition-colors text-2xl balance">
		{title}
	</li>
</a>

<style>
	.balance {
		text-wrap: balance;
	}
</style>
