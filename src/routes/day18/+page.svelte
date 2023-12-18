<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { shuffle } from '$lib/utils.js';

	export let data;

	const questions = data.questions;

	let answers: HTMLElement[] = [];
	let userAnswers: boolean[] = [];
	$: console.log(answers);
</script>

<BackButton />

<Heading>Santa's Quiz</Heading>

<div>Let's test your knowledge! Santa has some questions to ask for you to answer.</div>

<main class="my-10">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
		{#each questions as q, iq}
			<div>
				<div class="font-bold text-2xl">
					<span style="font-family: Fern Ornaments;" class="text-secondary">a</span>
					{q.question}
				</div>
				<ol class="list-decimal list-inside tabular-nums text-xl">
					{#each shuffle(q.answers) as a, ia}
						<li bind:this={answers[iq * q.answers.length + ia]} class="flex items-center space-x-3">
							<input
								id="answer-{iq * q.answers.length + ia}"
								disabled={userAnswers[iq] != undefined}
								on:change={() => {
									if (a.correct === true) {
										userAnswers[iq] = true;
										answers[iq * q.answers.length + ia].style.color = '#00FF00';
									} else {
										userAnswers[iq] = false;
										answers[iq * q.answers.length + ia].style.color = '#FF0000';
									}
								}}
								class="checkbox pt-1"
								type="checkbox"
							/>
							<label for="answer-{iq * q.answers.length + ia}">
								<div>{a.text}</div>
							</label>
						</li>
					{/each}
				</ol>
			</div>
		{/each}
	</div>
</main>
