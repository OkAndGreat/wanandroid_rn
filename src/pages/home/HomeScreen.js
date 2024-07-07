import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommonHeader from "../../components/CommonHeader";
import {fetchHomeList} from "../../actions";

class HomeScreen extends PureComponent {
    constructor() {
        super();
    }

    componentDidMount() {
        fetchHomeList()
    }

    render() {
        return (
            <View style={styles.container}>
                <CommonHeader headerTitle="首页" leftIconName={"scan"} rightIconName={"search"}></CommonHeader>
                <Text style={styles.text}>Hello World!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 让容器占满整个屏幕
        flexDirection: "column",
        alignItems: 'center', // 水平居中
        backgroundColor: '#F5FCFF', // 背景颜色
    },
    text: {}
});

const mapStateToProps = state => {
    return {
        page: state.page,
        dataSource: state.dataSource
    }
}

export default connect(mapStateToProps)(HomeScreen);