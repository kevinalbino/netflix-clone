import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    currSub: (state, action) => {
      state.sub = action.payload;
    },
  },
});

export const { login, logout, currSub } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectSub = (state) => state.user.sub;

export default userSlice.reducer;
