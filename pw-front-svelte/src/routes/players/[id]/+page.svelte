<script lang="ts">
	import Loader from '@/components/loader.svelte';
	import PalEntry from '@/components/players/palEntry.svelte';
	import { api } from '@/lib/api';
	import { PalWorldSavegame } from '@/lib/palworldSavegame';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Section from '@/components/section.svelte';

	import { writable } from 'svelte/store';
	import { palData, loadPalData } from '@/lib/store';

	export let data; // from page.js

	let playerData: PalWorldSavegame;

	let ready: Boolean = false;
	let failed: Boolean = false;

	onMount(async () => {
		try {
			const playerDataRes = await api.get('/paldex/' + data.id);
			playerData = new PalWorldSavegame(playerDataRes.data.fileContents);

			await loadPalData();

			ready = true;
		} catch (error) {
			console.error('Error fetching data:', error);
			failed = true;
		}
	});
</script>

<Loader {ready} {failed}>
	<div class="text-xl text-center break-all">Player {data.id}</div>

	<Section label="Captured Pals">
		{#if playerData.palsCaptured.length}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
				{#each playerData.palsCaptured as pal}
					<PalEntry {pal} />
				{/each}
			</div>
		{:else}
			<div class="text-center">no Pals captured yet.</div>
		{/if}
	</Section>

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
