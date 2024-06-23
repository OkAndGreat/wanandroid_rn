import {StatusBar, View, StyleSheet, Text} from "react-native";
import {getStatusBarHeight} from "../utils/screenUtil";
import Color from "../utils/Color";
import {Icon} from "react-native-vector-icons/index";
import Ionicons from "react-native-vector-icons/Ionicons";

const StatusBarComp = (props) => {
    const {isDarkStyle = true, statusBarBgColor = Color.THEME} = props;

    return (
        <View style={{height: getStatusBarHeight(), backgroundColor: statusBarBgColor}}>
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle={isDarkStyle ? 'dark-content' : 'light-content'}
            />
        </View>
    );
}

const CommonHeader = ({
                          headerTitle,
                          leftIconName = undefined,
                          onLeftIconPress = () => {

                          },
                          rightIconName = undefined,
                          onRightIconPress = () => {
                          },
                      }) => {
    return (
        <View style={[styles.container]}>
            <StatusBarComp/>
            {/* Header主体 */}
            <View style={[styles.headerContainer]}>
                {leftIconName ? <Ionicons style={[styles.leftIcon]} name={leftIconName} size={20} color={Color.WHITE}
                                          onPress={onLeftIconPress}></Ionicons> : null}
                <Text style={[styles.headerText]}>{headerTitle}</Text>
                {rightIconName ? <Ionicons style={[styles.rightIcon]} name={rightIconName} size={20} color={Color.WHITE}
                                           onPress={onRightIconPress}></Ionicons> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    headerContainer: {
        backgroundColor: Color.THEME,
        flexDirection: 'row',
        alignItems: 'center', // 交叉轴居中
        height: 50,
        width: '100%'
    },
    headerText: {
        marginLeft: 'auto', // 水平自动边距
        marginRight: 'auto', // 水平自动边距
        alignSelf: 'center', // 垂直居中
        color: Color.WHITE,
        fontSize: 18
    },
    leftIcon: {
        marginStart: 20
    },
    rightIcon: {
        marginEnd: 20
    }
})

export default CommonHeader;