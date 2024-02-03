import { writable, type Writable } from 'svelte/store';
import { getDockerCompose, getDockerStatus } from '../api';
import type { DockerCompose } from '../types/dockerComposeTypes';

export const label = writable('');
export const title = writable('');



export const dockerCompose = writable<DockerCompose | null>(null);
export const dockerStatus   = writable(null);

export const initializeData = async () => {
  const dockerComposeRes = await getDockerCompose();
  dockerCompose.set(dockerComposeRes.data);

  const dockerStatusRes = await getDockerStatus();
  dockerStatus.set(dockerStatusRes.data)
}