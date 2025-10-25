import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Switch} from "@ant-design/react-native";
import {mmkv} from "utils/Constant";
import {AppDefaultColor} from "utils/AppDefaultColor";

export interface SettingItemProps {
    mainText: string;
    mainTextTips?: string
    type: SettingItemType
    switchCheckStatus?: boolean
    routeUrl?: string
    extraText?: string
    onSettingItemPressed?: (url: string) => void;
    onSwitchClicked?: (val: boolean) => void
}

export const SettingItem = (props: SettingItemProps) => {
    return (
        <TouchableOpacity style={styles.container}
                          activeOpacity={props.type == SettingItemType.TYPE_SWITCH ? 1 : 0.5} onPress={() => {
            if (props.onSettingItemPressed) {
                props.onSettingItemPressed(props.routeUrl)
            }
        }}>
            <View style={styles.leftContent}>
                <Text
                    style={[styles.mainText, props.type == SettingItemType.TYPE_ROUTE ? {marginTop: 8} : {}]}>{props.mainText}</Text>
                {props.mainTextTips && <Text style={styles.mainTextTips}>{props.mainTextTips}</Text>}
            </View>


            {props.type == SettingItemType.TYPE_ROUTE &&
                <View style={styles.rightContent}>
                    <Text style={[styles.extraGoInfo]}>{props.extraText}</Text>
                    <Image source={require('assets/mine_go.png')} style={{width: 15, height: 15}}/>
                </View>}

            {props.type == SettingItemType.TYPE_SWITCH &&
                <View>
                    <Switch onChange={props.onSwitchClicked}
                            checked={props.switchCheckStatus}
                            defaultChecked={false}
                            style={[{height: 20, width: 40}]}/>
                </View>
            }


        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        height: 52,
        paddingStart: 25,
        paddingEnd: 15,
    },
    leftContent: {
        flexDirection: 'column',
    },
    mainText: {
        color: 'black',
        fontSize: 16
    },
    mainTextTips: {
        marginTop: 6,
        color: 'grey',
        fontSize: 10
    },
    rightContent: {
        alignItems: "center",
        flexDirection: "row",
    },
    extraGoInfo: {
        marginRight: 10,
        fontSize: 12,
    }
});

export enum SettingItemType {
    TYPE_DEFAULT,
    TYPE_SWITCH,
    TYPE_ROUTE
}
