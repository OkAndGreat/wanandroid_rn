import React, {PureComponent, useRef} from "react";
import {FlatList, View, StyleSheet, RefreshControl, Text, Image, Touchable, TouchableOpacity} from "react-native";
import {HomeListItem} from "./HomeListItem";
import Color from "utils/Color";
import {fetchHomeBanner, fetchHomeList, loadMoreHomeList} from "actions/HomeActions";
import {RefreshState} from "components/refresh_footer/RefreshState";
import {RefreshFooter} from "components/refresh_footer/RefreshFooter";

export class HomeList extends PureComponent {

    constructor() {
        super()
        this.state = {
            headerRefreshing: false,
            showTopButton: false,
            footerState: RefreshState.Idle
        }
        this.flatListRef = null;
    }

    renderItem = ({item, index, navigation}) => {
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
    }

    handleScroll = ({nativeEvent}) => {
        const {contentOffset} = nativeEvent;
        if (contentOffset.y > 100) {  // 当滚动距离超过 100 时显示按钮
            this.setState({showTopButton: true});
        } else {
            this.setState({showTopButton: false});
        }
    };

    handleScrollToTop = () => {
        console.log("jumpToTop")
        if (this.flatListRef) {
            this.flatListRef.scrollToOffset({offset: 0, animated: true});
        }
    };

    render() {
        const {dataList} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    ref={(ref) => (this.flatListRef = ref)}
                    onScroll={this.handleScroll}
                    showsVerticalScrollIndicator={false}
                    refreshing={this.state.headerRefreshing}
                    onEndReached={() => {
                        this.beginFooterRefresh()
                    }}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this._renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.headerRefreshing}
                            onRefresh={() => {
                                this.setState({
                                    refreshing: true
                                });
                                fetchHomeList(() => {
                                    this.setState({
                                        refreshing: false
                                    });
                                })
                            }}
                            tintColor="#2196F3"
                            colors={["#2196F3"]}
                        />
                    }
                    data={dataList}
                    renderItem={({item, index}) => this.renderItem({item, index, navigation: this.props.navigation})}
                    keyExtractor={(item, index) => index.toString()}
                />
                {
                    this.state.showTopButton &&
                    <TouchableOpacity style={styles.jumpToTop} activeOpacity={0.8} pointerEvents="box-none" onPress={() => {
                        this.handleScrollToTop()
                    }}>
                        <Image source={require('assets/toTop.png')} style={{width: 50, height: 50}}/>
                    </TouchableOpacity>
                }
            </View>
        );
    }

    _renderFooter = () => {
        return (
            <RefreshFooter
                state={this.state.footerState}
                onRetryLoading={() => {
                    this.beginFooterRefresh()
                }}
            />
        )
    };


    beginFooterRefresh() {
        if (!this.checkCanLoadMore()) {
            return
        }
        this.setState({
            footerState: RefreshState.Refreshing
        })
        loadMoreHomeList(this.props.curPage, (dataList) => {
            if (dataList.length === 0) {
                this.setState({
                    footerState: RefreshState.NoMoreData
                })
            } else {
                this.setState({
                    footerState: RefreshState.Idle
                })
            }
        }, () => {
            this.setState({
                footerState: RefreshState.Failure
            })
        })
    }

    checkCanLoadMore() {
        if (this.state.footerState === RefreshState.Refreshing ||
            this.state.footerState === RefreshState.Failure ||
            this.state.footerState === RefreshState.NoMoreData ||
            this.props.dataList.length === 0) {
            return false
        }
        return true
    }

}

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
