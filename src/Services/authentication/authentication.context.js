import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{ useState, createContext, useRef, useEffect } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';

export const AuthenticationContext = createContext();


export const AuthenticationContextProvider=({children}) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setisAuthenticated] = useState(false);
    const [isVerified, setisVerified] = useState(false);
    const [user, setUser] = useState(null); // set mobile number in user
    const [userMobileLoggedIn,setUserMobileLoggerIn] = useState("");
    const [userExisted, setUserExisted] = useState(false);

    const verifyUser =(data) =>{
        setUser(data);
        // Alert.alert(data);
    }
    const onLogin = async () =>{
        setIsLoading(true);
        await AsyncStorage.setItem("isAuthenticated","true");
        setisAuthenticated(true);
        setisVerified(true);
        setIsLoading(false);
    }

    const onLogout = async () => {
        setUser(null);
        setUserMobileLoggerIn("");
        await auth().signOut();
        await AsyncStorage.clear();
        await AsyncStorage.setItem("isAuthenticated","false");
        setisAuthenticated(false);
    }
    const loginGuest = async () =>{
        setisAuthenticated(false);
    }
    const getAsyncData = async ()=>{
        
    }
    return(
        <AuthenticationContext.Provider
            value={{
                isAuthenticated,
                user,
                userMobileLoggedIn,
                isVerified,
                userExisted,
                setisAuthenticated,
                onLogin,
                onLogout,
                setUser,
                verifyUser,
                setUserMobileLoggerIn,
                setisVerified,
                loginGuest,
                getAsyncData,
                setUserExisted
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    )
}
