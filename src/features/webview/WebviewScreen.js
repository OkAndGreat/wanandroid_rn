import React, {PureComponent, useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from "react-native-safe-area-context";

/**
 * WebViewScreen
 */
const WebViewScreen = ({navigation, route}) => {
    const [progress, setProgress] = useState(0);
    const insets = useSafeAreaInsets();

    const onShare = async (title, url) => {
        try {
            await Share.share({
                message: `${title}：${url}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const {url} = route.params;
    return (
        <View style={styles.container}>
            <View style={{ height: insets.top}}>
            </View>
            <WebView
                source={{uri: url}}
                onError={(error) => {
                    console.log('WebView error:', error);
                }}
            />
        </View>
    );
};

export default WebViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
})