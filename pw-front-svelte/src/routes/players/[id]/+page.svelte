<script lang="ts">
	import Loader from '@/components/loader.svelte';
	import PalEntry from '@/components/players/palEntry.svelte';
	import { api } from '@/lib/api';
	import { PalWorldSavegame } from '@/lib/palworldSavegame';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';
	import Section from '@/components/section.svelte';

	import { loadPalData } from '@/lib/store';

	import {} from '@skeletonlabs/skeleton';

	import Pen from 'svelte-material-icons/Pen.svelte';

	export let data; // from page.js

	import { label, title, editMode } from '@/lib/store';

	const modalStore = getModalStore();

	let player: any;
	let savData: PalWorldSavegame;

	let ready: Boolean = false;
	let failed: Boolean = false;

	$: playerName = player?.data?.name;

	onMount(async () => {
		try {
			const res = await api.get('/players/' + data.id);
			player = res.data.player;

			savData = new PalWorldSavegame(player.data.sav);
			await loadPalData();

			ready = true;
		} catch (error) {
			console.error('Error fetching data:', error);
			failed = true;
		}
	});

	const modal: ModalSettings = {
		type: 'prompt',
		// Data
		title: 'Enter Name',
		body: 'Set a name for the Player ID.',
		// Populates the input value and attributes
		value: 'Skeleton',
		valueAttr: { type: 'text', minlength: 3, maxlength: 32, required: true },
		// Returns the updated response value
		response: (r: string) => {
			api.post('/players/name', {
				id: data.id,
				name: r
			});
		}
	};

	const triggerModal = () => {
		modalStore.trigger(modal);
	};
</script>

<Loader {ready} {failed}>
	<div class="text-sublead break-all flex flex-col flex-center gap-sm">
		<div class="flex flex-center gap-lg">
			{#if playerName}
				<div>{playerName}</div>
			{:else}
				Player {data.id}
			{/if}

			{#if $editMode}<button on:click={triggerModal}><Pen /></button>{/if}
		</div>

		<!-- {#if pwdash__name}<div class="text-sm">ID: {data.id}</div>{/if} -->
	</div>

	<Section label="Captured Pals">
		{#if savData.palsCaptured.length}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
				{#each savData.palsCaptured as pal}
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
