<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { readable } from 'svelte/store';
	import { api } from '$lib/api';
	import { onMount, onDestroy } from 'svelte';

	import { dockerCompose, dockerStatus, loadDockerStatus } from '@/lib/store';
	import { type ServiceConfiguration } from '@/lib/types/dockerComposeTypes';

	import OverlayLoader from '@/components/overlayLoader.svelte';

	import LCard from '@/components/landing/landing-card.svelte';

	import Circle from 'svelte-material-icons/Circle.svelte';
	import Reload from 'svelte-material-icons/Reload.svelte';
	import Loader from '../loader.svelte';

	$: service = $dockerCompose?.services['palworld-dedicated-server'] as ServiceConfiguration;

	// todo: put these types in a shared directory, as they come from the backend
	type RCONPlayer = {
		name: string;
		playeruid: string;
		steamid: string;
	};

	type RCONShowPlayersResult = {
		players: RCONPlayer[];
	};

	let regPlayerCount: number = 0;
	const onlinePlayers: Writable<RCONPlayer[]> = writable<RCONPlayer[]>([]);

	let isLoading = false;

	const getPlayerCount = async () => {
		try {
			const playerResult = await api.get('/players');
			regPlayerCount = playerResult.data?.players?.length;
		} catch (e) {
			console.error(e);
		}
	};

	const getOnlinePlayers = async () => {
		try {
			const result = await api.get('/rcon/showplayers');
			onlinePlayers.set(result.data.players);
		} catch (e) {
			console.error(e);
		}
	};

	onMount(async () => {
		await getPlayerCount();
		await getOnlinePlayers();
	});

	let serverStatusInterval = setInterval(async () => {
		try {
			isLoading = true;
			await loadDockerStatus();
			await getOnlinePlayers();
		} finally {
			isLoading = false;
		}
	}, 30000);

	onDestroy(() => {
		clearInterval(serverStatusInterval);
	});
</script>

<div class="flex flex gap-md w-full items-center justify-center">
	<div class="card h-full overflow-hidden">
		<OverlayLoader ready={!isLoading}>
			<div class="p-4">
				{#if $dockerStatus?.State?.toLowerCase() === 'running'}
					<div class="flex items-center gap-md text-green">
						<Circle />
						<div>SERVER ONLINE</div>
					</div>
				{:else}
					<div class="flex items-center gap-md text-red-500">
						<Circle />
						<div>SERVER OFFLINE</div>
					</div>
				{/if}
			</div>
		</OverlayLoader>
	</div>
</div>

<div class="flex flex-wrap gap-md w-full items-center justify-center">
	<div class="card p-4 h-full">
		<!-- PVP ? -->
		<div class="flex items-center gap-md">
			{#if service?.environment?.IS_PVP === 'true'}
				<img src="swords.png" width="24px" alt="PVP is active" />
				<div class="text-warning-500">PVP ON</div>
			{:else}
				<img src="happy.png" width="24px" alt="PVP is active" />
				<div class="text-third">PVP OFF</div>
			{/if}
		</div>
	</div>

	<div class="card p-4 h-full">
		<div class="text-lg">{regPlayerCount} Registered Player{regPlayerCount > 1 ? 's' : ''}</div>
	</div>

	<div class="card p-4 h-full">
		<Loader ready={!isLoading}>
			<div class="text-lg">
				{$onlinePlayers.length} Player{$onlinePlayers.length > 1 ? 's' : ''} Online
			</div>
		</Loader>
	</div>

	<!-- break after 3 elements -->
	<div class="w-full"></div>

	<div class="card p-4 h-full">
		<div class="text-lg">Running since {$dockerStatus?.Status.replace('Up', '')}</div>
	</div>

	<div class="card p-4 h-full">
		<div class="text-lg">Updated: {$dockerStatus?.RunningFor}</div>
	</div>
</div>
