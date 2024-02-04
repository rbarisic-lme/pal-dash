<script lang="ts">
	import Loader from '@/components/loader.svelte';
	import PalEntry from '@/components/players/palEntry.svelte';
	import { api } from '@/lib/api';
	import { PalWorldSavegame } from '@/lib/palworldSavegame';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data; // from page.js

	let palData = undefined;
	let playerData: PalWorldSavegame;

	let ready: Boolean = false;

	onMount(async () => {
		const playerDataRes = await api.get('/paldex/' + data.id);
		playerData = new PalWorldSavegame(playerDataRes.data.fileContents);

		const palDataRes = await api.get('/paldex/pals');
		palData = palDataRes.data;

		console.error(palData);

		ready = true;
	});
</script>

<Loader {ready}>
	<div class="text-xl text-center">Player {data.id}</div>

	<div class="grid grid-cols-3 gap-lg">
		{#each playerData.palsCaptured as pal}
			<PalEntry {pal} />
		{/each}
	</div>

	<div class="card w-full">
		<!-- <Accordion>
			<AccordionItem open>
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<svelte:fragment slot="summary">Full Player Information</svelte:fragment>
				<svelte:fragment slot="content">{playerData.parser.recordData}</svelte:fragment>
			</AccordionItem>
			<AccordionItem>
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<svelte:fragment slot="summary">(summary)</svelte:fragment>
				<svelte:fragment slot="content">(content)</svelte:fragment>
			</AccordionItem>
		</Accordion> -->
	</div>
</Loader>
