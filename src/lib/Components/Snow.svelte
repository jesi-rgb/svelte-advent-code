<script lang="ts">
	// from https://svelte.dev/repl/2929ff84c16a4c1b90fcd3a25f4fc872?version=4.2.8
	import { uniform } from '$lib/utils';
	import type { Particle } from '$lib/index';
	import { onMount } from 'svelte';

	let svg: SVGElement;
	export let rate = 3;
	export let size = 3;
	export let wind = 2;
	export let weight = 3;

	let particles: Particle[] = [];

	let frameHandle: number;
	let lastUpdate: number;
	let frameCount = 0;

	function loop() {
		frameHandle = requestAnimationFrame(loop);

		const now = Date.now();
		const delta = now - lastUpdate;
		lastUpdate = now;

		frameCount += 1;

		let rect = svg.getBoundingClientRect();
		let count = (rate * uniform(0, 2) * delta) / 1000;
		for (let i = 0; i < count; i++) {
			particles.push({
				x: uniform(-rect.left, rect.right),
				y: -1,
				dx: uniform(-10, 10) * wind,

				dy: uniform(10, 200) * weight,
				size: Math.random() * size
			});
		}

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			p.x += (p.dx * delta) / 1000;
			p.y += (p.dy * delta) / 1000;

			if (p.y > rect.height + 1 || p.x < 0 || p.x > rect.width) {
				particles.splice(i--, 1);
			}

			particles = particles;
		}
	}

	onMount(() => {
		lastUpdate = Date.now();
		loop();

		return () => cancelAnimationFrame(frameHandle);
	});
</script>

<svg
	bind:this={svg}
	class="w-screen pointer-events-none h-screen absolute top-0 right-0 border border-dashed"
>
	{#each particles as p (p)}
		<circle cx={p.x} cy={p.y} r={p.size} class="fill-base-content"></circle>
	{/each}
</svg>
