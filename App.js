import React, {useEffect, useRef} from "react";
import {setAxios} from "./src/utils/setAxios";
import {Provider as ReduxProvider} from "react-redux";
import store from "./src/store";
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import AskScreen from "./src/pages/ask/AskScreen";
import HomeScreen from "./src/pages/home/HomeScreen";
import SystemScreen from "./src/pages/system/SystemScreen";
import MineScreen from "./src/pages/mine/MineScreen";
import {BottomTabName} from "./src/utils/Constant";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Provider as AntProvider, Toast } from '@ant-design/react-native';
import {StatusBar, View} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WebviewScreen from "./src/pages/webview/WebviewScreen";
import BottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";
import {SystemSettingsPage} from "./src/pages/mine/pages/setting/SystemSettingsPage";
import NativeStackNavigator from "@react-navigation/native-stack/src/navigators/createNativeStackNavigator";
import {LoginScreen} from "pages/account/LoginScreen";



const Stack = createNativeStackNavigator();

function App() {

    return (
        <AntProvider>
            <ReduxProvider store={store}>
                <View style={{flex: 1}}>
                    <NavigationContainer>
                        <Stack.Navigator screenOptions={
                            {
                                headerShown: false
                            }
                        }>
                            <Stack.Screen name="BottomNavigation" component={BottomTabNavigation}/>
                            <Stack.Screen name="WebviewScreen" component={WebviewScreen}/>
                            <Stack.Screen name="SystemSettingsPage" component={SystemSettingsPage}/>
                            <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                        </Stack.Navigator>

                    </NavigationContainer>
                </View>
            </ReduxProvider>
        </AntProvider>

    );
}

export default App
