import React, { useState, useEffect,useRef, useContext } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  Keyboard,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
  
} from 'react-native';
import { AuthenticationContext } from '../../../Services/authentication/authentication.context';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import LoadingScreen from '../../../component/utility/loading.screen';

import auth from "@react-native-firebase/auth"
import { checkUserExist } from '../../../Services/authentication/authentication.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const  AccountScreen = ({navigation})  => {
    const { onLogin , verifyUser ,user ,setUser,onLogout,setUserMobileLoggerIn,setisVerified,setUserExisted} = useContext(AuthenticationContext);
    const BASE_URL="http://192.168.1.38:8080";
    const [isPressed, setIsPressed] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [optvalue, setoptvalue] = useState('');
    const [showDiv, setShowDiv] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingMsg, setIsLoadingMsg] = useState("");

    const [userid, setuserid] = useState("");
    const [error, seterror] = useState("");

    const [langSelected, setlangSelected ] = useState("en");
    const { t } = useTranslation();
    const [firebaseConfirmation, setFirebaseConfirmation] = useState(null);
    const signInwithphoneNumber = async () =>{
      try{
        const mynumber="+91 "+userid;
        console.log("mynumber: ", mynumber)
        const confirmation = await auth().signInWithPhoneNumber(mynumber)
        setFirebaseConfirmation(confirmation)
        console.log("confirmation",confirmation)
        return confirmation;
        //return "mydata"
      }
      catch(error){
        console.log("Error in firebase",error)
        throw error; 
      }
    }

    const handleuseridchange =(text)=>{
     // console.log("checking text", text)
        setuserid(text);
    }
  
  const handleuseridsubmit=()=>{
    if(userid.trim() ===""){
      seterror("Enter Correct Mobile Number")
    }
    else{
      seterror("");
      setShowModal(true);
    }
  }
  const LoginAsGuest= async ()=>{
    //onLogin();
    verifyUser("Guest_12312");
    await AsyncStorage.setItem("isVerified","false");
    navigation.navigate("UserInfo");
  }
  const onSubmitOTP= async ()=>{
    if (optvalue.length == 6) {
      const options = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          "mobileno": userid.toString(),
          "otp":optvalue.toString()
        })
      };
      if(userid=="00001" && optvalue=="101010"){
        setShowOTPWindow(false);
        verifyUser(userid);
        await AsyncStorage.setItem("isVerified","false");
        navigation.navigate("UserInfo");
      }
      else{
        try{
          setIsLoading(true);
          setIsLoadingMsg("Verfiying OTP!!")
        const userCredentail = await firebaseConfirmation.confirm(optvalue.toString())
        const user = userCredentail.user;
        //const user = true;
        if(user){
          setShowOTPWindow(false);
          await verifyUser(userid);
          var useStatus=await checkUserExist(userid);
          if(useStatus){
            await setUserExisted(true);
            await AsyncStorage.setItem("isVerified","true");
            setIsLoading(false);
            setIsLoadingMsg("");
            navigation.navigate("GetServerData");
            
          }
          else{
            setisVerified(true);
            await AsyncStorage.setItem("isVerified","true");
            await setUserMobileLoggerIn(userid);
            navigation.navigate("UserInfo");
            
          }

        }
      
        console.log(user);
        }
        catch(error){
          console.error("Error in Authentication",error);
          setShowDiv(true);
          setTimeout(() => {
            setShowDiv(false);
          }, 2000);
        }
      }
    }
    else{
      setShowDiv(true);
      setTimeout(() => {
        setShowDiv(false);
      }, 2000); // Hides the div after 5 seconds (5000 milliseconds)    
    }
  }

  const handlePress = () => {
    if(!isPressed){
    setIsPressed(isPressed);
    }
  };

  const handleKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const handleKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide
    );
    return () => {
        // console.log(t);
        setlangSelected(t);
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
    };
    
  }, [langSelected]);

  const slideUpAnimation = useRef(new Animated.Value(500)).current; // Initial position below the screen
  const [showOTPWindow, setShowOTPWindow] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          slideUpAnimation.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // If swipe down distance is greater than 50, close the OTP window
          closeOTPWindow();
        } else {
          // If swipe down distance is less than 50, animate back to the top
          Animated.timing(slideUpAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const openOTPWindow = () => {
    setShowOTPWindow(true);
    Animated.timing(slideUpAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeOTPWindow = () => {
    setShowOTPWindow(false);
    Animated.timing(slideUpAnimation, {
      toValue: 500,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleTouch = (event) => {
    const { locationY } = event.nativeEvent;
    if (locationY < 0 || locationY > 500) {
      // Check if the touch is outside the OTP window's area (500 is the height of the OTP window)
      closeOTPWindow();
    }
  };
  const handleLoginPress = () => {
    Keyboard.dismiss(); 
    setIsLoading(true)
    setIsLoadingMsg("Sending OTP")
    if(userid=="00001"){
      setIsLoading(false)
      setIsLoadingMsg("")
      openOTPWindow();
    }
    else{
    // const apirurl=BASE_URL+"/farmer/sendEmailOTP";
    // console.log(apirurl);

    const timeoutPromise = new Promise((resolve,reject) =>{
      setTimeout(()=>{
        reject(new Error("Request timed out"));
      },40000);
    })

    
    Promise.race([
      signInwithphoneNumber(),
      timeoutPromise
    ])
    .then(confirmation=>{
      console.log(confirmation)
      if(confirmation){
      openOTPWindow(); // Show OTP window 
      }
      setIsLoading(false)
      setIsLoadingMsg("")
    })
    .catch(error=>{
      setIsLoading(false)
      setIsLoadingMsg("")
      console.error(error,"Exception Occured")
    })
    }

  };

  const handleNumericInputChange = (text) => {
    // Filter non-numeric characters
    const numericInput = text.replace(/[^0-9]/g, '');
    
    setoptvalue(numericInput);
    
  };

  const changeLang = (option) => {
    setlangSelected(option);
    i18next.changeLanguage(option);
  } 
  
  return (
    <TouchableWithoutFeedback onPress={handleTouch}>

    <View style={styles.container}>
    {isLoading?
        <View style={{width:'100%',position:'absolute',height:'100%',justifyContent:'center'}}>
      <LoadingScreen data={isLoadingMsg}  /> 
      </View>
      :<></>}
      <StatusBar barStyle='light-content' backgroundColor={'#000000'} />
      {/* background image */}
      <Image source={require("../../../../assets/loginwindow/backgroundLoginwin.png")}
        style={styles.image}
      />
      <View style={styles.greenBoxAbove}>
        <View style={styles.greenBox}>
          {/* Logo */}
          <View style={styles.logobg}>
            <Image
              source={require('../../../../assets/icon.png')}
              style={styles.logoimg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.greenBoxUI}>
            <Text style={styles.greenBoxText}>{t('AskInputLogin')}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor: '#E9E7D2',borderRadius: 8,paddingHorizontal: 10, height: 40}}>
                <Text style={{fontSize:14, opacity: 0.5}}>+91 |</Text>
                <TextInput
                autoCompleteType="off"
                style={styles.input}
                placeholder={t('InputPlaceholderMobileNumber')}
                maxLength={10}
                selectionColor={'green'}
                selectionState={false}
                keyboardType="numeric"
                onChangeText={handleuseridchange}
                value={userid}
                />
            </View>

            {/* <TouchableOpacity
              style={[styles.button]}
              onPress={handleLoginPress}

            > */}
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleLoginPress}

            >
              <Text style={styles.buttonText}>{t('Login')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{position:'relative', marginTop:20, fontStyle: 'italic',color:'#CFF8E6' }} onPress={LoginAsGuest}>{t('ContinueAsGuest')}</Text>
            </TouchableOpacity>
          </View>
            {error ?<Text style={{color:"red"}}>{error}</Text>:null}
        </View>
      </View>
      

      {/* Select a Language */}

      {!isKeyboardOpen  && (
        <View style={styles.selectLangBox}>
          <Text style={styles.selectlangtxt}>{t('SelectALanguage')}</Text>
            <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            style={[styles.selectlangbg, {  }, langSelected === 'pn' && styles.buttonPressed]}
            onPress={() => changeLang('pn')}
          >
            <Image
              source={require('../../../../assets/language/punjabi.png')}
              style={styles.selectlangimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.selectlangbg, {  }, langSelected === 'en' && styles.buttonPressed]}
            onPress={() => changeLang('en')}
          >
            <Image
              source={require('../../../../assets/language/english.png')}
              style={styles.selectlangimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity  style={[styles.selectlangbg, {  }, langSelected === 'hn' && styles.buttonPressed]}
                onPress={() => changeLang('hn')}
            >
            <Image
              source={require('../../../../assets/language/hindi.png')}
              style={styles.selectlangimg}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        </View>
      )}

      {/* OTP Window */}
      {showOTPWindow && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.otpWindow,
              {
                transform: [{ translateY: slideUpAnimation }],
              },
            ]}
          >
            {/* Content of your OTP window */}
            <Text style={styles.optwindowText}>Enter OTP</Text>
            <TextInput
              autoCompleteType="off"
              style={styles.optwindowTextinput}
              maxLength={6}
              selectionColor={'green'}
              selectionState={false}
              keyboardType="numeric"
              placeholder="XXXXXX"
              onChangeText={handleNumericInputChange}
              value={optvalue}
            />

            <TouchableOpacity
                style={styles.otpsubmitbtnbg}
                onPress={onSubmitOTP}
              >
                <Text style={styles.otpsubmitbtntext}>Submit</Text>
              </TouchableOpacity>
              {showDiv && (
                <View style={styles.wrongotp}>
                  {/* Your content to be displayed */}
                  <Text style={styles.wrongotptext}>Enter Correct OTP</Text>
                </View>
            )}
          </Animated.View>
        )}

    </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection:'column',
  },
  image: {
    width: '100%',
    height: '38%',
  },
  greenBoxAbove:{
    position:'absolute',
    flex: 1,
    width:'100%',
    top:'35%',
    bottom:0,
  },
  greenBox: {
    backgroundColor: '#6DB660',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    alignItems: 'center',
    flex: 1,
  },
  logobg: {
    backgroundColor: '#E9E7D2',
    top: '-15%',
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex:9,
  },
  logoimg: {
    width: '90%',
    height: '90%',
  },
  greenBoxUI:{
    top:'-10%',
    alignItems: 'center',
  },
  greenBoxText: {
    fontSize: 20,
    marginBottom:'2%',
    color: 'black',
    fontStyle: 'italic'
  },
  input: {
    // backgroundColor: '#E9E7D2',
    // borderRadius: 8,
    paddingHorizontal: 5,
    fontSize:16,
    backgroundColor: 'transparent',
    // marginHorizontal:10,
    // width: '80%',
    // height: 40,
    // marginBottom:'2%',
    // paddingLeft:40
  },
  button: {
    padding: 10,
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#E9E7D2',
    borderRadius: 50,
    top: '8%',
    width: 100,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectLangBox: {
    position: 'absolute',
    backgroundColor: '#5AA94C',
    borderRadius: 15,
    height: 100,
    width: '90%',
    paddingTop: 5,
    bottom: 15,
    alignItems: 'center',
  },
  selectlangtxt: {
    // top: -19,
    marginBottom:10
    // backgroundColor:'red'
  },
  selectlangbg: {
    position: 'relative',
    backgroundColor: '#E9E7D2',
    borderRadius: 32,
    marginHorizontal:20,
    // top: '65%',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectlangimg: {
    width: '70%',
    height: '70%',
    marginTop: 5,
    marginLeft: 1,
  },
  otpwindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpwindowinside: {
    backgroundColor: '#E9E7D2',
    paddingLeft: '20%',
    paddingRight: '20%',
    borderRadius: 5,
    shadowColor: 'green',
    elevation: 5,
  },
 
  buttonPressed: {
    borderWidth: 2,
    borderColor: 'green',
  },
  otpWindow: {
    position: 'absolute',
    backgroundColor: '#E9E7D2',
    top:'50%',
    bottom: 0,
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    // justifyContent: 'center',
    // Add other styles for your OTP window
  },
  optwindowText:{
    fontSize:20,
  },
  optwindowTextinput:{
    margin:20,
    fontSize:20,
  },
  otpsubmitbtnbg: {
    padding: 10,
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#6DB660',
    borderRadius: 50,
    width:'50%',
    // top: '10%',
  },
  otpsubmitbtntext: {
    color:'white'
  },
  wrongotp:{
    margin:10
  },
  wrongotptext:{
    color:'red',
    fontSize:15,
  }
});
