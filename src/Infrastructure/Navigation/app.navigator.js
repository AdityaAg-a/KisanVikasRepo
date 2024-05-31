import React, { useContext, useEffect } from "react";
import { Alert, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeNavigation } from "./home.navigation";
import { DashboardNavigation } from "./dashboard.navigation";
import { UserLocationContextProvider } from "../../Services/userdata/userlocations.context";
import { UserDataContextProvider } from "../../Services/userdata/userdata.context";
import { MarketPriceContextProvider } from "../../Services/marketprice/marketprice.context";
import { WeatherForcastContextProvider } from "../../Services/weatherinfo/weatherforcast.context";
import { DiseaseDetectContextProvider } from "../../Services/diseasesdetect/diseasedetect.context";
import { ChatAIContextProvider } from "../../Services/chatai/chatai.context";
import { AuthenticationContext } from "../../Services/authentication/authentication.context";
import { NotificationContextProvider } from "../../Services/notification/notification.context";


const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  useEffect(() => {
    console.log(
      "*****************************3. AppNavigator.js************************"
    );
  }, []);
  return (
    <UserDataContextProvider>
      <MarketPriceContextProvider>
        <WeatherForcastContextProvider>
          <NotificationContextProvider>
            <DiseaseDetectContextProvider>
              <ChatAIContextProvider>
                <Tab.Navigator
                  screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "Home") {
                        iconName = focused
                          ? require("../../../assets/tabnav/home.png")
                          : require("../../../assets/tabnav/home.png");
                      } else if (route.name === "Community") {
                        iconName = focused
                          ? require("../../../assets/tabnav/community.png")
                          : require("../../../assets/tabnav/community.png");
                      } else if (route.name === "Contract Farming") {
                        iconName = focused
                          ? require("../../../assets/tabnav/contractFarming.png")
                          : require("../../../assets/tabnav/contractFarming.png");
                      } else if (route.name === "Dashboard") {
                        iconName = focused
                          ? require("../../../assets/tabnav/dashboard.png")
                          : require("../../../assets/tabnav/dashboard.png");
                      }
                      return (
                        <Image
                          source={iconName}
                          style={{ width: size, height: size, tintColor: color }}
                        />
                      );
                    },
                    // New options for tab bar customization
                    tabBarActiveTintColor: "black",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                      fontSize: 8,
                      fontWeight: "bold",
                      marginBottom: 4,
                    },
                    tabBarStyle: {
                      backgroundColor: "#ffffff",
                      borderTopWidth: 1,
                      display: "flex", // Removed unnecessary null value
                    },
                    tabBarHideOnKeyboard: true,
                    keyboardHidesTabBar: true,
                  })}
                >
                  <Tab.Screen
                    name="Home"
                    component={HomeNavigation}
                    options={{ headerShown: false }}
                  />
                  <Tab.Screen
                    name="Dashboard"
                    component={DashboardNavigation}
                    options={{ headerShown: false }}
                  />
                </Tab.Navigator>
               </ChatAIContextProvider>
            </DiseaseDetectContextProvider>
          </NotificationContextProvider>
        </WeatherForcastContextProvider>
      </MarketPriceContextProvider>
    </UserDataContextProvider>
  );
};
