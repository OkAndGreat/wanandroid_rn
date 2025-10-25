import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure } from './accountSlice';
import { login as loginService, register as registerService } from '../services/accountService';

// 登录
export const login = createAsyncThunk(
  'account/login',
  async ({ username, password }: { username: string; password: string }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await loginService(username, password);
      dispatch(loginSuccess({
        userInfo: response.data,
        token: response.data.token || 'default_token'
      }));
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message || '登录失败'));
      throw error;
    }
  }
);

// 注册
export const register = createAsyncThunk(
  'account/register',
  async ({ username, password, repassword }: { username: string; password: string; repassword: string }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response = await registerService(username, password, repassword);
      dispatch(loginSuccess({
        userInfo: response.data,
        token: response.data.token || 'default_token'
      }));
      return response.data;
    } catch (error) {
      dispatch(loginFailure(error.message || '注册失败'));
      throw error;
    }
  }
);