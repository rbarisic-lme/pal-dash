<script lang="ts">
	import { PUBLIC_PALDEX_API_URL } from '$env/static/public';

	import { palData } from '@/lib/store';
	import { onMount } from 'svelte';
	import { Avatar } from '@skeletonlabs/skeleton';
	import Loader from '../loader.svelte';

	export let pal: { key: string; value: string };

	let myPal: any;

	onMount(async () => {
		myPal = $palData.find((dataPal) => dataPal.asset?.toLowerCase() === pal.key?.toLowerCase());
	});
</script>

<div class="card p-4 flex flex-col gap-lg">
	<Loader ready={myPal?.name}>
		<!-- Top Bar -->
		<div class="flex justify-between">
			<div>{myPal?.name}</div>
			<div>#{myPal?.id}</div>
		</div>

		<div class="mx-auto">
			<Avatar src={myPal?.imageWiki} width="w-20" />
		</div>
		<div class="flex gap-md">
			<div class="flex-grow">
				<div class="grid grid-cols-3 gap-md">
					<div>Type</div>
					<!-- Types -->
					{#if myPal?.types}
						{#each myPal.types as type}
							<div class="badge variant-filled">
								{type}
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-md">
			<div class="flex justify-between gap-md">
				<div>Capture Bonus:</div>
				{#if pal.value < 10}
					<div>{pal.value} / 10</div>
				{:else}
					<div class="badge text-green">MAX BONUS</div>
				{/if}
			</div>
			<div class="grid grid-cols-10">
				{#each Array.from({ length: pal.value > 10 ? 10 : pal.value }) as i}
					<img src="/Pal_Sphere_icon.webp" alt="Captured" />
				{/each}

				{#each Array.from({ length: 10 - pal.value < 0 ? 0 : 10 - pal.value }) as i}
					<img src="/Pal_Sphere_icon_disabled.webp" alt="Captured" />
				{/each}
			</div>
		</div>

		<!-- Suitability -->
		<div>
			<div>Suitability:</div>
			<div class="grid grid-cols-6 gap-md">
				{#each myPal.suitability as job}
					<div class="flex flex-col gap-sm relative">
						<!-- {job.type} -->
						<div
							class="badge-icon variant-filled absolute -bottom-0 -right-0 z-10 text-shingo"
							style="width: 1rem; height: 1rem;"
						>
							{job.level}
						</div>
						<img src={`${new URL(job.image, PUBLIC_PALDEX_API_URL)}`} alt={job.type} />
					</div>
				{/each}
			</div>
		</div>
	</Loader>
</div>
