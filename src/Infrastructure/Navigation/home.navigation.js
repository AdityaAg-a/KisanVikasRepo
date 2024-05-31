import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeMain } from "../../features/Home/screens/homemain.screen";
import NotificationScreen from "../../features/Home/screens/notification.screen";
import DiseaseDetectNavigator from "./diseasedetect.navigator";
import { CropSuggestion } from "../../features/Home/screens/cropsuggestion.screen";
import { ChatAI } from "../../features/Home/screens/chatai.screen";
import { SelectLocationScreen } from "../../features/Home/screens/setlocation.screen";
import { UserDataContext } from "../../Services/userdata/userdata.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingMain } from "../../features/Home/screens/loadingmain.screen";
import LoadingScreen from "../../component/utility/loading.screen";
import { AuthenticationContext } from "../../Services/authentication/authentication.context";

const HomeStack=createStackNavigator();
export const HomeNavigation = () =>{
    const { getDataFromServer } = useContext(UserDataContext);
    const {userExisted ,setUserExisted} = useContext(AuthenticationContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     if(userExisted){
        //       setIsLoading(true)
        //       console.log("hello getting data from server");
        //       // await getDataFromServer();
        //       console.log("hello getting data from server again");
        //       setTimeout(() => {
                
        //         setUserExisted(false);
        //         setIsLoading(false)
        //       }, 10000);
        //     }
        //   } catch (error) {
        //     console.error("Error setting location:", error);
        //   }
        // };
          // console.log("*-8-8-8--8-8-8-8-8-8-8-8-8-8-8*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*-8_*-8_8-8_8_")
          // console.log("Successfully logged in")
          // console.log("*-8-8-8--8-8-8-8-8-8-8-8-8-8-8*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*-8_*-8_8-8_8_")
        // fetchData();
      }, []);
    // if(isLoading && userExisted){
    //   return(

    //     <LoadingScreen data={"Getting Data from Server"}  /> 
    //   )
    // }
    // else{
    return(
    <HomeStack.Navigator
        screenOptions={{
            headerShown: true, // This line hides the header
        }}
    >
        <HomeStack.Screen name="LoadingMain" component={LoadingMain}  
            options={{ headerShown: false }}/>
        <HomeStack.Screen name="HomeMain" component={HomeMain}  
            options={{ headerShown: false }}/>
        <HomeStack.Screen name="Notification" component={NotificationScreen}  />
        <HomeStack.Screen name="Disease Detect" component={DiseaseDetectNavigator}  />
        <HomeStack.Screen name="Crop Suggestion" component={CropSuggestion}  />
        <HomeStack.Screen name="Chat With KisanAI" component={ChatAI}  />
        <HomeStack.Screen name="Select your Location" component={SelectLocationScreen}  />
    </HomeStack.Navigator>
    )
  // }
}