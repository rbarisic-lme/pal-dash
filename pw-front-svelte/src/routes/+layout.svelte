<script lang="ts">
	import '../app.css';
	import '@fontsource/inter';
	import '@fontsource/poppins';

	import { onMount, afterUpdate } from 'svelte';

	import PHeader from '../components/landing/header.svelte';
	import legalDisclaimer from '../data/legalDisclaimer';
	import { label, title } from '@/lib/store';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
	import { page } from '$app/stores';

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
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<AppBar class="sticky top-0 z-10">
	<svelte:fragment slot="lead">
		{#if currentRoute !== '/'}
			<button type="button" on:click={goBack}>
				<ArrowLeft />
			</button>
		{/if}
	</svelte:fragment>
	<div>PalDash - Control Panel</div>
</AppBar>

<main
	class="container mx-auto p-4 flex flex-col justify-between min-h-screen items-center"
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
