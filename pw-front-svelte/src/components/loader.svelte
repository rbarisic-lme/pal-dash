<script lang="ts">
	import Loading from 'svelte-material-icons/Loading.svelte';

	let size = 64;
	export let ready: Boolean = false;
	export let failed: Boolean = false;
</script>

{#if failed}
	<div class="flex justify-center items-center">
		<div>Request Failed</div>
		<button>Reload Page</button>
		<button
			on:click={() => {
				window.location = '/';
			}}
		>
			Go Back
		</button>
	</div>
{:else if !ready}
	<div class="w-full flex justify-center">
		<Loading {size} class="animate-spin"></Loading>
	</div>
{:else}
	<slot />
{/if}
