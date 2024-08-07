import {PureComponent} from "react";
import {PixelRatio, TouchableOpacity} from "react-native";
import {DEVICE_WIDTH} from "../utils/screenUtil";
import Color from "../utils/Color";
import Swiper from 'react-native-swiper';
import {StyleSheet, Text, View, Image,} from "react-native";

class Banner extends PureComponent {
    constructor(props) {
        super(props);
        this.currentBannerIndex = 0
    }

    toShowWebView = (info) => {
        const {navigation} = this.props;
        const {url} = info;
        navigation.navigate('WebviewScreen', {
            url,
        });
    }

    render() {
        const {bannerArr} = this.props;

        return (
            <View style={styles.bannerContainer}>
                <Swiper
                    style={styles.imgCarousel}
                    horizontal={true}
                    loop={true}
                    autoplay={true}
                    removeClippedSubviews={false} // 处理切换页面闪动
                    showsPagination={false}>
                    {bannerArr.map(el => (
                        <View key={el.id}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => this.toShowWebView(el)}>
                                <Image style={styles.imgBanner} source={{uri: el.imagePath}}/>
                            </TouchableOpacity>

                        </View>
                    ))}
                </Swiper>
            </View>
        );
    }
}

const imageHeight = dp(380);
const styles = StyleSheet.create({
    defaultBg: {
        height: imageHeight
    },
    bannerContainer: {
        height: imageHeight
    },
    imgCarousel: {
        height: imageHeight,
    },
    imgBanner: {
        width: '100%',
        height: imageHeight,
        resizeMode: 'stretch',
    },
    bannerHint: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: dp(20),
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: dp(50),
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    bannerText: {
        color: Color.WHITE,
        fontSize: dp(28),
    },
})

function dp(designPx) {
    return PixelRatio.roundToNearestPixel((designPx / 750) * DEVICE_WIDTH);
}

export default Banner;