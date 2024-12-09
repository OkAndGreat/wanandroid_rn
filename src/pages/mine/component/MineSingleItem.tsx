import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from 'react-native'
import {Image} from 'react-native';
import {ColorValue} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ImageSourcePropType} from "react-native/Libraries/Image/Image";
import {AppDefaultColor} from "utils/AppDefaultColor";

export interface MineItemData {
    name: string;
    imgName: ImageSourcePropType | undefined,
    extraText?: string,
    extraTextColor?: ColorValue
}

const MineSingleItem: React.FC<MineItemData> = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image source={props.imgName} style={{width: 18, height: 18, tintColor: AppDefaultColor.THEME_COLOR}}/>
                <Text style={styles.leftText}>{props.name}</Text>
            </View>

            <View style={styles.rightContent}>
                <Text style={[styles.extraGoInfo, {color: props.extraTextColor}]}>{props.extraText}</Text>
                <Image source={require('assets/mine_go.png')} style={{width: 15, height: 15}}/>
            </View>

        </View>
    )
}

export default MineSingleItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '100%',
        height: 46,
        paddingStart: 20,
        paddingEnd: 25,
    },
    rightContent: {
        alignItems: "center",
        flexDirection: "row",
    },
    leftContent: {
        flexDirection: 'row',
        alignItems:'center',
    },
    leftText: {
        marginStart: 10,
        marginBottom:3,
        color: 'black',
        fontSize: 16
    },
    extraGoInfo: {
        marginRight: 10,
        fontSize: 16,
    }
});