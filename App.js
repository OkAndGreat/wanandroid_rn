import React, {useEffect, useRef} from "react";
import {setAxios} from "./src/utils/setAxios";
import {Provider as ReduxProvider} from "react-redux";
import store from "./src/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AskScreen from "./src/features/ask/AskScreen";
import HomeScreen from "./src/features/home/HomeScreen";
import SystemScreen from "./src/features/system/SystemScreen";
import MineScreen from "./src/features/mine/MineScreen";
import {BottomTabName} from "./src/utils/Constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Provider as AntProvider, Toast } from '@ant-design/react-native';
import {StatusBar, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WebviewScreen from "./src/features/webview/WebviewScreen";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import {SystemSettingsPage} from "./src/features/mine/pages/setting/SystemSettingsPage";
import {LoginScreen} from "./src/features/account/LoginScreen";
import {RegisterScreen} from "./src/features/account/RegisterScreen";
import AuthUtil from "./src/utils/AuthUtil";
import {login} from "./src/apis/index";
import { setUserInfo } from "./src/features/account/store/accountSlice";



const Stack = createNativeStackNavigator();

function App() {
    useEffect(() => {
        // 检查登录状态
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            console.log('App - 检查登录状态');
            const userInfo = await AuthUtil.getUserInfo();
            const cookie = await AuthUtil.getCookie();
            
            console.log('App - 本地存储的用户信息:', userInfo);
            console.log('App - 本地存储的Cookie:', cookie);
            
            if (userInfo && cookie) {
                console.log('App - 发现本地登录信息，尝试自动登录验证');
                // 如果有本地存储的用户信息和Cookie，尝试自动登录验证
                try {
                    const response = await login(userInfo.username, userInfo.password);
                    console.log('App - 自动登录验证响应:', response);
                    
                    if (response.errorCode === 0) {
                        console.log('App - 自动登录验证成功');
                        Toast.success('自动登录成功');
                        // 创建一个可序列化的用户信息对象
                        const serializableUserInfo = {
                            id: userInfo?.id || 0,
                            username: userInfo?.username || '',
                            password: userInfo?.password || '',
                            nickname: userInfo?.nickname || '',
                            email: userInfo?.email || '',
                            icon: userInfo?.icon || '',
                            type: userInfo?.type || 0,
                            admin: userInfo?.admin || false,
                            token: userInfo?.token || '',
                            // 将数组转换为字符串，使其可序列化
                            chapterTops: JSON.stringify(userInfo?.chapterTops || []),
                            collectIds: JSON.stringify(userInfo?.collectIds || [])
                        };
                        // 更新Redux状态
                        store.dispatch(setUserInfo(serializableUserInfo));
                    } else {
                        console.log('App - 自动登录验证失败:', response.errorMsg);
                        // 清除无效的本地登录信息
                        await AuthUtil.removeUserInfo();
                        await AuthUtil.removeCookie();
                    }
                } catch (error) {
                    console.log('App - 自动登录验证出错:', error);
                    // 清除无效的本地登录信息
                    await AuthUtil.removeUserInfo();
                    await AuthUtil.removeCookie();
                }
            } else {
                console.log('App - 未发现本地登录信息');
            }
        } catch (error) {
            console.log('App - 检查登录状态出错:', error);
        }
    };

    return (
        <AntProvider>
            <ReduxProvider store={store}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={
                            {
                                headerShown: false
                            }
                        }>
                            <Stack.Screen name="BottomNavigation" component={BottomTabNavigation}/>
                            <Stack.Screen name="WebviewScreen" component={WebviewScreen}/>
                            <Stack.Screen 
                                name="SystemSettingsPage" 
                                component={SystemSettingsPage}
                                options={{
                                    animationTypeForReplace: 'push',
                                    presentation: 'card',
                                    animation: 'slide_from_right'
                                }}
                            />
                            <Stack.Screen name={"LoginScreen"}
                             component={LoginScreen}
                              options={{
                                    animationTypeForReplace: 'push',
                                    presentation: 'card',
                                    animation: 'slide_from_right'
                                }}
                             />
                            <Stack.Screen name={"RegisterScreen"}
                             component={RegisterScreen}
                              options={{
                                    animationTypeForReplace: 'push',
                                    presentation: 'card',
                                    animation: 'slide_from_right'
                                }}
                             />
                        </Stack.Navigator>

                    </NavigationContainer>
                </View>
            </ReduxProvider>
        </AntProvider>

    );
}

export default App
