import React, { useContext, useEffect, useState } from 'react'
import {View,Text,StyleSheet,TextInput,Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
import { AuthenticationContext } from '../../../Services/authentication/authentication.context';
export const PersonalInfo = ({navigation}) => {
    const [usrname,setusrname]= useState("");
    const [mobileno,setmobileno]= useState("");
    const [usraddress,setusraddress]= useState("");
    const { user} = useContext(AuthenticationContext); 
    const { userName, userContactNumber , userAddress , updateuserData} = useContext(UserDataContext);
    useEffect(()=>{
        setusrname(userName)
        setmobileno(userContactNumber)
        setusraddress(userAddress)
    },[])
    const setChangeUserName=(text)=>{
        setusrname(text)
    }
    const setChangeuseraddress=(text)=>{
        setusraddress(text)
    }
    const onSaveChange = async () =>{
        await updateuserData(usrname,mobileno,usraddress);
        await UpdatePersonalUserInfo(usrname,mobileno,usraddress,user)
        navigation.navigate("DashboardScreen")
    }
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{alignItems:'center',width:'100%',justifyContent:'center'}}>
                    <View style={{backgroundColor:'#6DB660',borderRadius:60,width:90,height:90,justifyContent:'center',alignItems:'center',marginVertical:30}}>
                        <Image source={require('../../../../assets/components/userPhoto.jpg')} style={{width:80,height:80,borderRadius:80}} resizeMode='contain'/>
                        <View style={{backgroundColor:'#ffffff',borderRadius:30,width:30,height:30,justifyContent:'center',alignItems:'center',position:'absolute',zIndex:99,bottom:0,right:0}}>
                            <Image source={require('../../../../assets/components/camera.png')} style={{width:20,height:20,borderRadius:80,position:'absolute'}} resizeMode='contain'/>
                        </View>
                    </View>
                </View>
                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:7,backgroundColor:'#f7f6e9',padding:10,marginBottom:20}}>
                    <View style={{fontSize:15,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Name:</Text>
                    </View>
                    <TextInput 
                    autoCompleteType="off"
                    placeholder="Enter your full Name"
                    style={{backgroundColor: '#E9E7D2',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    width: '60%',
                    height: 40,
                    marginRight:30}}
                    value={usrname}
                    onChangeText={setChangeUserName}
                    />
                </View>

                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:7,backgroundColor:'#f7f6e9',padding:10,marginBottom:20}}>
                    <View style={{fontSize:15,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Mobile:</Text>
                    </View>
                    <TextInput 
                    autoCompleteType="off"
                    editable={false}
                    placeholder="Enter your Mobile Number"
                    style={{backgroundColor: '#E9E7D2',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    width: '60%',
                    height: 40,
                    marginRight:30}}
                    value={mobileno}
                    />
                </View>

                <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'center',borderRadius:7,backgroundColor:'#f7f6e9',padding:10,marginBottom:20}}>
                    <View style={{fontSize:15,flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight:'bold'}}>Address:</Text>
                    </View>
                    <TextInput 
                    autoCompleteType="off"
                    placeholder="Enter your full Name"
                    style={{backgroundColor: '#E9E7D2',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    width: '60%',
                    height: 40,
                    marginRight:30}}
                    value={usraddress}
                    onChangeText={setChangeuseraddress}
                    />
                </View>
                
            </ScrollView>
            <TouchableOpacity style={{borderRadius:7,backgroundColor:'#6DB660',padding:10,margin:10}} onPress={onSaveChange}> 
                <Text style={{color:'white'}}>Save Changes</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2',
        justifyContent:'center',
        alignItems:'center'

    }
})
