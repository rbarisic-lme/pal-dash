<script lang="ts">
	import { goto } from '$app/navigation';

	export let label = '';

	export let border = true;

	export let slotClass = '';

	export let action = '';
	export let actionExternal = false;

	export let background = '';
	export let bgImage = '';
	export let icon = ''; // use an icon as bg

	export let bigMode = false;

	export let widescreen = false;

	export let windowWidth = 0;

	$: clientWidth = 0;

	const getHeight = (clientWidth: number) => {
		let height = widescreen ? clientWidth * 0.5625 : 200;
		return height;
	};

	const getWidth = (windowWidth: number) => {
		return bigMode ? `width: ${windowWidth < 620 ? '100%' : '620px'};` : 'width: 300px;';
	};

	$: computedWidth = getWidth(windowWidth);

	$: computedHeight = `height: ${getHeight(clientWidth)}px`;

	const getAction = () => {
		if (actionExternal) {
			window.open(action, '_blank');
		} else {
			action ? goto(action) : () => {};
		}
	};
</script>

<div
	role="button"
	tabindex="0"
	aria-label={label}
	on:click={getAction}
	on:keydown={getAction}
	class="max-w-full flex flex-col gap-md {action
		? 'hover:brightness-125 transition transform-gpu hover:-rotate-1'
		: ''}"
	style={computedWidth}
>
	<div
		bind:clientWidth
		class="max-w-full justify-center items-center {slotClass} {border
			? 'overflow-clip'
			: ''} {background ? background + ' ' : 'bg-white'} landing-card rounded-lg"
		style="background-image: url('{bgImage ? bgImage : ''}');
      {computedWidth} {computedHeight}"
	>
		{#if icon}
			<div class="w-full h-full flex items-center justify-center">
				<svelte:component this={icon} size="64" />
			</div>
		{/if}
		<slot />
	</div>

	{#if label}
		<p>{label}</p>
	{/if}
</div>

<style lang="postcss">
	.landing-card {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
