// FILE: /src/services/api.js

import axios from 'axios';

// 1. Create a new Axios instance with a base URL.
// This means you don't have to type 'http://localhost:5001/api' for every request.
const API = axios.create({
  baseURL: 'https://venturvault.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Use an interceptor to automatically attach the auth token to every request.
// This is a powerful feature that runs before each request is sent.
API.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If a token exists, add it to the 'Authorization' header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return the modified request configuration
    return config;
  },
  (error) => {
    // Handle any errors during the request setup
    return Promise.reject(error);
  }
);

export default API;
