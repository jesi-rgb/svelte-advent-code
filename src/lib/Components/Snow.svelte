<script lang="ts">
	// from https://svelte.dev/repl/2929ff84c16a4c1b90fcd3a25f4fc872?version=4.2.8
	import { uniform } from '$lib/utils';
	import type { Particle } from '$lib/index';
	import { onMount } from 'svelte';

	let svg: SVGElement;
	let rate = 1; // every rate frames add a snowflake
	let size = 3;
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

		console.log(frameCount % rate, particles.length);
		let rect = svg.getBoundingClientRect();
		if (frameCount % rate == 0) {
			particles.push({
				x: uniform(-rect.left, rect.right),
				y: -1,
				dx: uniform(-10, 10),
				dy: uniform(10, 200),
				size: Math.random() * size
			});
			console.log('addd');
		}

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			p.x += (p.dx * delta) / 1000;
			p.y += (p.dy * delta) / 1000;

			if (p.y < -2 || p.y > rect.height + 1 || p.x < 0 || p.x > rect.width) {
				particles.splice(i--, 1);
				console.log('removed');
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
