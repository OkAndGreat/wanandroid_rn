import {Descriptor} from "@react-navigation/core/src/types";
import {Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Color from "../../utils/Color";
import Ionicons from "react-native-vector-icons/Ionicons";
import {login} from "../../apis/index";
import AuthUtil from "../../utils/AuthUtil";
import { Toast } from '@ant-design/react-native';
import { LoginResponse, UserInfo } from "../../models/LoginModels";
import { useDispatch } from 'react-redux';
import { setUserInfo } from "./store/accountSlice";

export const LoginScreen: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {
    const insets = useSafeAreaInsets();
    const {navigation} = navigationDes;
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        console.log('LoginScreen - 开始登录流程');
        console.log('LoginScreen - 输入的用户名:', username);
        console.log('LoginScreen - 输入的密码长度:', password ? password.length : 0);
        
        if (!username || !password) {
            console.log('LoginScreen - 用户名或密码为空，显示提示');
            Toast.show({ content: '请输入用户名和密码', type: 'info' });
            return;
        }

        console.log('LoginScreen - 开始加载状态');
        setLoading(true);
        try {
            console.log('LoginScreen - 调用登录API');
            const response = await login(username, password);
            // 打印响应数据结构
            console.log('LoginScreen - 登录接口返回数据:', JSON.stringify(response));
            
            // 使用模型类处理响应
            const loginResponse = new LoginResponse(response);
            console.log('LoginScreen - 处理后的登录响应:', loginResponse);
            
            // 创建用户信息对象，包含密码
            const userInfo = new UserInfo({
                ...loginResponse.data,
                password: password // 添加密码字段
            });
            console.log('LoginScreen - 处理后的用户信息:', userInfo);
            
            // 保存用户信息
            console.log('LoginScreen - 保存用户信息到本地');
            await AuthUtil.saveUserInfo(userInfo);
            
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
            console.log('LoginScreen - 更新Redux状态');
            dispatch(setUserInfo(serializableUserInfo));
            
            console.log('LoginScreen - 登录成功，显示提示并返回');
            Toast.show({ content: '登录成功', type: 'success' });
            navigation.goBack();
        } catch (error) {
            // 打印错误信息
            console.log('LoginScreen - 登录错误:', error);
            console.log('LoginScreen - 登录错误类型:', typeof error);
            
            // 处理错误对象
            let errorMessage = '登录失败，请稍后重试';
            if (error && typeof error === 'object') {
                errorMessage = error.errorMsg || errorMessage;
                console.log('LoginScreen - 错误对象中的错误信息:', error.errorMsg);
            } else if (typeof error === 'string') {
                errorMessage = error;
                console.log('LoginScreen - 字符串错误信息:', error);
            }
            
            console.log('LoginScreen - 显示错误提示:', errorMessage);
            Toast.show({ content: errorMessage, type: 'fail' });
        } finally {
            console.log('LoginScreen - 结束加载状态');
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent={true} barStyle="light-content"/>
            <View style={[styles.upperContainer, {paddingTop: insets.top}]}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color="white"/>
                </TouchableOpacity>
                <Image source={require('../../assets/android.png')} style={styles.logo}/>
                <Text style={styles.title}>欢迎使用</Text>
                <Text style={styles.subtitle}>本APP由wangzhongtai独立开发</Text>
            </View>
            <View style={styles.lowerContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.registerText}>去注册</Text>
                    <Ionicons name="arrow-forward-circle-outline" size={16} color={Color.PRIMARY}/>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入用户名"
                        placeholderTextColor="gray"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入密码"
                        placeholderTextColor="gray"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                        style={styles.passwordToggle}
                        onPressIn={() => setShowPassword(true)}
                        onPressOut={() => setShowPassword(false)}
                    >
                        <Ionicons 
                            name={showPassword ? "eye-off-outline" : "eye-outline"} 
                            size={20} 
                            color="gray" 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.loginButtonText}>{loading ? '登录中...' : '登录'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'white',
    },
    upperContainer: {
        backgroundColor: Color.THEME,
        alignItems: 'center',
        paddingBottom: 60,
    },
    closeButton: {
        position: 'absolute',
        top: 40, // Adjust this value to position the close button correctly
        left: 10,
    },
    logo: {
        width: 80,
        height: 80,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 14,
        color: 'white',
        marginTop: 5,
    },
    lowerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: -30,
        padding: 20,
    },
    registerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    registerText: {
        color: Color.PRIMARY,
        marginRight: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginTop: 30,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    passwordToggle: {
        padding: 5,
    },
    loginButton: {
        backgroundColor: Color.PRIMARY,
        borderRadius: 20,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 40,
    },
    loginButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
