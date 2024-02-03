<h1>Registrierte Spieler: {playerCount}</h1>

<script lang="ts">
  import { readable } from 'svelte/store';
  import { api } from '$lib/api'
	import { onMount } from 'svelte';

  let playerCount: number;

  onMount(async () => {
    const result = await api.get('/players');
    playerCount = result.data?.playerSaves?.length
  })
</script>