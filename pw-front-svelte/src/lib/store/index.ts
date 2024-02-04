import { writable, type Writable } from 'svelte/store';
import { getDockerCompose, getDockerStatus } from '../api';
import type { DockerCompose, DockerStatus } from '../types/dockerComposeTypes';

export const label = writable('');
export const title = writable('');

export const dockerCompose = writable<DockerCompose | null>(null);
export const dockerStatus = writable<DockerStatus | null>(null);

export const loadDockerCompose = async () => {
  const dockerComposeRes = await getDockerCompose();
  dockerCompose.set(dockerComposeRes.data);
}

export const loadDockerStatus = async () => {
  const dockerStatusRes = await getDockerStatus();
  dockerStatus.set(dockerStatusRes.data);
}

export const initializeData = async () => {
  loadDockerCompose();
  loadDockerStatus();
}