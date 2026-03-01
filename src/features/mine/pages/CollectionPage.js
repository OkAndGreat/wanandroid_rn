import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import CommonHeader from '../../../shared/components/CommonHeader';
import Color from '../../../utils/Color';
import { getCollectArticleList, getCollectUrlList, uncollectArticle, uncollectUrl } from '../../../apis';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CollectionPage extends PureComponent {
    state = {
        activeTab: 'article', // 'article' 或 'url'
        articleList: [],
        urlList: [],
        articlePage: 1,
        urlPage: 1,
        articleLoading: true,
        urlLoading: true,
        articleHasMore: true,
        urlHasMore: true
    };

    componentDidMount() {
        this.loadArticleList();
    }

    loadArticleList = async (page = 0) => {
        try {
            const response = await getCollectArticleList(page);
            console.log('获取收藏文章响应:', response);
            if (response && response.errorCode === 0) {
                const newList = response.data.datas || [];
                console.log('收藏文章列表:', newList);
                this.setState(prevState => ({
                    articleList: page === 0 ? newList : [...prevState.articleList, ...newList],
                    articleLoading: false,
                    articlePage: page,
                    articleHasMore: newList.length > 0
                }));
            } else {
                console.log('获取收藏文章失败:', response);
                this.setState({ articleLoading: false, articleHasMore: false });
            }
        } catch (error) {
            console.error('获取收藏文章失败:', error);
            this.setState({ articleLoading: false, articleHasMore: false });
        }
    };

    loadUrlList = async () => {
        try {
            const response = await getCollectUrlList();
            console.log('获取收藏网址响应:', response);
            if (response && response.errorCode === 0) {
                const newList = response.data.datas || [];
                console.log('收藏网址列表:', newList);
                this.setState({
                    urlList: newList,
                    urlLoading: false,
                    urlHasMore: false
                });
            } else {
                console.log('获取收藏网址失败:', response);
                this.setState({ urlLoading: false, urlHasMore: false });
            }
        } catch (error) {
            console.error('获取收藏网址失败:', error);
            this.setState({ urlLoading: false, urlHasMore: false });
        }
    };

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
        if (tab === 'url' && this.state.urlList.length === 0) {
            this.loadUrlList();
        }
    };

    handleLoadMore = () => {
        if (this.state.activeTab === 'article') {
            const { articlePage, articleHasMore, articleLoading } = this.state;
            if (!articleLoading && articleHasMore) {
                this.setState({ articleLoading: true });
                this.loadArticleList(articlePage + 1);
            }
        }
        // 网址列表不需要加载更多，因为接口不支持分页
    };

    handleUncollect = async (id, originId) => {
        try {
            let response;
            if (this.state.activeTab === 'article') {
                response = await uncollectArticle(id, originId);
            } else {
                response = await uncollectUrl(id);
            }
            
            if (response && response.errorCode === 0) {
                // 从列表中移除该项目
                if (this.state.activeTab === 'article') {
                    this.setState(prevState => ({
                        articleList: prevState.articleList.filter(item => item.id !== id)
                    }));
                } else {
                    this.setState(prevState => ({
                        urlList: prevState.urlList.filter(item => item.id !== id)
                    }));
                }
            }
        } catch (error) {
            console.error('取消收藏失败:', error);
        }
    };

    renderArticleItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Text style={styles.authorText}>{item.author || '匿名'}</Text>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.chapterText}>{item.chapterName || '自助'}</Text>
            </View>
            <View style={styles.heartContainer}>
                <Text style={styles.timeText}>刚刚</Text>
                <TouchableOpacity 
                    style={styles.heartIcon} 
                    onPress={() => this.handleUncollect(item.id, item.originId)}
                >
                    <Ionicons name="heart" size={24} color="#FF4757" />
                </TouchableOpacity>
            </View>
        </View>
    );

    renderUrlItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <Text style={styles.authorText}>{item.userName || '匿名'}</Text>
                <Text style={styles.titleText}>{item.name}</Text>
                <Text style={styles.chapterText}>{item.link}</Text>
            </View>
            <View style={styles.heartContainer}>
                <Text style={styles.timeText}>刚刚</Text>
                <TouchableOpacity 
                    style={styles.heartIcon} 
                    onPress={() => this.handleUncollect(item.id)}
                >
                    <Ionicons name="heart" size={24} color="#FF4757" />
                </TouchableOpacity>
            </View>
        </View>
    );

    renderEmpty = () => {
        const { activeTab, articleLoading, urlLoading } = this.state;
        const loading = activeTab === 'article' ? articleLoading : urlLoading;
        
        if (loading) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>加载中...</Text>
                </View>
            );
        }
        
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>没有更多数据</Text>
            </View>
        );
    };

    renderFooter = () => {
        const { activeTab, articleLoading, articleHasMore, urlLoading, urlHasMore, articleList, urlList } = this.state;
        
        if (activeTab === 'article') {
            if (articleLoading && articleList.length > 0) {
                return (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>加载中...</Text>
                    </View>
                );
            } else if (!articleHasMore && articleList.length > 0) {
                return (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>没有更多数据</Text>
                    </View>
                );
            }
        } else {
            if (urlLoading && urlList.length > 0) {
                return (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>加载中...</Text>
                    </View>
                );
            } else if (!urlHasMore && urlList.length > 0) {
                return (
                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>没有更多数据</Text>
                    </View>
                );
            }
        }
        return null;
    };

    render() {
        const { navigation } = this.props;
        const { activeTab, articleList, urlList } = this.state;

        return (
            <View style={styles.container}>
                <CommonHeader 
                    headerTitle="我的收藏" 
                    leftIconName="chevron-back-outline" 
                    onLeftIconPress={() => navigation.goBack()}
                    leftIconSize={24}
                    style={styles.header}
                />
                
                {/* 标签切换 */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity 
                        style={[styles.tabItem, activeTab === 'article' && styles.activeTabItem]}
                        onPress={() => this.handleTabChange('article')}
                    >
                        <Text style={[styles.tabText, activeTab === 'article' && styles.activeTabText]}>文章</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tabItem, activeTab === 'url' && styles.activeTabItem]}
                        onPress={() => this.handleTabChange('url')}
                    >
                        <Text style={[styles.tabText, activeTab === 'url' && styles.activeTabText]}>网址</Text>
                    </TouchableOpacity>
                </View>
                
                {/* 内容列表 */}
                <FlatList
                    data={activeTab === 'article' ? articleList : urlList}
                    renderItem={activeTab === 'article' ? this.renderArticleItem : this.renderUrlItem}
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Color.THEME,
        paddingHorizontal: 80,
    },
    tabItem: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
    },
    activeTabItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFFFFF',
    },
    tabText: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    activeTabText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    listContainer: {
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: Color.WHITE,
    },
    itemContent: {
        flex: 1,
    },
    authorText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
        marginBottom: 8,
    },
    timeText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
        marginBottom: 8,
    },
    heartContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginLeft: 16,
    },
    titleText: {
        fontSize: 14,
        color: Color.TEXT_DARK,
        marginBottom: 8,
        lineHeight: 20,
    },
    chapterText: {
        fontSize: 12,
        color: Color.TEXT_LIGHT,
    },
    heartIcon: {
        marginLeft: 16,
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

export default CollectionPage;