import React, {useEffect, useState} from "react";
import {MineItemData} from "pages/mine/component/MineSingleItem";
import {Image, StyleSheet, Text, View} from "react-native";
import {AppDefaultColor} from "utils/AppDefaultColor";
import {NavigationProp} from "@react-navigation/native";
import CommonHeader from "components/CommonHeader";
import {Descriptor} from "@react-navigation/core/src/types";
import {SettingItem, SettingItemProps, SettingItemType} from "pages/mine/pages/setting/component/SettingItem";
import {Toast} from "@ant-design/react-native";

export const SystemSettingsPage: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {


    const navigation: NavigationProp<any> = navigationDes.navigation

    return (
        <View style={styles.container}>
            <CommonHeader headerTitle="设置" leftIconName={"chevron-back-outline"} onLeftIconPress={() => {
                onLeftIconPressed(navigation)
            }} leftIconSize={24}></CommonHeader>

            <SettingItem
                mainText={"跟随系统暗色模式"}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示轮播"}
                type={SettingItemType.TYPE_SWITCH}/>

            <SettingItem
                mainText={"显示置顶"}
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
