import React, { useContext, useEffect, useState } from 'react'
import {View,Text, TextInput, Image, Alert} from 'react-native';
import MapView from 'react-native-maps';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
export const  SelectLocationScreen = () => {
    const { userCity,userState } = useContext(UserDataContext);

    const [cityKeyword,setCityKeyword] = useState("");
    useEffect(()=>{
        setCityKeyword(userCity)
    },[])
    useEffect(()=>{
        //write API call for Google Maps to serach drop down locations
    },[cityKeyword])
    const handlechangeText = (text) =>{
        setCityKeyword(text)
    }
  return (
    <View style={{}}>
        <View style={{alignItems:'center',width:'100%',zIndex:99}}>
            <View style={{margin:10,justifyContent:'center',position:'absolute',width:'95%'}}>
                <Image source={require('../../../../assets/components/seachIcon.png')} style={{width:30,height:30,marginHorizontal:10,position:'absolute',zIndex:10}} resizeMode='contain' />
                <TextInput 
                    style={{backgroundColor:'#fffcd9',paddingHorizontal:45,borderRadius:10,fontSize:18,paddingVertical:10}} 
                    placeholder='Enter your City...'
                    value={cityKeyword}
                    onChangeText={handlechangeText}
                />
            </View>
        </View>
    <MapView style={{height:'100%',width:'100%'}} />
    {/* <MapView.Marker
        coordinate={{
            latitude:12,
            longitude:12
        }}
    ></MapView.Marker> */}
    </View>
  )
}
