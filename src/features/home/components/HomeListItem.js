import {PureComponent} from "react";
import {View, StyleSheet, Text, Touchable, TouchableOpacity, Animated} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

class HomeListItem extends PureComponent {

    constructor(props) {
        super(props);
        this.heartFillAnimation = new Animated.Value(props.data.collect ? 1 : 0);
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.data.collect !== this.props.data.collect) {
            if (this.props.data.collect) {
                // 从底部漫延到顶部的动画
                Animated.timing(this.heartFillAnimation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            } else {
                // 取消收藏时重置动画
                this.heartFillAnimation.setValue(0);
            }
        }
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
                    <View style={styles.heartContainer}>
                        <Ionicons 
                            name="heart-outline" 
                            size={24} 
                            color={(data.collect || false) ? "#FF4757" : "#a5a5a3"} 
                        />
                        <Animated.View 
                            style={[
                                styles.heartFillContainer,
                                {
                                    transform: [
                                        {
                                            scaleY: this.heartFillAnimation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, 1],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Ionicons 
                                name="heart" 
                                size={24} 
                                color="#FF4757" 
                            />
                        </Animated.View>
                    </View>
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
    heartContainer: {
        position: 'relative',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heartFillContainer: {
        position: 'absolute',
        width: 24,
        height: 24,
        bottom: 0,
        transformOrigin: 'bottom',
        overflow: 'hidden',
        justifyContent: 'flex-end',
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