import React, {useEffect, useRef} from "react";
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
import "./src/components/RootView"
import Toast from "./src/components/Toast";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WebviewScreen from "./src/pages/webview/WebviewScreen";
import BottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import BottomTabNavigation from "./src/navigation/BottomTabNavigation";


const Stack = createNativeStackNavigator();

function App() {

    return (
        <Provider store={store}>
            <View style={{flex: 1}}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={
                        {
                            headerShown: false
                        }
                    }>
                        <Stack.Screen name="BottomNavigation" component={BottomTabNavigation}/>
                        <Stack.Screen name="WebviewScreen" component={WebviewScreen}/>
                    </Stack.Navigator>

                </NavigationContainer>
            </View>
        </Provider>
    );
}

export default App
