import { writable, type Writable } from 'svelte/store';
import { api, getDockerCompose, getDockerStatus } from '../api';
import type { DockerCompose, DockerStatus } from '../types/dockerComposeTypes';

export const label = writable('');
export const title = writable('');

export const editMode = writable(false);

export const dockerCompose = writable<DockerCompose | null>(null);
export const dockerStatus = writable<DockerStatus | null>(null);

export const palData = writable(undefined);

export const loadPalData = async () => {
  const palDataRes = await api.get('/paldex/pals');
  palData.set(palDataRes.data);
}

export const loadDockerCompose = async () => {
  const dockerComposeRes = await getDockerCompose();
  dockerCompose.set(dockerComposeRes.data);
}

export const loadDockerStatus = async () => {
  const dockerStatusRes = await getDockerStatus();
  dockerStatus.set(dockerStatusRes.data);
}

export const initializeData = async () => {
  await loadDockerCompose();
  await loadDockerStatus();
}