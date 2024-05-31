import React, { useContext, useEffect, useRef, useState } from "react";
import {
    View,
    TextInput,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { ChatAIContext } from "../../../Services/chatai/chatai.context";
import { getReplyService } from "../../../Services/chatai/chatai.service";
export const ChatAI = () => {
    const [userInput, setuseinput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef(null);
    const {chatmssg,addMessage , addwaiting ,removewaiting} = useContext(ChatAIContext);
    const handleuseridchange =(text)=>{
        setuseinput(text);
    }
    useEffect(()=>{
        flatListRef.current.scrollToEnd({ animated: true });
    })
    const handleSumbit = async ()=>{
        try{
            
            if (userInput.trim() !== '') {
                await addMessage({ id: Math.random().toString(), text: userInput, sender: 'user' });
                addwaiting();
                setuseinput('');
                setLoading(true);
                await getServerReply(userInput);
                setTimeout(() => {
                }, 2000);
                setLoading(false);
              }
            // setuseinput('');
            flatListRef.current.scrollToEnd({ animated: true });
        }
        catch(error){
            console.error(error,"Excpetion occured while Submit input")
        }
    }

    const getServerReply = async (text) =>{
        console.log("getting reply for ", text)
        
        var tempreply=await getReplyService(text);
        removewaiting();
        await addMessage({ id: Math.random().toString(), text: tempreply, sender: 'server' });

        flatListRef.current.scrollToEnd({ animated: true });
    }

    return(
        <View style={{flex:1,justifyContent:'center',backgroundColor:'#E9E7D2',paddingTop:5}}>
             <View style={{flex: 1,marginBottom:20}}>
            <FlatList
                data={chatmssg}
                ref={flatListRef}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: item.sender === 'user' ? 'flex-end' : 'flex-start', marginVertical: 6, marginRight: item.sender === 'user' ? 5 : 30, marginLeft: item.sender === 'user' ? 30 : 5 }}>
                            {item.sender==='waiting'?<><ActivityIndicator size="small" color="blue" /></>:
                            <View>
                                <Text style={{ backgroundColor: item.sender === 'user' ? '#6DB660' : '#FFFDDD', color: item.sender === 'user' ? 'white' : 'black', padding: 10, borderRadius: 10, marginVertical: 6, marginRight: item.sender === 'user' ? 5 : 30, marginLeft: item.sender === 'user' ? 30 : 5 }}>{item.text}</Text>
                            </View>}
                        </View>
                    );
                }}
                keyExtractor={item => item.id}
            />
            </View>
            <View style={{
                backgroundColor:'#FFFDD0',
                position:'relative',
                width:'95%',
                bottom:15,
                borderRadius:10,
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'flex-end',
                alignSelf:'center'
            }}>
                
                <TextInput  style={styles.UserAskInput} value={userInput} onChangeText={handleuseridchange} placeholder="Ask any Farm Related Question"/>
                <TouchableOpacity style={{paddingRight:10}} onPress={()=>handleSumbit()}>
                    <Image source={require('../../../../assets/components/sendmsg.png')} style={{width:30,height:30}} resizeMode="contain"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles=StyleSheet.create({
    UserAskInput:{

        width:'85%',
        backgroundColor:'transparent',
        fontSize:15,
        paddingVertical:8,
        paddingLeft:5
    }
})
