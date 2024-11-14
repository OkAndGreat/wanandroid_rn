import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from 'react-native'
import {Image} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";

interface Props {
    name: string;
    imgName?: string,
    extraText?: string,
    extraColor: string | number
}

const MineSingleItem: React.FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <Image source={require('assets/like.png')} style={{width: 25, height: 25, tintColor: 'blue'}}/>
                <Text style={styles.leftText}>{'123'}</Text>
            </View>

            <View style={styles.rightContent}>
                <Text style={styles.extraGoInfo}>{'3305'}</Text>
                <Text style={styles.goIcon}>{'>'}</Text>
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
        flexDirection: 'row'
    },
    leftText: {
        marginStart: 10,
        color: 'black',
        fontSize: 16
    },
    goIcon: {
        color: 'gray',
        fontSize: 20,
    },
    extraGoInfo: {
        marginRight:10,
        fontSize: 16,
    }
});