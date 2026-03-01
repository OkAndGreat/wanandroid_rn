import {PureComponent} from "react";
import {View, StyleSheet, Text, Touchable, TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeListItem extends PureComponent {

    constructor() {
        super();
    }

    render() {
        const {data, navigation, onItemClicked, onCollectPress} = this.props

        const authorStyle = [
            styles.author,
            data.niceShareDate.includes("前") ? {marginStart: 5} : null,
        ].filter(style => style)

        return <TouchableOpacity style={styles.container} onPress={() => {
            onItemClicked(data.link)
        }} activeOpacity={1}
        >
            <View style={styles.topContainer}>
                <View style={styles.topContainerLeft}>
                    {data.niceShareDate.includes("前") ? (
                        <Text style={styles.newTag}>新</Text>
                    ) : null}
                    <Text style={authorStyle}>{data.author ? data.author : data.shareUser}</Text>
                </View>
                <Text style={styles.niceShareDate}>{data.niceShareDate}</Text>
            </View>
            <View style={styles.centerContainer}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{data.title}</Text>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.chapter}>{data.superChapterName + "·" + data.chapterName}</Text>
                <TouchableOpacity 
                    style={styles.collectButton} 
                    onPress={(e) => {
                        e.stopPropagation();
                        console.log('收藏按钮点击:', data.id, data.originId, data.collect);
                        onCollectPress(data.originId || data.id, data.collect || false);
                    }}
                    hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
                >
                    <Ionicons 
                        name={(data.collect || false) ? "heart" : "heart-outline"} 
                        size={24} 
                        color={(data.collect || false) ? "#FF4757" : "#a5a5a3"} 
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginStart: 12,
        marginEnd: 12,
        marginBottom: 20
    },
    topContainerLeft: {
        flexDirection: "row"
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    centerContainer: {
        marginBottom: 5
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    collectButton: {
        marginLeft: 10
    },
    newTag: {
        color: '#5186E7'
    },
    author: {
        color: '#80807E'
    },
    niceShareDate: {color: '#a5a5a3'},
    title: {
        color: '#353535',
        fontSize: 17
    },
    chapter: {
        color: '#a5a5a3'
    }
})

export default HomeListItem;