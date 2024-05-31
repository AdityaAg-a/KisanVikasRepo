import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "../features/Home/HomeScreen";

const Stack = createStackNavigator();

export default function IndexNavigation(){
    return(
        <Stack.Navigator >
            <Stack.Screen headerShown="false" name="Home" component={HomeScreen}/>
        </Stack.Navigator>
    );
}