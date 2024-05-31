import React, { useEffect } from "react";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { createStackNavigator } from "@react-navigation/stack";
import { UserInfoNavigator } from "./userInfo.navigation";
// import { UserLocationContextProvider } from "../../Services/userData/userlocation.context";
import { UserLocationContextProvider } from "../../Services/userdata/userlocations.context";
import { GetServerData } from "../../features/account/screens/getServerData.Screen";
const Stack = createStackNavigator();
export const AccountNavigator = () =>{
    useEffect(()=>{
        console.log("*****************************3. accountNavigatior.js************************")
      },[])
    return(
    <UserLocationContextProvider>
        <Stack.Navigator 
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen name="Main" component={AccountScreen} />
            <Stack.Screen name="GetServerData" component={GetServerData} />
            <Stack.Screen name="UserInfo" component={UserInfoNavigator} />
        </Stack.Navigator>
    </UserLocationContextProvider>
    )
}