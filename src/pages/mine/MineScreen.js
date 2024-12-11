import React, {PureComponent} from "react";
import {StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import Color from "../../utils/Color";
import MineSingleItem from "./component/MineSingleItem";
import {MineItemData} from "./component/MineSingleItem";

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
            extraText: '请他喝杯咖啡~'
        }, {
            name: '系统设置', imgName: require('../../assets/mine_setting.png'), routes: 'SystemSettingsPage'
        }];
    }

    render() {

        const {navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.profileInfo}>

                </View>
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
    }, profileInfo: {
        backgroundColor: Color.THEME, height: 300, width: '100%'
    }
});


const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(MineScreen);