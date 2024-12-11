import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Switch} from "@ant-design/react-native";
import {mmkv} from "utils/Constant";
import {AppDefaultColor} from "utils/AppDefaultColor";

export interface SettingItemProps {
    data: SettingItemPropsModel
    onSettingItemPressed?: (url: string) => void;
}

export class SettingItemPropsModel {
    mainText: string;
    type: SettingItemType
    routeUrl?: string
    extraText?: string
}

export const SettingItem = (props: SettingItemProps) => {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => {
            if (props.onSettingItemPressed) {
                props.onSettingItemPressed(props.data.routeUrl)
            }
        }}>
            <View style={styles.leftContent}>
                <Text style={styles.mainText}>{props.data.mainText}</Text>
            </View>


            {props.data.type == SettingItemType.TYPE_ROUTE &&
                <View>
                    <Text style={[styles.extraGoInfo]}>{props.data.extraText}</Text>
                    <Image source={require('assets/mine_go.png')} style={{width: 15, height: 15}}/>
                </View>}

            {props.data.type == SettingItemType.TYPE_SWITCH &&
                <View>
                    <Switch/>
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
        height: 46,
        paddingStart: 20,
        paddingEnd: 20,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        marginStart: 10,
        marginBottom: 3,
        color: 'black',
        fontSize: 16
    },
    rightContent: {
        alignItems: "center",
        flexDirection: "row",
    },
    extraGoInfo: {
        marginRight: 10,
        fontSize: 13,
    }
});

export enum SettingItemType {
    TYPE_DEFAULT,
    TYPE_SWITCH,
    TYPE_ROUTE
}
