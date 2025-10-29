import React, {useEffect, useCallback, useState, useRef} from "react";
import {StyleSheet, Text, View, RefreshControl} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import {useFocusEffect} from "@react-navigation/native";
import CommonHeader from "../../shared/components/CommonHeader";
import HomeList from "./components/HomeList";
import Banner from "../../shared/components/Banner";
import {fetchHomeList, loadMoreHomeList, fetchHomeBanner} from "./store/homeThunks";
import {clearError} from "./store/homeSlice";
import {mmkv} from "../../utils/Constant";
import {LOOP_MODE_MMKV_KEY} from "../mine/pages/setting/SettingsPageConstans";

const HomeScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const {dataSource, homeBanner, curPage, loading, loadingMore, error, hasMoreData} = useSelector(state => state.home);
    
    // 在组件初始化时就读取轮播显示设置，避免跃变
    const loopModeEnabled = mmkv.getBoolean(LOOP_MODE_MMKV_KEY) ?? true;
    const [showBanner, setShowBanner] = useState(loopModeEnabled);
    const previousShowBanner = useRef(showBanner);

    // 初始化数据
    useEffect(() => {
        dispatch(fetchHomeList());
        dispatch(fetchHomeBanner());
    }, [dispatch]);

    // 每次页面获得焦点时重新读取设置
    useFocusEffect(
        useCallback(() => {
            // 读取轮播显示设置
            const loopModeEnabled = mmkv.getBoolean(LOOP_MODE_MMKV_KEY) ?? true;
            // 只有当设置发生变化时才更新状态，避免不必要的重渲染
            if (loopModeEnabled !== showBanner) {
                setShowBanner(loopModeEnabled);
            }
        }, [showBanner])
    );

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
            {showBanner && homeBanner && homeBanner.length > 0 ? (
                <Banner bannerArr={homeBanner} navigation={navigation}/>
            ) : null}
            <View style={[styles.listContainer, showBanner && homeBanner && homeBanner.length > 0 && styles.listContainerWithBanner]}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    bannerContainer: {
        // 移除固定高度，让Banner组件自己控制高度
    },
    listContainer: {
        flex: 1,
    },
    listContainerWithBanner: {
        marginTop: 10, // 当banner显示时，添加10dp的顶部间距
    },
});

export default HomeScreen;
