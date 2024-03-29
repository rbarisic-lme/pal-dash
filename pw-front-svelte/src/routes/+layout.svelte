<script lang="ts">
	import '../app.css';
	import '@fontsource/inter';
	import '@fontsource/poppins';

	import { onMount, afterUpdate } from 'svelte';

	import PHeader from '../components/landing/header.svelte';
	import Sidebar from '../components/sidebar.svelte';

	import legalDisclaimer from '../data/legalDisclaimer';
	import { label, title } from '@/lib/store';
	import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import Cog from 'svelte-material-icons/Cog.svelte';
	import { page } from '$app/stores';

	import { initializeStores } from '@skeletonlabs/skeleton';

	import { localStorageStore } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	const jwtToken: Writable<string> = localStorageStore('jwtToken', '');

	initializeStores();

	let currentRoute = '';
	let topRoute = '';

	onMount(() => {
		currentRoute = $page.route.id as string;
		topRoute = currentRoute.split('/').slice(0, -1).join('/');
	});

	afterUpdate(() => {
		currentRoute = $page.route.id as string;
		topRoute = currentRoute.split('/').slice(0, -1).join('/');
	});

	const goBack = () => {
		goto(topRoute || '/');
	};

	const logout = () => {
		$jwtToken = '';
		goto('/');
	};
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<Modal />

<AppShell>
	<svelte:fragment slot="header">
		<AppBar class="sticky top-0 z-50">
			<svelte:fragment slot="lead">
				{#if currentRoute !== '/'}
					<button type="button" on:click={goBack}>
						<ArrowLeft />
					</button>
				{/if}
			</svelte:fragment>
			<div>PalDash - Control Panel</div>
			<svelte:fragment slot="trail">
				{#if $jwtToken}
					<span class="text-green">Authenticated</span>
					<button class="btn variant-filled-surface" on:click={logout}>Log Out</button>
				{:else}
					<button class="btn" on:click={() => goto('/login')}>
						<Cog color="white" />
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if $jwtToken}
			<!-- todo: implement sidebar shortcuts  -->
			<!-- <Sidebar /> -->
		{/if}
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<main
		class="relative container mx-auto p-4 flex flex-col justify-between min-h-screen items-center"
		style="max-width: 980px;"
	>
		<div class="flex flex-col justify-center gap-2xl w-full">
			<PHeader>
				{@html $label}
			</PHeader>
			<slot />
		</div>

		<div class="text-sm text-center flex flex-col items-center gap-sm pb-lg pt-xl">
			<div class="text-md">Dashboard App by xrlabs</div>
			<div class="text-md">PALWORLD by:</div>
			<img src="/Pocketpair_Logo_White.png" alt="pocketpair logo" width="200px" />
			<div class="max-w-screen-md">{legalDisclaimer}</div>
		</div>
	</main>
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter"></svelte:fragment> -->
	<!-- (footer) -->
</AppShell>

<style lang="postcss">
	:global(html) {
		/* color: theme(colors.light);
    background-color: theme(colors.bg); */
		/* background: rgb(27,4,77);
    background: -moz-linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%);
    background: linear-gradient(90deg, rgba(27,4,77,1) 0%, rgba(14,12,27,1) 100%); */
	}

	main {
		background-image: url('palworld-mons-01-min.png');
		background-position: bottom right;
		background-repeat: no-repeat;
		background-size: 400px;
	}
</style>
