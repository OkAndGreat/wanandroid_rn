import React, {useEffect, useState} from "react";
import {MineItemData} from "pages/mine/component/MineSingleItem";
import {Image, StyleSheet, Text, View} from "react-native";
import {AppDefaultColor} from "utils/AppDefaultColor";
import {NavigationProp} from "@react-navigation/native";
import CommonHeader from "components/CommonHeader";
import {Descriptor} from "@react-navigation/core/src/types";
import {SettingItem, SettingItemProps, SettingItemType} from "pages/mine/pages/setting/component/SettingItem";
import {Toast} from "@ant-design/react-native";
import {mmkv} from "utils/Constant";
import {DARK_MODE_MMKV_KEY, LOOP_MODE_MMKV_KEY, TOP_MODE_MMKV_KEY} from "pages/mine/pages/setting/SettingsPageConstans";

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
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"版本更新"}
                onSettingItemPressed={() => {
                    Toast.show("已经是最新版本~")
                }}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"关于我们"}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"隐私政策"}
                type={SettingItemType.TYPE_ROUTE}/>

            <SettingItem
                mainText={"退出登录"}
                type={SettingItemType.TYPE_DEFAULT}/>

        </View>
    )
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
