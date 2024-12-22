import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import CommonHeader from "../../components/CommonHeader";
import {HomeList} from "./component/HomeList";
import Banner from "../../components/Banner";
import {fetchHomeBanner, fetchHomeList} from "actions/HomeActions";

class HomeScreen extends PureComponent {
    constructor() {
        super();
    }

    componentDidMount() {
        fetchHomeList()
        fetchHomeBanner()
    }

    render() {
        const {dataSource, navigation, homeBanner, curPage} = this.props;

        return (
            <View style={styles.container}>
                <CommonHeader headerTitle="首页" leftIconName={"scan"} rightIconName={"search"}></CommonHeader>
                <Banner bannerArr={homeBanner} navigation={navigation}/>
                <HomeList dataList={dataSource} curPage={curPage} navigation={navigation}></HomeList>
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
    }
});

const mapStateToProps = state => {
    return {
        page: state.home.page,
        dataSource: state.home.dataSource,
        homeBanner: state.home.homeBanner,
        curPage: state.home.curPage
    }
}

export default connect(mapStateToProps)(HomeScreen);
