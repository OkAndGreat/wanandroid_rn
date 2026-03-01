import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import CommonHeader from '../../../shared/components/CommonHeader';
import Color from '../../../utils/Color';
import { getCoinRanking } from '../../../apis';

class CoinRankingPage extends PureComponent {
    state = {
        rankingList: [],
        loading: true,
        page: 1,
        hasMore: true
    };

    componentDidMount() {
        this.loadRankingList();
    }

    loadRankingList = async (page = 1) => {
        try {
            const response = await getCoinRanking(page);
            if (response && response.errorCode === 0) {
                const newList = response.data.datas || [];
                this.setState(prevState => ({
                    rankingList: page === 1 ? newList : [...prevState.rankingList, ...newList],
                    loading: false,
                    page,
                    hasMore: newList.length > 0
                }));
            } else {
                this.setState({ loading: false, hasMore: false });
            }
        } catch (error) {
            console.error('获取积分排行榜失败:', error);
            this.setState({ loading: false, hasMore: false });
        }
    };

    handleLoadMore = () => {
        const { page, hasMore, loading } = this.state;
        if (!loading && hasMore) {
            this.setState({ loading: true });
            this.loadRankingList(page + 1);
        }
    };

    // 计算背景条宽度的方法
    calculateBarWidth = (coinCount) => {
        // 假设最高积分为200000，作为100%宽度的基准
        const maxCoin = 200000;
        const percentage = Math.min(coinCount / maxCoin, 1);
        return `${percentage * 100}%`;
    };

    renderRankingItem = ({ item, index }) => {
        let medalIcon = null;
        if (index === 0) {
            medalIcon = <Image source={require('../../../assets/medal_gold.png')} style={styles.medalIcon} />;
        } else if (index === 1) {
            medalIcon = <Image source={require('../../../assets/medal_silver.png')} style={styles.medalIcon} />;
        } else if (index === 2) {
            medalIcon = <Image source={require('../../../assets/medal_bronze.png')} style={styles.medalIcon} />;
        }

        return (
            <View style={styles.rankingItem}>
                <View 
                    style={[
                        styles.backgroundBar, 
                        { width: this.calculateBarWidth(item.coinCount) }
                    ]} 
                />
                <View style={styles.rankContainer}>
                    {medalIcon || <Text style={styles.rankText}>{index + 1}</Text>}
                </View>
                <Text style={styles.usernameText}>{item.username}</Text>
                <Text style={styles.coinText}>{item.coinCount}</Text>
            </View>
        );
    };

    renderEmpty = () => {
        const { loading } = this.state;
        if (loading) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>加载中...</Text>
                </View>
            );
        }
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>没有排行榜数据</Text>
            </View>
        );
    };

    renderFooter = () => {
        const { loading, hasMore, rankingList } = this.state;
        if (loading && rankingList.length > 0) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>加载中...</Text>
                </View>
            );
        } else if (!hasMore && rankingList.length > 0) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>没有更多数据</Text>
                </View>
            );
        }
        return null;
    };

    render() {
        const { navigation } = this.props;
        const { rankingList, loading } = this.state;

        return (
            <View style={styles.container}>
                <CommonHeader 
                    headerTitle="积分排行榜" 
                    leftIconName="chevron-back-outline" 
                    onLeftIconPress={() => navigation.goBack()}
                    leftIconSize={24}
                    style={styles.header}
                />
                
                <FlatList
                    data={rankingList}
                    renderItem={this.renderRankingItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={this.renderEmpty}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor: Color.THEME,
    },
    listContainer: {
        flexGrow: 1,
    },
    rankingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundBar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(73, 132, 243, 0.1)',
        zIndex: 0,
    },
    rankContainer: {
        width: 40,
        alignItems: 'center',
        zIndex: 1,
    },
    rankText: {
        fontSize: 14,
        color: Color.TEXT_DARK,
        fontWeight: 'bold',
    },
    medalIcon: {
        width: 20,
        height: 20,
    },
    usernameText: {
        flex: 1,
        fontSize: 14,
        color: Color.TEXT_DARK,
        marginLeft: 10,
        zIndex: 1,
    },
    coinText: {
        fontSize: 16,
        color: Color.THEME,
        fontWeight: 'bold',
        zIndex: 1,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 14,
        color: Color.TEXT_LIGHT,
    },
    footerContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
    },
});

export default CoinRankingPage;