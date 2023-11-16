import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import listingReducer from '../features/listings/listingsSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingReducer,
  },
});

export default store;