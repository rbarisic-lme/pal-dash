<div class="flex flex-col gap-md w-full items-center justify-center">

  <div class="text-lg">Registrierte Spieler: {playerCount}</div>
  
  <div class="flex items-center gap-md">
    {#if $dockerStatus?.State?.toLowerCase() === 'running'}
      <Circle class="color-warning-500" /> <div class="leaded-none color-primary-500">SERVER ONLINE</div>
    {:else}
      <div class="leaded-none">SERVER OFFLINE</div>
    {/if}
  </div>
  <!-- PVP ? -->
  {#if service.environment.IS_PVP}
    <div class="flex items-center gap-md">
      <img src="swords.png" width="32px" alt="PVP is active">
      <div class="text-warning-500">PVP ON</div>
    </div>
  {:else}
    PVP OFF
  {/if}
</div>

<script lang="ts">
  import { readable } from 'svelte/store';
  import { api } from '$lib/api'
	import { onMount } from 'svelte';
	import { dockerCompose, dockerStatus } from '@/lib/store';
	import { type ServiceConfiguration } from '@/lib/types/dockerComposeTypes';
  import Circle from "svelte-material-icons/Circle.svelte";

  $: service = $dockerCompose?.services['palworld-dedicated-server'] as ServiceConfiguration;

  let playerCount: number;

  onMount(async () => {
    const result = await api.get('/players');
    playerCount = result.data?.playerSaves?.length
  })
</script>