import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth-slice';
import orderSlice from './order-slice';

const store = configureStore({
  reducer: { order: orderSlice.reducer, auth: authSlice.reducer },
});

export default store;
