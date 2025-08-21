// FILE: /src/store/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api'; // Our pre-configured Axios instance

// ============================================================================
// ASYNCHRONOUS THUNKS
// These functions handle our API calls and dispatch actions based on the results.
// ============================================================================

/**
 * @desc    Async thunk to handle user login.
 * @param   {object} credentials - { email, password }
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      // 1. Make the API call to the login endpoint
      const { data } = await API.post('/auth/login', credentials);
      // 2. Store the received token in localStorage for session persistence
      localStorage.setItem('token', data.token);
      // 3. Fetch the full user details using the new token
      const userResponse = await API.get('/auth/me');
      // 4. Return the user data to be stored in the Redux state
      return userResponse.data.data;
    } catch (err) {
      // If the API call fails, reject the promise with the error message from the backend
      return rejectWithValue(err.response?.data?.error || 'Login Failed. Please check your credentials.');
    }
  }
);

/**
 * @desc    Async thunk to handle new user registration.
 * @param   {object} userData - { firstName, lastName, email, password, role }
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/register', userData);
      localStorage.setItem('token', data.token);
      const userResponse = await API.get('/auth/me');
      return userResponse.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  }
);

/**
 * @desc    Async thunk to fetch user data if a token exists on app load.
 */
export const fetchUserByToken = createAsyncThunk(
  'auth/fetchUserByToken',
  async (_, { rejectWithValue }) => {
    try {
      const userResponse = await API.get('/auth/me');
      return userResponse.data.data;
    } catch (err) {
      // If the token is invalid or expired, remove it and reject
      localStorage.removeItem('token');
      return rejectWithValue('Session expired. Please log in again.');
    }
  }
);

// NEW: Async thunk to update the core user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await API.put('/users/profile', profileData);
      return data.data; // Return the updated user object
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Could not update profile.');
    }
  }
);

// ============================================================================
// AUTH SLICE
// Defines the initial state, reducers for synchronous actions, and handles
// the state changes for the async thunks.
// ============================================================================

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    notifications: [],
  },
  // Reducers for synchronous actions
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.user = null;
      state.token = null;
      state.notifications = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationsRead: (state) => {
      state.notifications.forEach(n => {
        n.read = true;
      });
    }
  },
  // Handles state changes for async thunks
  extraReducers: (builder) => {
    builder
      // Login User Lifecycle
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = localStorage.getItem('token');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register User Lifecycle
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = localStorage.getItem('token');
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User by Token Lifecycle
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true; // Set loading true for initial validation
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Can be used to show a "Session Expired" message
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Update the user in the store with the new data
      });
  },
});

// Export the synchronous actions
export const { logout, clearError, addNotification, markNotificationsRead } = authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
