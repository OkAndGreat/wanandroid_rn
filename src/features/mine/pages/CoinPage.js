import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import CommonHeader from '../../../shared/components/CommonHeader';
import Color from '../../../utils/Color';
import { getUserCoinInfo, getCoinRecord } from '../../../apis';

class CoinPage extends PureComponent {
    constructor(props) {
        super(props);
    }

    state = {
        coinCount: 0,
        coinRecords: [],
        loading: true,
        page: 1,
        hasMore: true,
        showRuleModal: false
    };

    componentDidMount() {
        this.loadCoinInfo();
        this.loadCoinRecords();
    }

    loadCoinInfo = async () => {
        try {
            const response = await getUserCoinInfo();
            if (response && response.errorCode === 0) {
                this.setState({ coinCount: response.data.coinCount || 0 });
            }
        } catch (error) {
            console.error('获取积分信息失败:', error);
        }
    };

    loadCoinRecords = async (page = 1) => {
        try {
            const response = await getCoinRecord(page);
            if (response && response.errorCode === 0) {
                const newRecords = response.data.datas || [];
                this.setState(prevState => ({
                    coinRecords: page === 1 ? newRecords : [...prevState.coinRecords, ...newRecords],
                    loading: false,
                    page,
                    hasMore: newRecords.length > 0
                }));
            } else {
                this.setState({ loading: false, hasMore: false });
            }
        } catch (error) {
            console.error('获取积分记录失败:', error);
            this.setState({ loading: false, hasMore: false });
        }
    };

    handleLoadMore = () => {
        const { page, hasMore, loading } = this.state;
        if (!loading && hasMore) {
            this.setState({ loading: true });
            this.loadCoinRecords(page + 1);
        }
    };

    formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    renderCoinItem = ({ item }) => (
        <View style={styles.recordItem}>
            <View style={styles.recordInfo}>
                <Text style={styles.recordTitle}>{item.desc}</Text>
                <Text style={styles.recordTime}>{this.formatDate(item.date)}</Text>
            </View>
            <Text style={styles.recordCoin}>+{item.coinCount}</Text>
        </View>
    );

    renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>没有更多数据</Text>
        </View>
    );

    renderFooter = () => {
        const { loading, hasMore } = this.state;
        if (loading) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>加载中...</Text>
                </View>
            );
        } else if (!hasMore && this.state.coinRecords.length > 0) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>没有更多数据</Text>
                </View>
            );
        }
        return null;
    };

    state = {
        coinCount: 0,
        coinRecords: [],
        loading: true,
        page: 1,
        hasMore: true,
        showRuleModal: false
    };

    render() {
        const { navigation } = this.props;
        const { coinCount, coinRecords, loading, showRuleModal } = this.state;

        return (
            <View style={styles.container}>
                <CommonHeader 
                    headerTitle="我的积分" 
                    leftIconName="chevron-back-outline" 
                    onLeftIconPress={() => navigation.goBack()}
                    leftIconSize={24}
                    rightIconName="help-circle-outline"
                    onRightIconPress={() => this.setState({ showRuleModal: true })}
                    rightIconName2="ellipsis-vertical-outline"
                    onRightIconPress2={() => navigation.navigate('CoinRankingPage')}
                    style={styles.header}
                />
                
                <View style={styles.coinContainer}>
                    <Text style={styles.coinCount}>{coinCount}</Text>
                </View>
                
                <FlatList
                    data={coinRecords}
                    renderItem={this.renderCoinItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={this.renderEmpty}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
                
                {/* 积分规则弹窗 */}
                {showRuleModal && (
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>本站积分规则</Text>
                                <TouchableOpacity 
                                    onPress={() => this.setState({ showRuleModal: false })}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonText}>×</Text>
                                </TouchableOpacity>
                            </View>
                            <WebView
                                source={{ uri: 'https://www.wanandroid.com/blog/show/2653' }}
                                style={styles.webView}
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                            />
                        </View>
                    </View>
                )}
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
    coinContainer: {
        backgroundColor: Color.THEME,
        paddingVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinCount: {
        fontSize: 48,
        color: Color.WHITE,
        fontWeight: 'bold',
    },
    listContainer: {
        flexGrow: 1,
    },
    recordItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: Color.WHITE,
    },
    recordInfo: {
        flex: 1,
    },
    recordTitle: {
        fontSize: 14,
        color: Color.TEXT_DARK,
        marginBottom: 4,
    },
    recordTime: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
    },
    recordCoin: {
        fontSize: 16,
        color: Color.THEME,
        fontWeight: 'bold',
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
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 8,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Color.TEXT_DARK,
    },
    closeButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 24,
        color: Color.TEXT_LIGHT,
    },
    webView: {
        flex: 1,
    },
});

export default CoinPage;