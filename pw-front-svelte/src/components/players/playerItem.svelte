<script lang="ts">
	import { goto } from '$app/navigation';
	import { timeAgo } from '$lib/timeAgo';

	export let player: any;

	$: registeredAt = player.data.registeredAt
		? timeAgo.format(new Date(player.data.registeredAt), 'round')
		: 'undefined';
</script>

<div class="card p-4" style="width: 300px">
	<div class="flex flex-col gap-4 justify-between h-full w-full">
		<div class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
				<div>{player.data.name ? 'Name' : 'Player ID'}:</div>
				<div class="break-all" style="max-width: 60%">
					{player.data.name ? player.data.name : player?.data.id}
				</div>
			</div>

			{#if registeredAt}
				<div class="flex justify-between">
					<div>Registered at:</div>
					<div>{registeredAt}</div>
				</div>
			{/if}
		</div>

		<div>
			<button
				type="button"
				class="btn variant-filled-primary w-full"
				on:click={() => goto('/players/' + player?.data.id)}>Anzeigen</button
			>
		</div>
	</div>
</div>
