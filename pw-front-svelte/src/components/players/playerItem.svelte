<script lang="ts">
	import { goto } from '$app/navigation';
	import { timeAgo } from '$lib/timeAgo';

	export let player;

	$: registeredAt = timeAgo.format(new Date(player?.stats?.stat?.birthtimeMs), 'round');
</script>

<div class="card p-4" style="width: 300px">
	<div class="flex flex-col gap-4 justify-between h-full w-full">
		<div class="flex flex-col gap-4">
			<div class="flex justify-between gap-4">
				<div>{player.pwdash__name ? 'Name' : 'Player ID'}:</div>
				<div class="break-all" style="max-width: 60%">
					{player.pwdash__name ? player.pwdash__name : player?.value?.slice(0, -4)}
				</div>
			</div>

			<div class="flex justify-between">
				<div>Registered at:</div>
				<div>{registeredAt}</div>
			</div>
		</div>

		<div>
			<button
				type="button"
				class="btn variant-filled-primary w-full"
				on:click={() => goto('/players/' + player?.value?.slice(0, -4))}>Anzeigen</button
			>
		</div>
	</div>
</div>
