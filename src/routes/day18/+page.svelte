<script lang="ts">
	import BackButton from '$lib/Components/BackButton.svelte';
	import Heading from '$lib/Components/Heading.svelte';
	import { shuffle } from '$lib/utils.js';

	export let data;

	const questions = data.questions;

	questions.map((q) => {
		shuffle(q.answers);
	});

	let answers: HTMLElement[] = [];
	let userAnswers: boolean[] = [];
	// from https://stackoverflow.com/questions/42317140/count-the-number-of-true-members-in-an-array-of-boolean-values
	// wtf
	$: totalCorrect = userAnswers.filter(Boolean).length;
</script>

<BackButton />

<Heading>Santa's Quiz</Heading>

<div>Let's test your knowledge! Santa has some questions to ask for you to answer.</div>

<main class="my-10">
	<div class="text-2xl mb-12">Correct answers: {totalCorrect} / {questions.length}</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10">
		{#each questions as q, iq}
			<div>
				<div class="font-bold text-2xl mb-3">
					<span style="font-family: Fern Ornaments;" class="text-secondary">a</span>
					{q.question}
				</div>
				<ol class="list-decimal list-inside tabular-nums text-xl">
					{#each q.answers as a, ia}
						<li bind:this={answers[iq * q.answers.length + ia]} class="flex items-start space-x-3">
							<input
								id="answer-{iq * q.answers.length + ia}"
								disabled={userAnswers[iq] != undefined}
								on:change={() => {
									if (a.correct === true) {
										userAnswers[iq] = true;
										userAnswers = userAnswers;
										answers[iq * q.answers.length + ia].style.color = '#9FE88D';
									} else {
										userAnswers[iq] = false;
										userAnswers = userAnswers;
										answers[iq * q.answers.length + ia].style.color = '#FF7D5C';
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
