import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  area: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initialState },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.area = action.payload;
      localStorage.setItem('area', action.payload);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.area = '';
      localStorage.removeItem('area');
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
