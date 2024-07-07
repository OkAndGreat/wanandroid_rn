import {PureComponent} from "react";
import {View, StyleSheet, Text} from "react-native";

export class HomeListItem extends PureComponent {

    constructor() {
        super();
    }

    render() {
        const {data} = this.props

        const authorStyle = [
            styles.author,
            data.niceShareDate.includes("前") ? {marginStart: 5} : null,
        ].filter(style => style)

        return <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.topContainerLeft}>
                    {data.niceShareDate.includes("前") ? (
                        <Text>新</Text>
                    ) : null}
                    <Text style={authorStyle}>{data.author ? data.author : data.shareUser}</Text>
                </View>
                <Text>{data.niceShareDate}</Text>
            </View>
            <View style={styles.centerContainer}>
                <Text>{data.title}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.chapter}>{data.superChapterName + "·" + data.chapterName}</Text>
            </View>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginStart: 12,
        marginEnd: 12,
        marginBottom:20
    },
    topContainerLeft: {
        flexDirection: "row",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    centerContainer: {},
    bottomContainer: {flexDirection: "row"},
    author: {},
    niceShareDate: {},
    chapter: {}
})