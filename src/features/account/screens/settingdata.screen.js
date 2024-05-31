import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthenticationContext } from "../../../Services/authentication/authentication.context";
import { UserDataContext } from "../../../Services/userdata/userdata.context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingData = () => {
    const [dataHasBeenSet, setDataHasBeenSet] = useState(false);

    const { user,onLogin } =useContext(AuthenticationContext);
    const { onSetUser ,setDatatoServer ,setasyncStorage , isverfied } = useContext(UserDataContext);
    useEffect(() => {
        const settingData = async ()=>{
             // Once onSetUser is successful, set data to server
             const verficationStatus = await AsyncStorage.getItem('isVerified');
            //  setisAuthenticated(verficationStatus === 'true');
             console.log("checking if is true of not : ", verficationStatus)
             if(verficationStatus === 'true'){
                await setDatatoServer();
             }  
             // After setting data to server, set async storage
             await setasyncStorage();
             await onLogin();
        }
        setDataAndLogin();
        if(dataHasBeenSet){
            settingData();
        }
    }, [dataHasBeenSet]); 
    const setDataAndLogin = async () => {
        try {
            // Set user data
            await onSetUser(user, "true");
            // Set dataHasBeenSet to true to indicate that data setup is complete
            setTimeout(() => {
                setDataHasBeenSet(true);
            }, 2000);
        } catch (error) {
            console.error("Error setting data and logging in:", error);
            // Handle error if any of the async operations fail
        }
    };
    return(
        <View style={{flex:1,backgroundColor:'#E9E7D2',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <ActivityIndicator size="small" color="blue" />
                <Text>Setting up Your Data</Text>
            </View>
        </View>
    )
}