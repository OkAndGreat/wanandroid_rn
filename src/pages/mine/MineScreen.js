import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";

class MineScreen extends PureComponent {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello World!</Text>
            </View>
        );
    }

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


const mapStateToProps = state => {
    return {

    }
}

export default connect(mapStateToProps)(MineScreen);