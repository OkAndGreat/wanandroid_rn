import rootReducer from '../reducers';
import {configureStore} from "@reduxjs/toolkit";

// 使用Redux Toolkit的configureStore，默认已包含thunk中间件
const store = configureStore({
    reducer: rootReducer,
    // 可以添加自定义中间件，但Redux Toolkit默认已包含thunk
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                // 忽略这些action类型的序列化检查
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
    // 启用Redux DevTools
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;