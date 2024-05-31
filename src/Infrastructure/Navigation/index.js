import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { AuthenticationContext } from "../../Services/authentication/authentication.context";
import { ActivityIndicator, View ,Text, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../../component/utility/loading.screen";
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';



export const Navigation = () => {

  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  async function requestUserPermission() {
    const authStatusMsg = await messaging().requestPermission();
    const enabled =
    authStatusMsg === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatusMsg === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatusMsg);
    }
  }




  const { isAuthenticated ,setisAuthenticated, getAsyncData} = useContext(AuthenticationContext);

  useEffect(()=>{
    if(requestUserPermission()){
      messaging()
        .getToken()
          .then(token =>{
            console.log(token);
          })

    }
    else{
      console.log("Permission not granted ", authStatusMsg);
    }
  },[]);
  useEffect(()=>{
    console.log("****************************2. index.js************************");

    const checkAuthStatus = async () =>{
      try{
        const authStatus = await AsyncStorage.getItem('isAuthenticated');
        setisAuthenticated(authStatus === 'true');
      }
      catch(error){
        console.error("Error checking authStatus", error)
      }
      finally{
        setTimeout(()=>{
          setIsLoading(false);
        },1000);
      }
    }

    checkAuthStatus();
  },[]);
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <LoadingScreen data={"Loading Data"} />    );
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};
