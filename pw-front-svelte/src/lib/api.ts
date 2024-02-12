import { PUBLIC_SERVER_URL } from '$env/static/public';
import { localStorageStore } from '@skeletonlabs/skeleton';
import { get, type Writable } from 'svelte/store';

// Retrieve the token from localStorage or your authentication mechanism
const getToken = () => {
  // Implement your logic to get the token from localStorage or elsewhere
  const jwtToken: Writable<string> = localStorageStore('jwtToken', '');
  return get(jwtToken);
};

// axiosInstance.jsw
import axios from 'axios';

// Create and configure the Axios instance
export const api = axios.create({
  // Set your base URL and other configuration options
  baseURL: PUBLIC_SERVER_URL,
  timeout: 5000, // milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add the Bearer token to the request headers
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getDockerCompose = () => api.get('/docker/settings')

export const getDockerStatus = () => api.get('/docker/status')
