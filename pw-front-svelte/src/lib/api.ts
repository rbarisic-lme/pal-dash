// axiosInstance.js
import axios from 'axios';

// Create and configure the Axios instance
export const api = axios.create({
  // Set your base URL and other configuration options
  baseURL: 'http://localhost:3000',
  timeout: 5000, // milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});