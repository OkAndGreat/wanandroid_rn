import React from "react";
import {StyleSheet} from "react-native";
import {Text} from 'react-native'

interface Props {
    name: string;
}

const MineSingleItem: React.FC<Props> = (props) => {

    return (
        <div style={styles.container}>
            <div style={styles.mainContent}>
                <div style={styles.mainText}>{props.name}</div>
            </div>

            <div style={styles.goIcon}>
                {">"}
            </div>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        height: 46,
    },
    mainContent: {},
    mainText: {},
    goIcon: {}
});