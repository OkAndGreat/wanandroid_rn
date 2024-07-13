import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {StatusBarComp} from "../../components/CommonHeader";
import Color from "../../utils/Color";

class MineScreen extends PureComponent {


    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileInfo}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 让容器占满整个屏幕
        flexDirection: 'column',
        justifyContent: 'flex-start', // 垂直居中
        alignItems: 'center', // 水平居中
        backgroundColor: '#F5FCFF', // 背景颜色
    },
    profileInfo: {
        backgroundColor: Color.THEME,
        height: 300,
        width: '100%'
    }
});


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(MineScreen);