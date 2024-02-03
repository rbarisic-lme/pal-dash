<Loader ready={ready && $dockerCompose}>
  <div class="container card p-4 grid gap-lg">
    <header class="card-header text-xl">Server Settings</header>
    <section class="p-4">Docker-Compose Version: {$dockerCompose.version}</section>

  <div class="table-container">
    <!-- Native Table Element -->
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.entries(service.environment) as [key, value]}
          <tr>
            <td>{key}</td>
            <td>{value || '-'}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>


  </div>
</Loader>

<script lang="ts">
  import Loader from '@/components/loader.svelte';

	import { dockerCompose, initializeData } from '@/lib/store';
  import Layout from '@/routes/+layout.svelte';
	import { onMount } from 'svelte';

  import {type ServiceConfiguration} from '@/lib/types/dockerComposeTypes';

  let ready = false;

  $: service = $dockerCompose?.services['palworld-dedicated-server'] as ServiceConfiguration;

  onMount(async () => {
    if(!$dockerCompose) await initializeData()
    console.error($dockerCompose)
    ready = true;

  })

</script>