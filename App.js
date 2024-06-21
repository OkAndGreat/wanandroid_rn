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


const Tab = createBottomTabNavigator();

function App() {
    useEffect(() => {
        setAxios()
    }, []);


    return (
        <Provider store={store}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeScreen} />
                    <Tab.Screen name="Ask" component={AskScreen} />
                    <Tab.Screen name="System" component={SystemScreen} />
                    <Tab.Screen name="Mine" component={MineScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </Provider>


    );
}

export default App
