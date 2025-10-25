import React, {useEffect, useRef, useState, useCallback} from "react";
import {FlatList, View, StyleSheet, RefreshControl, Text, Image, Touchable, TouchableOpacity} from "react-native";
import HomeListItem from "./HomeListItem";
import {RefreshState} from "components/refresh_footer/RefreshState";
import {RefreshFooter} from "components/refresh_footer/RefreshFooter";

const HomeList = ({dataList, refreshing, onRefresh, onLoadMore, error, onErrorDismiss, loadingMore, loading, navigation, curPage, hasMoreData}) => {
    const flatListRef = useRef(null);
    const [showTopButton, setShowTopButton] = useState(false);
    const [footerState, setFooterState] = useState(RefreshState.Idle);

    useEffect(() => {
        // 根据hasMoreData和加载状态设置footerState
        if (loadingMore) {
            setFooterState(RefreshState.Refreshing);
        } else if (error && footerState === RefreshState.Refreshing) {
            setFooterState(RefreshState.Failure);
        } else if (dataList.length > 0 && !loading) {
            if (hasMoreData) {
                setFooterState(RefreshState.Idle);
            } else {
                setFooterState(RefreshState.NoMoreData);
            }
        }
    }, [loadingMore, error, footerState, dataList.length, loading, hasMoreData]);

    const renderItem = useCallback(({item, index}) => {
        return (
            <HomeListItem
                onItemClicked={(url) => {
                    // 现在可以使用navigation了
                    navigation.navigate("WebviewScreen", {
                        url: url
                    });
                }}
                data={item}
            />
        );
    }, [navigation]);

    const handleScroll = useCallback(({nativeEvent}) => {
        const {contentOffset} = nativeEvent;
        if (contentOffset.y > 100) {  // 当滚动距离超过 100 时显示按钮
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    }, []);

    const handleScrollToTop = useCallback(() => {
        console.log("jumpToTop");
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({offset: 0, animated: true});
        }
    }, []);

    const checkCanLoadMore = useCallback(() => {
        if (footerState === RefreshState.Refreshing ||
            footerState === RefreshState.Failure ||
            footerState === RefreshState.NoMoreData ||
            dataList.length === 0) {
            return false;
        }
        return true;
    }, [footerState, dataList.length]);

    const beginFooterRefresh = useCallback(() => {
        console.log("beginFooterRefresh called, checkCanLoadMore:", checkCanLoadMore());
        console.log("footerState:", footerState);
        console.log("dataList.length:", dataList.length);
        console.log("hasMoreData:", hasMoreData);
        
        if (!checkCanLoadMore()) {
            return;
        }
        
        // 调用父组件传递的加载更多函数
        if (onLoadMore) {
            onLoadMore();
        }
    }, [onLoadMore, checkCanLoadMore, footerState, dataList.length, hasMoreData]);

    const _renderFooter = useCallback(() => {
        return (
            <RefreshFooter
                state={footerState}
                onRetryLoading={beginFooterRefresh}
            />
        );
    }, [footerState, beginFooterRefresh]);

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                onScroll={handleScroll}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={beginFooterRefresh}
                onEndReachedThreshold={0.1}
                ListFooterComponent={_renderFooter}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#2196F3"
                        colors={["#2196F3"]}
                    />
                }
                data={dataList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
            {showTopButton && (
                <TouchableOpacity 
                    style={styles.jumpToTop} 
                    activeOpacity={0.8} 
                    pointerEvents="box-none" 
                    onPress={handleScrollToTop}
                >
                    <Image source={require('../../../assets/toTop.png')} style={{width: 50, height: 50}}/>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    jumpToTop: {
        position: "absolute",
        bottom: 60,
        right: 10
    }
})

export default HomeList;
