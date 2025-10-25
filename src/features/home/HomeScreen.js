import React, {useEffect, useCallback} from "react";
import {StyleSheet, Text, View, RefreshControl} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import CommonHeader from "../../components/CommonHeader";
import HomeList from "./components/HomeList";
import Banner from "../../components/Banner";
import {fetchHomeList, loadMoreHomeList, fetchHomeBanner} from "./store/homeThunks";
import {clearError} from "./store/homeSlice";

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {dataSource, homeBanner, curPage, loading, loadingMore, error, hasMoreData} = useSelector(state => state.home);

    // 初始化数据
    useEffect(() => {
        dispatch(fetchHomeList());
        dispatch(fetchHomeBanner());
    }, [dispatch]);

    // 下拉刷新
    const handleRefresh = useCallback(() => {
        dispatch(fetchHomeList());
        dispatch(fetchHomeBanner());
    }, [dispatch]);

    // 加载更多
    const handleLoadMore = useCallback(() => {
        console.log("handleLoadMore called, curPage:", curPage, "loadingMore:", loadingMore);
        if (!loadingMore) {
            dispatch(loadMoreHomeList(curPage + 1));
        }
    }, [dispatch, curPage, loadingMore]);

    // 清除错误
    const handleErrorDismiss = useCallback(() => {
        if (error) {
            dispatch(clearError());
        }
    }, [dispatch, error]);

    return (
        <View style={styles.container}>
            <CommonHeader headerTitle="首页" leftIconName={"scan"} rightIconName={"search"}></CommonHeader>
            <Banner bannerArr={homeBanner} navigation={navigation}/>
            <HomeList
                dataList={dataSource}
                curPage={curPage}
                navigation={navigation}
                refreshing={loading}
                loading={loading}
                onRefresh={handleRefresh}
                onLoadMore={handleLoadMore}
                loadingMore={loadingMore}
                error={error}
                onErrorDismiss={handleErrorDismiss}
                hasMoreData={hasMoreData}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 让容器占满整个屏幕
        flexDirection: "column",
        alignItems: 'center', // 水平居中
        backgroundColor: '#F5FCFF', // 背景颜色
    }
});

export default HomeScreen;
