<script>
	import BackButton from '$lib/Components/BackButton.svelte';
	import ElfDashboard from '$lib/Components/ElfDashboard.svelte';
	import Heading from '$lib/Components/Heading.svelte';
</script>

<BackButton />
<Heading>Who's been naughty?</Heading>
<div>Let's help the elves easily find who's been naughty or nice.</div>
<section class="my-10">
	<ElfDashboard />
</section>
