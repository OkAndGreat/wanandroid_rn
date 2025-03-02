import {Descriptor} from "@react-navigation/core/src/types";
import {StyleSheet, Text, View} from "react-native";
import WebView from "react-native-webview";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * @Author : wangzhongtai
 * @Date: 2025/3/3 1:51
 * @Description:
 */
export const LoginScreen: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>)  => {
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={{ height: insets.top}}/>
            <Text>this is login screen</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
})
