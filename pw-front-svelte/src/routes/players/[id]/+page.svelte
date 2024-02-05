<script lang="ts">
	import Loader from '@/components/loader.svelte';
	import PalEntry from '@/components/players/palEntry.svelte';
	import { api } from '@/lib/api';
	import { PalWorldSavegame } from '@/lib/palworldSavegame';
	import {
		Accordion,
		AccordionItem,
		getModalStore,
		type ModalSettings
	} from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';
	import Section from '@/components/section.svelte';

	import { loadPalData } from '@/lib/store';

	import {} from '@skeletonlabs/skeleton';

	import Pen from 'svelte-material-icons/Pen.svelte';

	export let data; // from page.js

	import { label, title, editMode } from '@/lib/store';

	const modalStore = getModalStore();

	let playerData: PalWorldSavegame;

	let ready: Boolean = false;
	let failed: Boolean = false;

	let pwdash__name: string;

	onMount(async () => {
		try {
			const playerDataRes = await api.get('/paldex/' + data.id);
			playerData = new PalWorldSavegame(playerDataRes.data.fileContents);

			pwdash__name = playerDataRes.data.pwdash__name;

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
			{#if pwdash__name}
				<div>{pwdash__name}</div>
			{:else}
				Player {data.id}
			{/if}

			{#if $editMode}<button on:click={triggerModal}><Pen /></button>{/if}
		</div>

		<!-- {#if pwdash__name}<div class="text-sm">ID: {data.id}</div>{/if} -->
	</div>

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
