import React, {useEffect, useState} from "react";
import {MineItemData} from "pages/mine/component/MineSingleItem";
import {Image, StyleSheet, Text, View} from "react-native";
import {AppDefaultColor} from "utils/AppDefaultColor";
import {NavigationProp} from "@react-navigation/native";
import CommonHeader from "components/CommonHeader";
import {Descriptor} from "@react-navigation/core/src/types";
import {SettingItem, SettingItemProps, SettingItemType} from "pages/mine/pages/setting/component/SettingItem";

const initSystemSettingItems: Array<SettingItemProps> = [
    {
        data: {
            mainText: "123qqq",
            type: SettingItemType.TYPE_DEFAULT
        }
    }
]

export const SystemSettingsPage: (navigationDes: Descriptor<any, any, any>) => void = (navigationDes: Descriptor<any, any, any>) => {

    const [itemList, setItemList] = useState([...initSystemSettingItems]);

    console.log(JSON.stringify(initSystemSettingItems))
    console.log(JSON.stringify(itemList))
    const navigation = navigationDes.navigation

    return (
        <View style={styles.container}>
            <CommonHeader headerTitle="设置" leftIconName={"chevron-back-outline"} onLeftIconPress={() => {
                onLeftIconPressed(navigation)
            }} leftIconSize={24}></CommonHeader>

            {
                itemList.map((item) => (
                    <SettingItem
                        key={item.data.mainText}
                        data={item.data}
                        onSettingItemPressed={item.onSettingItemPressed}/>
                ))
            }
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