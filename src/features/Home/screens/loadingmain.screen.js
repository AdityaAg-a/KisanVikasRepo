import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
import LoadingScreen from '../../../component/utility/loading.screen';
import { View } from 'react-native';

export const LoadingMain = ({navigation}) =>{
    const { loggedInFirstTime } = useContext(UserDataContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await loggedInFirstTime();
                // console.log("userCity: " + userCity);
                // console.log("userState: " + userState);
                // console.log("allCrop: " + allCrop);
                // console.log(allCrop);
                // console.log("selectedCrops: " + selectedCrops);
                // console.log(selectedCrops);
                setTimeout(() => {
                    
                }, 2000);
                // Once data is loaded, navigate to the main screen
            } catch (error) {
                console.error("Error loading data:", error);
                // Handle error if necessary
            }
            navigation.replace("HomeMain");
        };
    
        fetchData();
    }, []);

    return (
        <View style={{flex:1}}>
            <LoadingScreen data="Getting data"/>
        </View>
    )

}