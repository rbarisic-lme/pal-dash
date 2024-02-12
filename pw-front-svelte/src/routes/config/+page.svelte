<script lang="ts">
	import Loader from '@/components/loader.svelte';

	import { dockerCompose, initializeData } from '@/lib/store';
	import Layout from '@/routes/+layout.svelte';
	import { onMount } from 'svelte';

	import { type ServiceConfiguration } from '@/lib/types/dockerComposeTypes';

	import ServerEnvKeys from '@@/data/server-env-keys.ts';

	import Information from 'svelte-material-icons/Information.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	let ready: Boolean = false;

	$: service = $dockerCompose?.services['palworld-dedicated-server'] as ServiceConfiguration;

	const getMissingkeys = (service: ServiceConfiguration) => {
		if (!service?.environment) return [];

		try {
			const currentKeys = Object.keys(service.environment);
			const allKeys = Object.keys(ServerEnvKeys);
			return allKeys.filter((serverKey) => !currentKeys.includes(serverKey));
		} catch (e) {
			console.warn(e);
			return [];
		}
	};

	$: missingKeys = getMissingkeys(service);

	onMount(async () => {
		if (!$dockerCompose) await initializeData();
		console.error($dockerCompose);
		ready = true;
	});
</script>

<Loader ready={ready && $dockerCompose}>
	<div class="container card grid gap-lg">
		<header class="card-header flex flex justify-between gap-md">
			<div class="text-xl">Server Settings</div>
			<div class="text-right">Docker-Compose Version: {$dockerCompose?.version}</div>
		</header>
		{#if missingKeys.length}
			<Accordion class="text-yellow-light">
				<AccordionItem>
					<svelte:fragment slot="lead"><Information size="18px" /></svelte:fragment>
					<svelte:fragment slot="summary">
						<span>{missingKeys.length} Setting Keys missing.</span>
					</svelte:fragment>
					<svelte:fragment slot="content">
						<div class="text-white">
							<div class="p-md">
								These default values haven't been set and will use default values.
							</div>
							<table class="table table-hover">
								<tbody class="text-yellow-light">
									{#each missingKeys as key}
										<tr>
											<td class="text-md">{key}</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</svelte:fragment>
				</AccordionItem>
			</Accordion>
		{/if}

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
