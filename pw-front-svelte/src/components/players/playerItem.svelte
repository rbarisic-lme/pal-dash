<script>
	import { goto } from '$app/navigation';

	/**
	 * @type {{ value: string; stats: { stat: { birthtimeMs: string | number | Date; }; }; }}
	 */
	export let player;
</script>

<div class="card p-4" style="width: 300px">
	<div class="flex flex-col gap-4">
		<div class="flex justify-between">
			<div>Player ID:</div>
			<div class="text-wrap break-all" style="max-width: 50%">{player?.value}</div>
		</div>

		<div class="flex justify-between">
			<div>Erstellt am:</div>
			<div>{new Date(player?.stats?.stat?.birthtimeMs).toLocaleString('de-DE')}</div>
		</div>

		<button
			type="button"
			class="btn variant-filled-primary"
			on:click={() => goto('/players/' + player?.value?.slice(0, -4))}>Anzeigen</button
		>
	</div>
</div>
