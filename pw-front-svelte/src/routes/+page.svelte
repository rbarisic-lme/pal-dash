<script>
	import Loader from '@/components/loader.svelte';

	import Server from 'svelte-material-icons/Server.svelte';

	import { fetchLivestreams } from '$lib/youtubeAPI';

	import LCard from '@/components/landing/landing-card.svelte';
	import YTCard from '@/components/landing/yt-card.svelte';
	import ServerStats from '@/components/landing/serverStats.svelte';
	import Section from '@/components/section.svelte';

	import { onMount } from 'svelte';

	import { label, title, dockerCompose, initializeData } from '@/lib/store';
	label.set('PalDash<span class="hidden lg:inline"> - Control Panel</span>');
	title.set('PalDash');

	/**
	 * @type {string | any[] | undefined}
	 */
	let ytVideos = [];
	let dataLoaded = false;

	let innerHeight = 0;
	$: innerWidth = 0;

	onMount(async () => {
		try {
			if (!$dockerCompose) await initializeData();
			ytVideos = await fetchLivestreams();
		} finally {
			dataLoaded = true;
		}
	});

	const cards = [
		{
			label: 'Player Info',
			action: 'players',
			bgImage: 'player-info-bg.webp'
		},
		{
			label: 'Server Config',
			action: 'config',
			background: 'bg-secondary-500',
			icon: Server
		},
		// {
		//   label: '',
		//   action: '',
		// },
		// {
		//   label: '',
		//   action: '',
		// },
		{
			label: 'Get PalWorld on Steam',
			action: 'https://store.steampowered.com/app/1623730/Palworld/',
			actionExternal: true,
			background: 'bg-second',
			bgImage: 'steam-image.png'
		}
	];
</script>

<svelte:window />

<Loader ready={dataLoaded}>
	<Section label="Server">
		<ServerStats />
	</Section>

	<Section label="Actions">
		<slot>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg gap-y-xl">
				{#each cards as { label, action, actionExternal, background, bgImage, icon } (label)}
					<LCard {label} {action} {actionExternal} {background} {bgImage} {icon}></LCard>
				{/each}
			</div>
		</slot>
	</Section>

	<Section label="Streams">
		{#if ytVideos && ytVideos.length}
			<!-- <div class="flex justify-center flex-wrap lg:flex-no-wrap justify-start gap-lg"> -->
			<div class="flex justify-center justify-start gap-lg gap-y-xl">
				<!-- Jumbo Card -->
				<YTCard windowWidth={innerWidth} hideLabel bigMode video={ytVideos[0]}></YTCard>
				<div class="flex flex-col gap-md" style="width: 300px">
					<div class="text-xl">{ytVideos[0].snippet.channelTitle}</div>
					<div class="text-lg">{ytVideos[0].snippet.title}</div>
				</div>
			</div>

			<div class="grid grid-cols-2 lg:grid-cols-3 gap-x-lg gap-y-md">
				{#each ytVideos.slice(1, 4) as video}
					<YTCard {video}></YTCard>
				{/each}
			</div>
		{/if}
	</Section>
</Loader>
