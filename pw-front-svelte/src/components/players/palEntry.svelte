<script lang="ts">
	export let pal: { key: string; value: string };
</script>

<div class="card p-4">
	{pal.key}
	<br />
	<br />
	<div>Captured:</div>
	<div class="flex flex-wrap">
		{#each Array.from({ length: pal.value > 10 ? 10 : pal.value }) as i}
			<img src="/Pal_Sphere_icon.webp" width="24px" alt="Captured" />
		{/each}

		{#each Array.from({ length: 10 - pal.value < 0 ? 0 : 10 - pal.value }) as i}
			<img src="/Pal_Sphere_icon_disabled.webp" width="24px" alt="Captured" />
		{/each}
	</div>
</div>
