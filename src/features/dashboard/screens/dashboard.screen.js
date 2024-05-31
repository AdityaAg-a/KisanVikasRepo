import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text,View, TouchableOpacity,Image,Alert, ScrollView,Modal} from 'react-native';
import { AuthenticationContext } from '../../../Services/authentication/authentication.context';
import { UserDataContext } from '../../../Services/userdata/userdata.context';

import { useTranslation } from "react-i18next";
import i18next from "i18next";

export const DashboardScreen = ({navigation}) =>{
    const {loginGuest,onLogout } = useContext(AuthenticationContext);
    const { userName,useridD,isverfied } = useContext(UserDataContext);

    const [showSelectLang, setShowSelectLang] = useState(false);
    const [langSelected, setlangSelected] = useState("en");
    const [currentLanguage, setCurrentLanguage] = useState(null);

    useEffect(() => {
        const fetchResource = async () => {
            var selectedLang=i18next.language
            if(selectedLang== "pn"){
                setCurrentLanguage("ਪੰਜਾਬੀ")
            }
            else if(selectedLang== "en"){
                setCurrentLanguage("English")
            } 
            else if(selectedLang== "hn"){
                setCurrentLanguage("हिंदी")
            }
        };

        fetchResource();
    }, []);

    const logout =()=>{
        Alert.alert(
            'Confirm',
            'Do you want to Logout?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        onLogout();
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'No',
                    onPress: () => {},
                  },

            ],
            {
                cancelable: true,
                onDismiss: () =>{

                }
            },
        )
    }

    const changeLang = (option) => {
        setlangSelected(option);
        i18next.changeLanguage(option);
        if(option== "pn"){
            setCurrentLanguage("ਪੰਜਾਬੀ")
        }
        else if(option== "en"){
            setCurrentLanguage("English")
        } 
        else if(option== "hn"){
            setCurrentLanguage("हिंदी")
        }
        setShowSelectLang(false);
      };



  return (
    <View style={styles.container}>
        <View style={{width:'100%', justifyContent:'center',alignItems:'center'}}>
        {isverfied?
            <TouchableOpacity style={{position:'absolute',right:9,top:9,flexDirection:'column',alignItems:'center'}} onPress={logout}>
                <Image source={require('../../../../assets/components/Logoutbtn.png')} style={{width:20,height:20}} resizeMode='contain'/>
                <Text>Logout</Text>
            </TouchableOpacity>:
            <TouchableOpacity style={{position:'absolute',right:9,top:9,flexDirection:'column',alignItems:'center'}} onPress={loginGuest}>
                <Text>Login Now</Text>
            </TouchableOpacity>
        }
        <View style={{backgroundColor:'#6DB660',borderRadius:60,width:70,height:70,justifyContent:'center',alignItems:'center',marginTop:30}}>
            <View style={{width:60,height:60,borderRadius:30}}>
                <Image source={require('../../../../assets/components/userPhoto.jpg')} style={{width:60,height:60,borderRadius:30}} resizeMode='contain'/>
            </View>
        </View>
                
        <Text style={{fontSize:22,marginTop:10}}>{userName}</Text>
        {isverfied?<Text style={{fontSize:15,marginTop:2}}>+91 {useridD}</Text>
        :<Text style={{fontSize:15,marginTop:2}}>Guest User</Text>}
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}}  onPress={() => setShowSelectLang(true)}>
            <Image source={require('../../../../assets/components/languageSymbol.png')} style={{width:30,height:30,marginRight:6,}} resizeMode='contain' />
            <Text style={{fontSize:15,marginTop:2}}>{currentLanguage}</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.greenBox}>
                
            </View>
        <ScrollView style={{flex:1,width:'100%',marginTop:40}}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={styles.InfoBox} onPress={()=>{navigation.navigate("Personal Info")}}>
                    <View style={{width:60,height:60,borderRadius:60,backgroundColor:'#E9E7D2',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../../../assets/components/PersonalInfo.png')} style={{width:'75%',height:'75%'}} resizeMode='contain'/>
                    </View>
                    <Text style={{marginTop:10,fontSize:15}}>Personal Info</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.InfoBox} onPress={()=>{navigation.navigate("Farm Info")}}>
                    <View style={{width:60,height:60,borderRadius:60,backgroundColor:'#E9E7D2',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../../../assets/components/farmInfo1.png')} style={{width:'75%',height:'75%'}} resizeMode='contain'/>
                    </View>
                    <Text style={{marginTop:10,fontSize:15}}>Farm Info</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={styles.InfoBox}>
                    <View style={{width:60,height:60,borderRadius:60,backgroundColor:'#E9E7D2',justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../../../assets/components/setiing.png')} style={{width:'70%',height:'70%'}} resizeMode='contain'/>
                    </View>
                    <Text style={{marginTop:10,fontSize:15}}>Setting</Text>
                </TouchableOpacity>
            </View>             */}
        </ScrollView>
        <Modal transparent={true} visible={showSelectLang}
        onRequestClose={() => {
            setShowSelectLang(!showSelectLang);}}
      >
            <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
            <View  style={{  alignItems: "center",backgroundColor:'#FFFDD0',borderRadius:50,height:'25%'}}>
                <Text style={{margin:20,fontSize:17}}>Select Language</Text>
                <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={[
                    styles.selectlangbg,
                    {},
                    langSelected === "pn" && styles.buttonPressed,
                    ]}
                    onPress={() => changeLang("pn")}
                >
                    <Image
                    source={require("../../../../assets/language/punjabi.png")}
                    style={styles.selectlangimg}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.selectlangbg,
                    {},
                    langSelected === "en" && styles.buttonPressed,
                    ]}
                    onPress={() => changeLang("en")}
                >
                    <Image
                    source={require("../../../../assets/language/english.png")}
                    style={styles.selectlangimg}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                    styles.selectlangbg,
                    {},
                    langSelected === "hn" && styles.buttonPressed,
                    ]}
                    onPress={() => changeLang("hn")}
                >
                    <Image
                    source={require("../../../../assets/language/hindi.png")}
                    style={styles.selectlangimg}
                    resizeMode="contain"
                    />
                </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor: '#E9E7D2',
    },
    greenBox: {
        marginTop:100,
        backgroundColor: '#A3BE9E',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '100%',
        alignItems: 'center',
        flex: 1,
        position:'absolute',
        top:"33%",
        bottom:0
      },
      InfoBox:{
        zIndex:999,
        backgroundColor: '#6DB660',
        width:"40%",
        height:140,
        margin:10,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
      },
      selectlangbg: {
        position: "relative",
        backgroundColor: "#E9E7D2",
        borderRadius: 32,
        marginHorizontal: 20,
        // top: '65%',
        width: 52,
        height: 52,
        alignItems: "center",
        justifyContent: "center",
      },
      selectlangimg: {
        width: "70%",
        height: "70%",
        marginTop: 5,
        marginLeft: 1,
      },
      buttonPressed: {
        borderWidth: 2,
        borderColor: "green",
      },
})