import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import MineSingleItem from "./components/MineSingleItem";
import Color from "../../utils/Color";
import {TouchableOpacityWithoutFeedback} from "../../shared/components/TouchableOpacityWithoutFeedback";
import { setUserInfo } from "../account/store/accountSlice";
import AuthUtil from "../../utils/AuthUtil";
import { getUserCoinInfo } from "../../apis";

class MineScreen extends PureComponent {

    constructor() {
        super();
        this.state = {
            userInfo: null,
            coinInfo: null
        };
        this.initMineDataList();
        this.previousUserInfoId = null;
    }

    componentDidMount() {
        this.loadLocalUserInfo();
    }

    componentDidUpdate(prevProps) {
        const { userInfo: reduxUserInfo } = this.props;
        const prevReduxUserInfo = prevProps.userInfo;
        
        if (reduxUserInfo && reduxUserInfo.id !== this.previousUserInfoId) {
            console.log('MineScreen - 检测到用户信息变化，刷新数据');
            this.previousUserInfoId = reduxUserInfo.id;
            this.setState({ userInfo: reduxUserInfo });
            this.fetchCoinInfo();
        }
        
        if (!reduxUserInfo && prevReduxUserInfo) {
            console.log('MineScreen - 检测到用户退出登录');
            this.previousUserInfoId = null;
            this.setState({ userInfo: null, coinInfo: null });
        }
    }

    loadLocalUserInfo = async () => {
        try {
            const userInfo = await AuthUtil.getUserInfo();
            console.log('MineScreen - 加载本地用户信息:', userInfo);
            
            if (!userInfo) {
                this.setState({ userInfo: null, coinInfo: null });
                return;
            }
            
            const serializableUserInfo = {
                id: userInfo?.id || 0,
                username: userInfo?.username || '',
                password: userInfo?.password || '',
                nickname: userInfo?.nickname || '',
                email: userInfo?.email || '',
                icon: userInfo?.icon || '',
                type: userInfo?.type || 0,
                admin: userInfo?.admin || false,
                token: userInfo?.token || '',
                chapterTops: JSON.stringify(userInfo?.chapterTops || []),
                collectIds: JSON.stringify(userInfo?.collectIds || [])
            };
            
            this.previousUserInfoId = serializableUserInfo.id;
            this.setState({ userInfo: serializableUserInfo });
            this.props.dispatch(setUserInfo(serializableUserInfo));
            this.fetchCoinInfo();
        } catch (error) {
            console.error('MineScreen - 加载用户信息出错:', error);
            this.setState({ userInfo: null, coinInfo: null });
        }
    }

    fetchCoinInfo = async () => {
        try {
            const coinInfoResponse = await getUserCoinInfo();
            console.log('MineScreen - 获取用户积分信息:', coinInfoResponse);
            
            if (coinInfoResponse && coinInfoResponse.errorCode === 0) {
                this.setState({ coinInfo: coinInfoResponse.data });
            }
        } catch (error) {
            console.error('MineScreen - 获取用户积分信息出错:', error);
        }
    }

    initMineDataList() {
        this.mineDataList = [{
            name: '我的积分',
            imgName: require('../../assets/mine_credit.png'),
            routes: 'CoinPage'
        }, {
            name: '我的收藏', imgName: require('../../assets/mine_collect.png'), routes: 'CollectionPage'
        }, {
            name: '我的书签', imgName: require('../../assets/bookmarkMinus.png'), routes: 'SystemSettingsPage'
        }, {
            name: '阅读历史', imgName: require('../../assets/mine_read_history.png'), routes: 'SystemSettingsPage'
        }, {
            name: '开源项目', 
            imgName: require('../../assets/mine_github.png'), 
            routes: 'WebviewScreen',
            params: { url: 'https://github.com/OkAndGreat' }
        }, {            name: '关于作者',            imgName: require('../../assets/mine_about_author.png'),            routes: 'AboutAuthorPage',            extraText: '请他喝杯咖啡~',            extraTextColor: '#E57343'        }, {
            name: '系统设置', imgName: require('../../assets/mine_setting.png'), routes: 'SystemSettingsPage'
        }];
    }

    render() {

        const {navigation} = this.props;
        const { userInfo, coinInfo } = this.state;
        const isLogin = !!userInfo;

        return (
            <View style={styles.container}>
                <TouchableOpacityWithoutFeedback style={styles.profileInfo} onPress={() => {
                    if (isLogin) {
                        // 已登录，点击可以跳转到个人信息页面
                        // navigation.navigate('UserInfo');
                    } else {
                        // 未登录，跳转到登录页面
                        navigation.navigate('LoginScreen');
                    }
                }}>
                    <View style={styles.profileAvatar}>
                        <Image source={require('../../assets/android.png')} style={{width: 36, height: 36}}/>
                    </View>
                    {
                        isLogin ? <View style={styles.userInfoContainer}>
                            <Text style={[styles.profileText]}>{userInfo.nickname || userInfo.username}</Text>
                            {coinInfo && (
                                <View style={styles.levelRankContainer}>
                                    <Text style={[styles.levelRankText]}>等级: {coinInfo.level || 1}</Text>
                                    <Text style={[styles.levelRankText]}>排名: {coinInfo.rank || 0}</Text>
                                </View>
                            )}
                        </View> : <View>
                            <Text style={[styles.profileText]}>点击去登录</Text>
                        </View>
                    }
                </TouchableOpacityWithoutFeedback>
                {this.mineDataList.map((item) => (<MineSingleItem
                    key={item.name}
                    routes={item.routes}
                    extraText={item.name === '我的积分' && coinInfo ? `${coinInfo.coinCount || 0}` : item.extraText}
                    imgName={item.imgName}
                    extraTextColor={item.extraTextColor}
                    name={item.name}
                    params={item.params}
                    onItemClicked={(routes, params) => {
                        // 检查是否是需要登录的功能按钮
                        const needLoginItems = ['我的积分', '我的分享', '我的收藏', '阅读历史', '系统设置'];
                        
                        if (needLoginItems.includes(item.name)) {
                            // 如果是需要登录的功能按钮，检查登录状态
                            if (!isLogin) {
                                // 未登录时跳转到登录页面
                                navigation.navigate('LoginScreen');
                                return;
                            }
                        }
                        
                        // 已登录或不需要登录的按钮，正常导航
                        if (params) {
                            navigation.navigate(routes, params);
                        } else {
                            navigation.navigate(routes);
                        }
                    }}
                />))}
            </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 让容器占满整个屏幕
        flexDirection: 'column', justifyContent: 'flex-start', // 垂直居中
        alignItems: 'center', // 水平居中
        backgroundColor: '#F5FCFF', // 背景颜色
    },
    profileInfo: {
        backgroundColor: Color.THEME,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: '100%'
    },
    profileText:{
        color:Color.WHITE,
        fontSize:16
    },
    profileAvatar: {
        flexDirection: 'column',
        marginBottom:10,
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#427BE3'
    },
    userInfoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    levelRankContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 150,
        marginTop: 5,
    },
    levelRankText: {
        color: Color.WHITE,
        fontSize: 14,
    }
});


const mapStateToProps = state => {
    return {
        userInfo: state.account.userInfo
    }
}

export default connect(mapStateToProps)(MineScreen);