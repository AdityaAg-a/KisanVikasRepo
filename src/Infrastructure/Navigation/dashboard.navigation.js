    import React from "react";
    import { createStackNavigator } from "@react-navigation/stack";
    import { DashboardScreen } from "../../features/dashboard/screens/dashboard.screen";
import { PersonalInfo } from "../../features/dashboard/screens/personalinfo.screen";
import { FarmInfo } from "../../features/dashboard/screens/farminfo.screen";

    const DashboardStack=createStackNavigator();
    export const DashboardNavigation = () =>{
        return(
        <DashboardStack.Navigator
            screenOptions={{
                headerShown: false, // This line hides the header
            }}
        >
                <DashboardStack.Screen name="DashboardScreen" component={DashboardScreen}  />
                <DashboardStack.Screen name="Personal Info" component={PersonalInfo}  />
                <DashboardStack.Screen name="Farm Info" component={FarmInfo}  />
        </DashboardStack.Navigator>
        )
    }