import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import MineSingleItem from "./components/MineSingleItem";
import Color from "../../utils/Color";
import {TouchableOpacityWithoutFeedback} from "../../shared/components/TouchableOpacityWithoutFeedback";
import { setUserInfo } from "../account/store/accountSlice";
import AuthUtil from "../../utils/AuthUtil";
import { useEffect } from "react";
import { getUserCoinInfo } from "../../apis";

class MineScreen extends PureComponent {

    constructor() {
        super();
        this.state = {
            userInfo: null,
            coinInfo: null
        };
        this.initMineDataList();
    }

    componentDidMount() {
        // 获取本地存储的用户信息
        this.loadUserInfo();
        
        // 添加焦点监听器，当页面重新获得焦点时刷新用户信息
        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadUserInfo();
        });
        
        // 添加一个监听器，当页面出现时刷新用户信息
        this.unsubscribeDidAppear = this.props.navigation.addListener('didFocus', () => {
            this.loadUserInfo();
        });
    }

    componentWillUnmount() {
        // 移除焦点监听器
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        
        // 移除didFocus监听器
        if (this.unsubscribeDidAppear) {
            this.unsubscribeDidAppear();
        }
    }

    loadUserInfo = async () => {
        try {
            const userInfo = await AuthUtil.getUserInfo();
            console.log('MineScreen - 加载本地用户信息:', userInfo);
            
            // 如果没有用户信息，直接设置state为null
            if (!userInfo) {
                this.setState({ userInfo: null, coinInfo: null });
                return;
            }
            
            // 创建一个可序列化的用户信息对象
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
                // 将数组转换为字符串，使其可序列化
                chapterTops: JSON.stringify(userInfo?.chapterTops || []),
                collectIds: JSON.stringify(userInfo?.collectIds || [])
            };
            
            this.setState({ userInfo: serializableUserInfo });
            
            // 更新Redux状态
            this.props.dispatch(setUserInfo(serializableUserInfo));
            
            // 获取用户积分信息
            try {
                const coinInfoResponse = await getUserCoinInfo();
                console.log('MineScreen - 获取用户积分信息:', coinInfoResponse);
                
                if (coinInfoResponse && coinInfoResponse.errorCode === 0) {
                    this.setState({ coinInfo: coinInfoResponse.data });
                }
            } catch (error) {
                console.error('MineScreen - 获取用户积分信息出错:', error);
            }
        } catch (error) {
            console.error('MineScreen - 加载用户信息出错:', error);
            // 出错时也设置为null
            this.setState({ userInfo: null, coinInfo: null });
        }
    }

    initMineDataList() {
        this.mineDataList = [{
            name: '我的积分',
            imgName: require('../../assets/mine_credit.png'),
            routes: 'SystemSettingsPage',
            extraText: '3463'
        }, {
            name: '我的分享', imgName: require('../../assets/mine_share.png'), routes: 'SystemSettingsPage'
        }, {
            name: '我的收藏', imgName: require('../../assets/mine_collect.png'), routes: 'SystemSettingsPage'
        }, {
            name: '阅读历史', imgName: require('../../assets/mine_read_history.png'), routes: 'SystemSettingsPage'
        }, {
            name: '开源项目', imgName: require('../../assets/mine_github.png'), routes: 'SystemSettingsPage'
        }, {
            name: '关于作者',
            imgName: require('../../assets/mine_about_author.png'),
            routes: 'SystemSettingsPage',
            extraText: '请他喝杯咖啡~',
            extraTextColor: '#E57343'
        }, {
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
                    extraText={item.extraText}
                    imgName={item.imgName}
                    extraTextColor={item.extraTextColor}
                    name={item.name}
                    onItemClicked={(routes) => {
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
                        navigation.navigate(routes);
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
        // 不再从Redux获取isLogin状态，而是从本地存储获取
        // isLogin: state.account.isLogin
    }
}

export default connect(mapStateToProps)(MineScreen);