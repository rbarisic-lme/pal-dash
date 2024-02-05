<script lang="ts">
	import Loading from 'svelte-material-icons/Loading.svelte';

	let size = 64;
	export let ready: Boolean = false;
	export let failed: Boolean = false;
</script>

{#if failed}
	<div class="flex flex-col justify-center items-center gap-lg">
		<div>Request Failed</div>
		<div class="grid grid-cols-2 gap-md">
			<button class="btn variant-filled-primary" on:click={() => location.reload(true)}
				>Reload Page</button
			>
			<button
				class="btn variant-filled-primary"
				on:click={() => {
					window.location = '/';
				}}
			>
				Go Back
			</button>
		</div>
	</div>
{:else if !ready}
	<div class="w-full flex justify-center">
		<Loading {size} class="animate-spin"></Loading>
	</div>
{:else}
	<slot />
{/if}
