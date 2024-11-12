import React from "react";
import {StyleSheet, View} from "react-native";
import {Text} from 'react-native'
import {Image} from 'react-native';

interface Props {
    name: string;
}

const MineSingleItem: React.FC<Props> = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                {/*<Image source={require('./assets/like.png')} style={{width: 20, height: 20}}/>*/}
                <Text style={styles.leftText}>{'123'}</Text>
            </View>

            <View style={styles.rightContent}></View>
            <View style={styles.goIcon}>
            </View>
        </View>
    )
}

export default MineSingleItem;


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        height: 46,
    },
    rightContent: {},
    leftContent: {},
    leftText: {},
    goIcon: {}
});