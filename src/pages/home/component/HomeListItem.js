import {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";

export class HomeListItem extends PureComponent {

    constructor() {
        super();
    }

    render() {
        const {data} = this.props

        return <View style={styles.container}>
            <View style={styles.topContainer}></View>
            <View style={styles.centerContainer}>
                <Text>{data.title}</Text>
            </View>
            <View style={styles.bottomContainer}></View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"

    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    centerContainer: {},
    bottomContainer: {flexDirection: "row"}
})