import {Descriptor} from "@react-navigation/core/src/types";
import {Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import Color from "../../utils/Color";
import Ionicons from "react-native-vector-icons/Ionicons";

export const RegisterScreen: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {
    const insets = useSafeAreaInsets();
    const {navigation} = navigationDes;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content"/>
            <View style={[styles.upperContainer, {paddingTop: insets.top}]}>
                <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color="white"/>
                </TouchableOpacity>
                <Image source={require('../../assets/android.png')} style={styles.logo}/>
                <Text style={styles.title}>欢迎使用</Text>
                <Text style={styles.subtitle}>本APP由wangzhongtai独立开发</Text>
            </View>
            <View style={styles.lowerContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={styles.registerText}>去登录</Text>
                    <Ionicons name="arrow-forward-circle-outline" size={16} color={Color.PRIMARY}/>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="gray" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入用户名"
                        placeholderTextColor="gray"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入密码"
                        placeholderTextColor="gray"
                        secureTextEntry={!showPassword}
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
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.inputIcon}/>
                    <TextInput
                        style={styles.input}
                        placeholder="请确认密码"
                        placeholderTextColor="gray"
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity 
                        style={styles.passwordToggle}
                        onPressIn={() => setShowConfirmPassword(true)}
                        onPressOut={() => setShowConfirmPassword(false)}
                    >
                        <Ionicons 
                            name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                            size={20} 
                            color="gray" 
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>注册</Text>
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
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})