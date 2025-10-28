import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { logout as logoutApi } from 'apis/index';
import AuthUtil from 'utils/AuthUtil';

// 创建异步的退出登录action
export const logoutAsync = createAsyncThunk(
    'account/logoutAsync',
    async (_, { dispatch }) => {
        try {
            console.log('accountSlice - 开始退出登录');
            // 调用退出登录API
            await logoutApi();
            console.log('accountSlice - 退出登录API调用成功');
            
            // 清除本地存储的用户信息和Cookie
            await AuthUtil.removeUserInfo();
            await AuthUtil.removeCookie();
            console.log('accountSlice - 已清除本地存储的用户信息和Cookie');
            
            // 返回成功状态
            return { success: true };
        } catch (error) {
            console.error('accountSlice - 退出登录出错:', error);
            // 返回错误信息
            return { success: false, error: error.message };
        }
    }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.fulfilled, (state, action) => {
        if (action.payload.success) {
          console.log('accountSlice - 退出登录成功');
          // 更新状态
          state.isLoggedIn = false;
          state.userInfo = null;
          state.token = null;
        } else {
          console.error('accountSlice - 退出登录失败:', action.payload.error);
        }
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        console.error('accountSlice - 退出登录被拒绝:', action.error);
      });
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = accountSlice.actions;
export default accountSlice.reducer;