import { PUBLIC_SERVER_URL } from '$env/static/public';

// axiosInstance.js
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

export const getDockerCompose = () => api.get('/docker/settings')

export const getDockerStatus = () => api.get('/docker/status')
