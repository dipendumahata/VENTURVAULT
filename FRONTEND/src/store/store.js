import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import dataReducer from './dataSlice.js'; // Import the new reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer, // Add the new reducer to the store
  },
});
