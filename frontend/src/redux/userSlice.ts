import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string | null; // Store user's email
  token: string | null; // Store authentication token
  isAuthenticated: boolean;
}

const initialState: UserState = {
  email: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.email = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
