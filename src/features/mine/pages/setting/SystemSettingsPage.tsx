import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TextStyle, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";
import {Descriptor} from "@react-navigation/core/src/types";
import {SettingItem, SettingItemProps, SettingItemType} from "./component/SettingItem";
import {Modal, Toast} from "@ant-design/react-native";
import {DARK_MODE_MMKV_KEY, LOOP_MODE_MMKV_KEY, TOP_MODE_MMKV_KEY} from "./SettingsPageConstans";
import {Colors} from "react-native/Libraries/NewAppScreen";
import {mmkv, BottomTabName} from "utils/Constant";
import Color from "utils/Color";
import CommonHeader from "shared/components/CommonHeader";
import { useDispatch, useSelector } from 'react-redux';
import { logoutAsync } from "features/account/store/accountSlice";
import AuthUtil from "utils/AuthUtil";
import * as api from "apis/index";

export const SystemSettingsPage: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {
    const navigation: NavigationProp<any> = navigationDes.navigation
    const dispatch = useDispatch();
    
    // 获取用户登录状态
    const isLoginRedux = useSelector(state => state.account.isLogin);
    
    // 创建一个函数来检查实际的登录状态
    const checkActualLoginStatus = () => {
        // 检查本地存储中是否有用户信息
        const userInfo = AuthUtil.getUserInfo();
        // 如果Redux状态或本地存储中有用户信息，则认为已登录
        return isLoginRedux || !!userInfo;
    };
    
    // 获取实际的登录状态
    const [isLogin, setIsLogin] = useState(checkActualLoginStatus());
    
    // 在组件挂载和Redux状态变化时更新登录状态
    useEffect(() => {
        setIsLogin(checkActualLoginStatus());
    }, [isLoginRedux]);

    const [darkModeCheckState, setDarkModeCheckState] = useState<boolean>(false)
    const [loopModeCheckState, setLoopModeCheckState] = useState<boolean>(false)
    const [topShowModeCheckState, setTopShowModeCheckState] = useState<boolean>(false)

    useEffect(() => {
        setDarkModeCheckState(mmkv.getBoolean(DARK_MODE_MMKV_KEY) ?? false)
        setLoopModeCheckState(mmkv.getBoolean(LOOP_MODE_MMKV_KEY) ?? false)
        setTopShowModeCheckState(mmkv.getBoolean(TOP_MODE_MMKV_KEY) ?? false)
    }, []);

    // 检查登录状态的函数
    const checkLoginAndNavigate = (callback: () => void) => {
        // 重新检查登录状态
        const currentLoginStatus = checkActualLoginStatus();
        
        console.log('SystemSettingsPage - 当前登录状态:', currentLoginStatus);
        console.log('SystemSettingsPage - Redux登录状态:', isLoginRedux);
        console.log('SystemSettingsPage - 本地存储用户信息:', !!AuthUtil.getUserInfo());
        
        if (!currentLoginStatus) {
            // 未登录时跳转到登录页面
            console.log('SystemSettingsPage - 未登录，跳转到登录页面');
            // 使用reset方法重置导航栈，确保用户能正确跳转到登录页面
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
            return;
        }
        // 已登录时执行回调函数
        console.log('SystemSettingsPage - 已登录，执行回调函数');
        callback();
    };

    return (
        <View style={styles.container}>
            <CommonHeader headerTitle="设置" leftIconName={"chevron-back-outline"} onLeftIconPress={() => {
                onLeftIconPressed(navigation)
            }} leftIconSize={24}></CommonHeader>

            <SettingItem
                mainText={"跟随系统暗色模式"}
                switchCheckStatus={darkModeCheckState}
                onSwitchClicked={(value) => {
                    checkLoginAndNavigate(() => {
                        setDarkModeCheckState(value)
                        mmkv.set(DARK_MODE_MMKV_KEY, value)
                    })
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示轮播"}
                switchCheckStatus={loopModeCheckState}
                onSwitchClicked={(value) => {
                    checkLoginAndNavigate(() => {
                        setLoopModeCheckState(value)
                        mmkv.set(LOOP_MODE_MMKV_KEY, value)
                    })
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示置顶"}
                switchCheckStatus={topShowModeCheckState}
                onSwitchClicked={(value) => {
                    checkLoginAndNavigate(() => {
                        setTopShowModeCheckState(value)
                        mmkv.set(TOP_MODE_MMKV_KEY, value)
                    })
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"清除缓存"}
                onSettingItemPressed={() => {
                    checkLoginAndNavigate(() => {
                        onClearCacheClicked()
                    })
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"版本更新"}
                extraText={"已经是最新版本"}
                onSettingItemPressed={() => {
                    checkLoginAndNavigate(() => {
                        Toast.show("已经是最新版本~")
                    })
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"关于我们"}
                extraText={"当前版本2.2.5"}
                onSettingItemPressed={() => {
                    checkLoginAndNavigate(() => {
                        // 关于我们功能
                    })
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"隐私政策"}
                onSettingItemPressed={() => {
                    checkLoginAndNavigate(() => {
                        navigation.navigate("WebviewScreen", {
                            url: "https://baidu.com"
                        });
                    })
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            {/* 只有登录状态下才显示退出登录按钮 */}
            {isLogin && (
                <SettingItem
                    mainText={"退出登录"}
                    onSettingItemPressed={() => {
                        // 退出登录按钮不需要检查登录状态，因为只有登录用户才能看到
                        onLogoutClicked(navigation, dispatch);
                    }}
                    type={SettingItemType.TYPE_DEFAULT}/>
            )}
            
            {/* 测试按钮 - 仅在测试环境下显示 */}
            {__DEV__ && (
                <SettingItem
                    mainText={"测试登录状态"}
                    extraText={isLogin ? "已登录" : "未登录"}
                    onSettingItemPressed={() => {
                        checkLoginAndNavigate(() => {
                            Toast.show("登录状态正常");
                        });
                    }}
                    type={SettingItemType.TYPE_ROUTE}/>
            )}

        </View>
    )
}

function onClearCacheClicked() {
    const negativeTextStyle: TextStyle = {
        color: Color.TEXT_DARK
    }

    Modal.alert("确定要清除缓存吗？", "", [{
        text: "取消",
        style: negativeTextStyle
    }, {
        text: "确定",
        onPress: () => {
            Toast.show("已清除所有缓存")
        }
    }])
}

function onLogoutClicked(navigation: any, dispatch: any) {
    const negativeTextStyle: TextStyle = {
        color: Color.TEXT_DARK
    }

    Modal.alert("确定要退出登录吗？", "", [{
        text: "取消",
        style: negativeTextStyle
    }, {
        text: "确定",
        onPress: () => {
            // 创建一个异步函数来处理退出登录
            const performLogout = async () => {
                try {
                    console.log('SystemSettingsPage - 开始退出登录');
                    // 调用退出登录action
                    await dispatch(logoutAsync());
                    console.log('SystemSettingsPage - 退出登录action调用成功');
                    console.log('SystemSettingsPage - 已更新Redux状态');

                    Toast.show("已退出登录");

                    // 返回到"我的"页面，使用reset方法重置导航栈，确保用户能看到"点击去登录"
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'BottomNavigation' }],
                    });
                    
                    // 延迟一下，然后导航到"我的"标签页
                    setTimeout(() => {
                        navigation.navigate('BottomNavigation', { screen: BottomTabName.BOTTOM_TAB_NAME_MINE });
                    }, 100);
                } catch (error) {
                    console.error('SystemSettingsPage - 退出登录出错:', error);
                    Toast.show("退出登录失败，请稍后重试");
                }
            };

            // 直接调用异步函数
            performLogout();
        }
    }])
}

function onLeftIconPressed(navigation: any) {
    navigation.goBack()
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    }
});
