import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LocationScreen } from "../../features/account/screens/location.screen";
import { AddNewCrop } from "../../features/account/screens/addnewcrops.screen";
import { GetUserInfo } from "../../features/account/screens/getuserinfo.screen";
import { UserLocationContextProvider } from "../../Services/userdata/userlocations.context";
import { UserDataContextProvider } from "../../Services/userdata/userdata.context";
import { SettingData } from "../../features/account/screens/settingdata.screen";
const Stack = createStackNavigator();
export const UserInfoNavigator = () =>{
    return(
    <UserDataContextProvider>
        <UserLocationContextProvider>
            <Stack.Navigator 
                screenOptions={{
                    headerShown:false
                }}
            >
                <Stack.Screen name="location" component={LocationScreen} />
                <Stack.Screen name="AddNewCrop" component={AddNewCrop} />
                <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
                <Stack.Screen name="Settingdata" component={SettingData} />
            </Stack.Navigator>
        </UserLocationContextProvider>
    </UserDataContextProvider>
    )
}