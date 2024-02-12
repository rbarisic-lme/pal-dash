<script lang="ts">
	import { goto } from '$app/navigation';

	import { type Writable } from 'svelte/store';

	import Section from '@/components/section.svelte';
	import Lock from 'svelte-material-icons/Lock.svelte';

	import Loader from '@/components/loader.svelte';

	import { label, title } from '@/lib/store';
	import { api } from '@/lib/api';

	import { localStorageStore } from '@skeletonlabs/skeleton';
	const jwtToken: Writable<string> = localStorageStore('jwtToken', '');

	if ($jwtToken) {
		goto('/');
	}
	label.set('User Login');
	title.set('Login');

	let loading = false;
	let username: string, password: string;

	const login = async () => {
		loading = true;

		try {
			const res = await api.post('/session/login', {
				username,
				password
			});

			jwtToken.set(res.data.token);

			goto('/');
		} catch {
		} finally {
			loading = false;
		}
	};
</script>

<Section label="Login">
	<div class="card grid grid-cols-2 p-4 gap-4">
		<div class="flex flex-col gap-4">
			<input
				class="input"
				title="Username"
				type="text"
				placeholder="Username"
				bind:value={username}
			/>
			<input
				class="input"
				title="Password"
				type="password"
				placeholder="Password"
				bind:value={password}
			/>
			<Loader ready={!loading}>
				<button type="button" on:click={login} class="btn variant-filled-primary w-full">
					Login
				</button>
			</Loader>
		</div>
		<div class="flex w-full h-full flex-center">
			<Lock size="64px" />
		</div>
	</div>
</Section>
