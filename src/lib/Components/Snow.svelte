<script lang="ts">
	// from https://svelte.dev/repl/2929ff84c16a4c1b90fcd3a25f4fc872?version=4.2.8
	import { uniform } from '$lib/utils';
	import type { Particle } from '$lib/index';
	import { onMount } from 'svelte';

	let svg: SVGElement;
	let rate = 4;
	let size = 3;
	let particles: Particle[] = [];

	let frameHandle: number;
	let lastUpdate: number;

	function loop() {
		const now = Date.now();
		const delta = now - lastUpdate;
		lastUpdate = now;

		let rect = svg.getBoundingClientRect();
		const count = 1;
		for (let i = 0; i < count; i++) {
			particles.push({
				x: uniform(-rect.left, rect.right),
				y: -1,
				dx: uniform(-1, 1),
				dy: uniform(1, 2),
				size: Math.random() * size
			});
		}

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];

			p.x += (p.dx * delta) / 1000;
			p.y += (p.dy * delta) / 1000;

			if (
				p.y < -rect.height ||
				p.y > rect.height + 1 ||
				p.x < -rect.width ||
				p.x > rect.width * 2
			) {
				particles.splice(i--, 1);
			}

			particles = particles;

			frameHandle = requestAnimationFrame(loop);
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
