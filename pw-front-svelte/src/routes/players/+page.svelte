<script lang="ts">
	import { api } from '@/lib/api';
	import { onMount } from 'svelte';

	import Loader from '@/components/loader.svelte';
	import PlayerItem from '@/components/players/playerItem.svelte';

	let data;
	let isLoading = false;

	onMount(async () => {
		try {
			const response = await api.get('/players');
			console.log(response);

			data = response.data.playerSaves;
		} catch (error) {
			console.error('Error fetching players:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="full-width flex flex-col gap-4 items-center justify-center">
	<p class="q-px-md q-pt-md text-xl">Spieler-Übersicht</p>

	<q-separator></q-separator>

	<div class="row q-col-gutter-md q-pa-md">
		<Loader ready={!isLoading && data}>
			<div class="flex flex-wrap gap-md items-center justify-center">
				{#each data as player}
					<PlayerItem {player} />
				{/each}
			</div>
		</Loader>
	</div>
</div>
