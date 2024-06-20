import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import {setAxios} from "./src/utils/setAxios";

function App() {
    useEffect(() => {
        setAxios()
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 让容器占满整个屏幕
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
        backgroundColor: '#F5FCFF', // 背景颜色
    },
    text: {}
});

export default App
