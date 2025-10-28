import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

const initialState = {
    isLogin: false,
    userInfo: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setLoginStatus: (state, action) => {
            state.isLogin = action.payload;
        },
        setUserInfo: (state, action) => {
            // 创建一个可序列化的用户信息对象
            const userInfo = {
                id: action.payload?.id || 0,
                username: action.payload?.username || '',
                password: action.payload?.password || '',
                nickname: action.payload?.nickname || '',
                email: action.payload?.email || '',
                icon: action.payload?.icon || '',
                type: action.payload?.type || 0,
                admin: action.payload?.admin || false,
                token: action.payload?.token || '',
                // 将数组转换为字符串，使其可序列化
                chapterTops: JSON.stringify(action.payload?.chapterTops || []),
                collectIds: JSON.stringify(action.payload?.collectIds || [])
            };
            
            state.userInfo = userInfo;
            state.isLogin = !!userInfo;
        },
        logout: (state) => {
            state.isLogin = false;
            state.userInfo = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutAsync.fulfilled, (state, action) => {
                if (action.payload.success) {
                    console.log('accountSlice - 退出登录成功');
                    // 更新状态
                    state.isLogin = false;
                    state.userInfo = null;
                } else {
                    console.error('accountSlice - 退出登录失败:', action.payload.error);
                }
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                console.error('accountSlice - 退出登录被拒绝:', action.error);
            });
    }
});

export const { setLoginStatus, setUserInfo, logout } = accountSlice.actions;

export default accountSlice.reducer;