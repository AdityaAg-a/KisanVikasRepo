import React, { createContext, useState } from "react";
import { LoadingMain } from "../../features/Home/screens/loadingmain.screen";
import { ActivityIndicator } from "react-native";

export const ChatAIContext = createContext();

export const ChatAIContextProvider = ({children}) =>{
    const [chatmssg,setChatMessages] = useState([]);

    const addMessage = async (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
      };
    const addwaiting  = async () =>{
        const loading=""
        var id = Math.random().toString();
        setChatMessages((prevMessages) => [...prevMessages, {loading,id,sender: 'waiting'}]);
    }

    const removewaiting = async () =>{
        setChatMessages((prevMessages) => prevMessages.filter(message => message.sender !== 'waiting'));
    }
    return(
        <ChatAIContext.Provider
            value={{
                chatmssg,
                addMessage,
                addwaiting,
                removewaiting

            }}
        >
            {children}
        </ChatAIContext.Provider>
    )
}