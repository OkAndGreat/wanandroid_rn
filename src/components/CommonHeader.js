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
                          headerHeight = 40,
                          headerTextSize = 20,
                          leftIconName = undefined,
                          leftIconSize = 20,
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
            <View style={[styles.headerContainer, {height: headerHeight}]}>
                <View style={[styles.leftIcon]}>
                    {leftIconName ? <Ionicons name={leftIconName} size={leftIconSize} color={Color.WHITE}
                                              onPress={onLeftIconPress}></Ionicons> : null}
                </View>
                <Text style={[styles.headerText, {fontSize: headerTextSize}]}>{headerTitle}</Text>
                <View style={[styles.rightIcon]}>
                    {rightIconName ? <Ionicons name={rightIconName} size={20} color={Color.WHITE}
                                               onPress={onRightIconPress}></Ionicons> : null}
                </View>

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
        alignItems: 'center',
        width: '100%'
    },
    headerText: {
        marginLeft: 'auto', // 水平自动边距
        marginRight: 'auto', // 水平自动边距
        marginBottom: 5,
        color: Color.WHITE
    },
    leftIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 100,
        marginStart: 20
    },
    rightIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 100,
        marginEnd: 20
    }
})

export default CommonHeader;