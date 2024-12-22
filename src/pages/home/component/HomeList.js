import {PureComponent} from "react";
import {FlatList, View, StyleSheet, RefreshControl} from "react-native";
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
            footerState: RefreshState.Idle
        }
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

    render() {
        const {dataList} = this.props;

        return (
            <View style={styles.container}>
                <FlatList
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
    }
})
