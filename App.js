import React, {useEffect} from "react";
import {setAxios} from "./src/utils/setAxios";
import {Provider} from "react-redux";
import store from "./src/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AskScreen from "./src/pages/ask/AskScreen";
import HomeScreen from "./src/pages/home/HomeScreen";
import SystemScreen from "./src/pages/system/SystemScreen";
import MineScreen from "./src/pages/mine/MineScreen";
import {BottomTabName} from "./src/utils/Constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import {StatusBar, View} from "react-native";


const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => {
        setAxios()
    }, []);


    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({route}) => ({
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
                                    iconName = 'help'
                                    iconColor = focused ? '#4984F3' : '#999999'
                                    break;
                                }
                                case BottomTabName.BOTTOM_TAB_NAME_MINE: {
                                    iconName = 'book'
                                    iconColor = focused ? '#4984F3' : '#999999'
                                    break;
                                }
                                case BottomTabName.BOTTOM_TAB_NAME_ASK: {
                                    iconName = 'person'
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
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </Provider>


    );
}

export default App
