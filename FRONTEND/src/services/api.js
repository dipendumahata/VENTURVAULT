// FILE: /src/services/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

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