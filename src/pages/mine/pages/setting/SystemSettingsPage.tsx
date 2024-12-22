import React, {useEffect, useState} from "react";
import {MineItemData} from "pages/mine/component/MineSingleItem";
import {Image, StyleSheet, Text, TextStyle, View} from "react-native";
import {AppDefaultColor} from "utils/AppDefaultColor";
import {NavigationProp} from "@react-navigation/native";
import CommonHeader from "components/CommonHeader";
import {Descriptor} from "@react-navigation/core/src/types";
import {SettingItem, SettingItemProps, SettingItemType} from "pages/mine/pages/setting/component/SettingItem";
import {Modal, Toast} from "@ant-design/react-native";
import {mmkv} from "utils/Constant";
import {DARK_MODE_MMKV_KEY, LOOP_MODE_MMKV_KEY, TOP_MODE_MMKV_KEY} from "pages/mine/pages/setting/SettingsPageConstans";
import Color from "utils/Color";
import {Colors} from "react-native/Libraries/NewAppScreen";

export const SystemSettingsPage: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {
    const navigation: NavigationProp<any> = navigationDes.navigation

    const [darkModeCheckState, setDarkModeCheckState] = useState<boolean>(false)
    const [loopModeCheckState, setLoopModeCheckState] = useState<boolean>(false)
    const [topShowModeCheckState, setTopShowModeCheckState] = useState<boolean>(false)

    useEffect(() => {
        setDarkModeCheckState(mmkv.getBoolean(DARK_MODE_MMKV_KEY) ?? false)
        setLoopModeCheckState(mmkv.getBoolean(LOOP_MODE_MMKV_KEY) ?? false)
        setTopShowModeCheckState(mmkv.getBoolean(TOP_MODE_MMKV_KEY) ?? false)
    }, []);

    return (
        <View style={styles.container}>
            <CommonHeader headerTitle="设置" leftIconName={"chevron-back-outline"} onLeftIconPress={() => {
                onLeftIconPressed(navigation)
            }} leftIconSize={24}></CommonHeader>

            <SettingItem
                mainText={"跟随系统暗色模式"}
                switchCheckStatus={darkModeCheckState}
                onSwitchClicked={(value) => {
                    setDarkModeCheckState(value)
                    mmkv.set(DARK_MODE_MMKV_KEY, value)
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示轮播"}
                switchCheckStatus={loopModeCheckState}
                onSwitchClicked={(value) => {
                    setLoopModeCheckState(value)
                    mmkv.set(LOOP_MODE_MMKV_KEY, value)
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示置顶"}
                switchCheckStatus={topShowModeCheckState}
                onSwitchClicked={(value) => {
                    setTopShowModeCheckState(value)
                    mmkv.set(TOP_MODE_MMKV_KEY, value)
                }}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"清除缓存"}
                onSettingItemPressed={() => {
                    onClearCacheClicked()
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"版本更新"}
                extraText={"已经是最新版本"}
                onSettingItemPressed={() => {
                    Toast.show("已经是最新版本~")
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"关于我们"}
                extraText={"当前版本2.2.5"}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"隐私政策"}
                onSettingItemPressed={() => {
                    navigation.navigate("WebviewScreen", {
                        url: "https://baidu.com"
                    });
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"退出登录"}
                type={SettingItemType.TYPE_DEFAULT}/>

        </View>
    )
}

function onClearCacheClicked() {
    const negativeTextStyle: TextStyle = {
        color: Color.TEXT_DARK
    }

    Modal.alert("确定要清除缓存吗？", "", [{
        text: "取消",
        style: negativeTextStyle
    }, {
        text: "确定",
        onPress: () => {
            Toast.show("已清除所有缓存")
        }
    }])
}

function onLeftIconPressed(navigation: any) {
    navigation.goBack()
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: 'flex-start',
        width: '100%',
        height: '100%'
    }
});
