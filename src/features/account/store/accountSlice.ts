import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  isLoggedIn: boolean;
  userInfo: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  isLoggedIn: false,
  userInfo: null,
  token: null,
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ userInfo: any, token: string }>) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.token = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = accountSlice.actions;
export default accountSlice.reducer;