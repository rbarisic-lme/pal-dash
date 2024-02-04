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
			<div class="flex flex-wrap">
				{#each Array.from({ length: pal.value > 10 ? 10 : pal.value }) as i}
					<img src="/Pal_Sphere_icon.webp" width="24px" alt="Captured" />
				{/each}

				{#each Array.from({ length: 10 - pal.value < 0 ? 0 : 10 - pal.value }) as i}
					<img src="/Pal_Sphere_icon_disabled.webp" width="24px" alt="Captured" />
				{/each}
			</div>
		</div>

		<!-- Suitability -->
		<div>
			<div>Suitability:</div>
			<div class="flex flex-col gap-md">
				{#each myPal.suitability as job}
					<div class="flex gap-sm">
						<!-- {job.type} -->
						<img src={`${PUBLIC_PALDEX_API_URL}/${job.image}`} alt={job.type} />
						{job.level}
					</div>
				{/each}
			</div>
		</div>
	</Loader>
</div>
