<script lang="ts">
	import Loading from 'svelte-material-icons/Loading.svelte';
	import { fade, blur, fly, slide, scale } from 'svelte/transition';

	let size = 24;
	export let ready: Boolean;
</script>

{#if !ready}
	<div class="relative" in:fade>
		<div
			class="w-full h-full flex justify-center items-center absolute variant-glass-primary opacity-100"
		>
			<Loading {size} class="animate-spin"></Loading>
		</div>
		<slot />
	</div>
{:else}
	<div in:fade>
		<slot />
	</div>
{/if}
