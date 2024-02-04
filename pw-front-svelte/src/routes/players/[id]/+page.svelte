<script lang="ts">
	import Loader from '@/components/loader.svelte';
	import { api } from '@/lib/api';
	import { PalWorldSavegame } from '@/lib/palworldSavegame';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data; // from page.js

	let playerData: PalWorldSavegame;

	let ready: Boolean = false;

	onMount(async () => {
		const response = await api.get('/paldex/' + data.id);
		playerData = new PalWorldSavegame(response.data.fileContents);
		console.error(playerData.parser.data);

		ready = true;
	});
</script>

<Loader {ready}>
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
