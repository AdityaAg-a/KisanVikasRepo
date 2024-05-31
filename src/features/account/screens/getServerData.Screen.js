import React, { useContext, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthenticationContext } from "../../../Services/authentication/authentication.context";
import { UserDataContext } from "../../../Services/userdata/userdata.context";
import { getDataFromServerSet } from "../../../Services/userdata/getUserServerNset";
export const GetServerData = () => {
    const { onLogin ,user} =useContext(AuthenticationContext);
    useEffect(() => {
        const gettingData = async ()=>{
            try{
                console.log("what is problem")
                await getDataFromServerSet(user);
                await onLogin();
            }
            catch(error){
                console.error("Error Getting Server Data from Server:",error)
            }
        }
        gettingData();
    }, []); 
    
    return(
        <View style={{flex:1,backgroundColor:'#E9E7D2',justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
                <ActivityIndicator size="small" color="blue" />
                <Text>Getting Data from Server</Text>
            </View>
        </View>
    )
}