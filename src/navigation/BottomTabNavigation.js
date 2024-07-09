import React, {PureComponent} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {BottomTabName} from "../utils/Constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../pages/home/HomeScreen";
import AskScreen from "../pages/ask/AskScreen";
import SystemScreen from "../pages/system/SystemScreen";
import MineScreen from "../pages/mine/MineScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

class BottomTabNavigation extends PureComponent {

    constructor() {
        super();
    }

    render() {
        return <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                let iconColor;

                switch (route.name) {
                    case  BottomTabName.BOTTOM_TAB_NAME_HOME: {
                        iconName = 'home'
                        iconColor = focused ? '#4984F3' : '#999999'
                        break;
                    }
                    case BottomTabName.BOTTOM_TAB_NAME_SYSTEM: {
                        iconName = 'book'
                        iconColor = focused ? '#4984F3' : '#999999'
                        break;
                    }
                    case BottomTabName.BOTTOM_TAB_NAME_MINE: {
                        iconName = 'person'
                        iconColor = focused ? '#4984F3' : '#999999'
                        break;
                    }
                    case BottomTabName.BOTTOM_TAB_NAME_ASK: {
                        iconName = 'help'
                        iconColor = focused ? '#4984F3' : '#999999'
                        break;
                    }
                }


                return <Ionicons name={iconName} size={20} color={iconColor}/>;
            },
            tabBarActiveTintColor: '#4984F3',
            tabBarInactiveTintColor: '#999999',
            tabBarStyle: {
                paddingBottom: 15,
                height: 60,
            },
            tabBarLabelStyle: {
                fontSize: 12
            },
            headerShown: false
        })}>
            <Tab.Screen name={BottomTabName.BOTTOM_TAB_NAME_HOME} component={HomeScreen}/>
            <Tab.Screen name={BottomTabName.BOTTOM_TAB_NAME_ASK} component={AskScreen}/>
            <Tab.Screen name={BottomTabName.BOTTOM_TAB_NAME_SYSTEM} component={SystemScreen}/>
            <Tab.Screen name={BottomTabName.BOTTOM_TAB_NAME_MINE} component={MineScreen}/>
        </Tab.Navigator>;
    }
}

export default BottomTabNavigation;