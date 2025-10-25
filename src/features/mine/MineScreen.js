import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import MineSingleItem from "./components/MineSingleItem";
import Color from "../../utils/Color";
import {TouchableOpacityWithoutFeedback} from "../../shared/components/TouchableOpacityWithoutFeedback";

class MineScreen extends PureComponent {

    constructor() {
        super();
        this.initMineDataList();
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

        const {navigation, isLogin} = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacityWithoutFeedback style={styles.profileInfo} onPress={() => {
                    navigation.navigate('LoginScreen');
                }}>
                    <View style={styles.profileAvatar}>
                        <Image source={require('../../assets/android.png')} style={{width: 36, height: 36}}/>
                    </View>
                    {
                        isLogin ? <View>
                            <Text style={[styles.profileText]}></Text>
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
                        navigation.navigate(routes)
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
    }
});


const mapStateToProps = state => {
    return {
        isLogin: state.account.isLogin
    }
}

export default connect(mapStateToProps)(MineScreen);