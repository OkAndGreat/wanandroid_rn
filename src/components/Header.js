import {StatusBar, View, StyleSheet, Text} from "react-native";
import {getStatusBarHeight} from "../utils/screenUtil";
import Color from "../utils/Color";

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

const Header = ({headerTitle}) => {
    return (
        <View style={[styles.container]}>
            <StatusBarComp/>
            {/* Header主体 */}
            <View style={[styles.headerContainer]}>
                <Text style={[styles.headerText]}>{headerTitle}</Text>
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
    }
})

export default Header;