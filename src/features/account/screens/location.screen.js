import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image ,StatusBar, BackHandler, Alert } from 'react-native';
import * as Location from 'expo-location';
import { UserLocationContext } from '../../../Services/userdata/userlocations.context';
import { AuthenticationContext } from '../../../Services/authentication/authentication.context';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
import LoadingScreen from '../../../component/utility/loading.screen';

export async function GetPermission(){
  try{
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});
        return location;
    }
    else{
      return "";
    }
  }
  catch (error) {
    console.error("Error fetching location:", error.message);
    return "";
  }
} 

export const LocationScreen = ({ navigation }) => {
  const { allCrop, selectedCrops ,userCity, userState,onSettingLocation }= useContext(UserDataContext);
  const { onLogout , user} = useContext(AuthenticationContext);
  const { t } = useTranslation();
  const handleBackPress = () => {
    // Call the onLogout function
    // Alert.alert("pressing back")
    // onLogout(); // This function should handle the logout logic and navigate to the login screen
    // return true; // Prevent default behavior (exit app)
  };

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackPress // Pass the handleBackPress function as the event handler
  //   );

  //   return () => backHandler.remove();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       // navigation.pop(2); // remove two screens i.e. Document and Camera
  //       Alert.alert("location wala back")
  //       onLogout();
  //       // return true // disable normal behaviour
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress); // detect back button press
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress');
  //   }, [])
  // );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       if (isSelectionModeEnabled()) {
  //         disableSelectionMode();
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };

  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       onBackPress
  //     );

  //     return () => subscription.remove();
  //   }, [isSelectionModeEnabled, disableSelectionMode])
  // );
  const onPressGetLocation = async () => {
    try {
      setIsLoading(true);
      const data = await GetPermission();
      // console.log(data);
      await onSettingLocation(data.coords.latitude,data.coords.longitude);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting location:", error);
      setIsLoading(false);
    }
  };
  
  const onPressnxt = () => {
    navigation.navigate("AddNewCrop");
  }
  const [isLoading, setIsLoading] = useState(false);

  // if (isLoading) {
  //   return (
  //     <LoadingScreen data={"Getting Location"} />    );
  // }
  return (
    
    <View style={styles.container}>
      {isLoading?
        <View style={{width:'100%',position:'absolute',height:'100%',justifyContent:'center'}}>
      <LoadingScreen data={"Getting Location"}  /> 
      </View>
      :<></>}
    <StatusBar barStyle='light-content'  />
    
     {/* using as Stack bubble UI and Its background image */}
      <View style={styles.containebuubler}>
        
        <Image
          source={require('../../../../assets/UserInfoIMG/locationpermission.png')}
          style={[styles.bgimg, { width: '100%' }]}
          resizeMode='cover'
        />
        <View
          style={styles.choicebtn}
        >
          <View style={styles.choicebtnselected} />
        </View>
        <View
          style={styles.choicebtn}>

        </View>
        <View
          style={styles.choicebtn}>

        </View>
      </View>
      <View style={styles.mainscreen}>
        <Image
          source={require('../../../../assets/locationSymbol.png')}
          style={styles.dataphoto}
          resizeMode="contain"
        />
        <Text style={styles.datatext}>{t('8')}</Text>
        <TouchableOpacity style={styles.btnbg} >
          <Text style={styles.btntext} title="Get Location" onPress={onPressGetLocation}>{t('9')}</Text>
        </TouchableOpacity>

        {userCity !== undefined && userCity !== "" && userState !== undefined && userState !== "" && (
          <View style={{marginTop: '10%', flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../../assets/farmLocation.png')}
              style={{width: 30, height: 30, marginRight: 10}}
              resizeMode="contain"
            />
            <Text style={{fontStyle: 'italic'}}>{userCity}, {userState}</Text>
          </View>
        )}
      </View>
      <View style={styles.stackbtn}>
        {/* <TouchableOpacity style={styles.leftStackbtn}></TouchableOpacity> */}
        <TouchableOpacity style={styles.rightStackbtn} onPress={onPressnxt}></TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFDD0',
  },
  // TopComponent: {
  //   flex: 1,
  //   backgroundColor: 'green',
  //   position: 'absolute',
  // },
  mainscreen: {
    flex: 4,
    width: '100%',
    alignItems: 'center',
    position:'relative'
  },
  datatext: {
    position: 'relative',
    // top: '40%',
    marginTop:'10%',
    fontSize: 20,    // fontSize: '20px',
  },
  dataphoto: {
    width: 100,
    height: 100,
    marginTop:'15%'
    // top: '10%',
  },
  btnbg: {
    // position: 'absolute',
    padding: 10,
    justifyContent:'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#6DB660',
    borderRadius: 50,
    // top: '50%',
    textAlign: 'center',
    marginTop:'10%'
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',
      
  },
  stackbtn: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  leftStackbtn: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 25,
    borderRightWidth: 50,
    borderBottomWidth: 25,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: '#6DB660',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginLeft: 15,
  },
  rightStackbtn: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 25,
    borderRightWidth: 0,
    borderBottomWidth: 25,
    borderLeftWidth: 50,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#6DB660',
    marginRight: 15,
  },

  //

  containebuubler: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    height: 200,
    justifyContent: 'center'

  },
  bgimg: {
    position: 'absolute',
    flex: 1,
    height: 150,
    top: 0,
    backgroundColor: 'lightblue'
  },
  choicebtn: {
    backgroundColor: '#E9E7D2',
    height: 16,
    width: 16,
    borderRadius: 8,
    margin: 1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  choicebtnselected: {
    backgroundColor: '#6DB660',
    width: 9,
    height: 9,
    borderRadius: 5,

  }


});
