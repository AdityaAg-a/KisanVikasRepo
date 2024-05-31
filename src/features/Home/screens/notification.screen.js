import { useContext, useEffect, useState } from "react";
import { StyleSheet, View,Text,TouchableOpacity,FlatList,Image ,ScrollView} from "react-native";
import { NotificationContext } from "../../../Services/notification/notification.context";
export default function NotificationScreen() {

    const [isFilterOn, setisFilterOn] = useState(false);
    const [isOfferFilterOn, setisOfferFilterOn] = useState(false);
    const [isAlertFilterOn, setisAlertFilterOn] = useState(false);
    const [isOtherFilterOn, setisOtherFilterOn] = useState(false);
    const [mynotificationlist,setmynotificationlist] = useState([]);
    const [myOldNotificationList,setmyOldNotificationList] = useState([]);

    const {notificationListContext} = useContext(NotificationContext);
    const turnOffFilter=()=>{
        setisFilterOn(false);
        setisOfferFilterOn(false);
        setisAlertFilterOn(false);
        setisOtherFilterOn(false);
    }
    const turnOnFilter=(Str)=>{
       
        if(Str.toLowerCase()==="offer"){
            setisOfferFilterOn(!isOfferFilterOn);
            setisAlertFilterOn(false);
            setisOtherFilterOn(false);
            if(!isOfferFilterOn){
                let templist=notificationListContext.filter( item =>{
                    return item.type.toLowerCase()==="offer";
                })
                setmynotificationlist(templist)
            }
            else{
                setmynotificationlist(myOldNotificationList)
            }
        }
        else if(Str.toLowerCase()=="alert"){
            setisAlertFilterOn(!isAlertFilterOn);
            setisOfferFilterOn(false);
            setisOtherFilterOn(false);
            if(!isAlertFilterOn){
                let templist=notificationListContext.filter( item =>{
                    return item.type.toLowerCase()==="alert";
                })
                setmynotificationlist(templist)
            }
            else{
                setmynotificationlist(myOldNotificationList)
            }
        }
        else{
            setisOtherFilterOn(!isOtherFilterOn);
            setisAlertFilterOn(false);
            setisOfferFilterOn(false);
            if(!isOtherFilterOn){
                let templist=notificationListContext.filter( item =>{
                    return item.type.toLowerCase()!=="alert" && item.type.toLowerCase()!=="offer";
                })
                setmynotificationlist(templist)
            }
            else{
                setmynotificationlist(myOldNotificationList)
            }

        }
        // alert(isOfferFilterOn);
        if(isOfferFilterOn=="false" && isAlertFilterOn=="false" && isOtherFilterOn=="false"){
            setisFilterOn(false);
        }
            setisFilterOn(true);
    }
    const [notificationlist,setNotificationlist] = useState([]);
    // var notificationlist={
    //     data:[
    //         {"title":"Sample Title 1", "Message":"This is a Sample Message to Test the Notification Screen with only few words shown in starting, and if want to see full then have to click on it ","read":"0","type":"Alert"},
    //         {"title":"Sample Title 2", "Message":"To limit the text to the first 20 characters in React Native, you can use the substring() method of JavaScript. Here's how you can do it within your component:","read":"1","type":"Offer"},
    //         {"title":"Sample Title 3", "Message":"Feature testing is Alert Also ... feture ","read":"1","type":""},
    //         {"title":"Sample Title 4", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":""},
    //         {"title":"Sample Title 5", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":""},
    //         {"title":"Sample Title 6", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":""},
    //         {"title":"Sample Title 7", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":""},
    //         {"title":"Sample Title 8", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":"Offer"},
    //         {"title":"Sample Title 9", "Message":"Feature testing is Alert Also ... feture ","read":"0","type":"Offer"}
    //     ]
    // }
    useEffect(()=>{
        
        const fetchdata = async () =>{
            await setNotificationlist(notificationListContext)
            // await console.log("Notification Context: ",notificationListContext)
            setmyOldNotificationList(notificationListContext);
            setmynotificationlist(notificationListContext);
        }
        fetchdata();
    },[])
    const openNotificationBox=({Item})=>{
        return <Notificationpopup Data={Item}/> 
    }
    const NotificationItem=({Info})=>{
        return (
            <TouchableOpacity style={{backgroundColor:'#6DB660',flexDirection:'row',margin:10,borderRadius:6,alignItems:'center'}} onPress={()=>openNotificationBox({Info})}>
                <View style={{backgroundColor:'#E9E7D2',width:50,height:50,borderRadius:30,margin:10,marginLeft:20,alignItems:'center',}}>
                {Info.type.toLowerCase()=="offer"?
                    <Image source={require('../../../../assets/Notification/offer.png')} style={{width:40,height:20,flex:1}} resizeMode='contain'/>
                :
                    Info.type.toLowerCase()=="alert"?
                    <Image source={require('../../../../assets/Notification/alert.png')} style={{width:40,height:20,flex:1}} resizeMode='contain'/>
                    :
                    <Image source={require('../../../../assets/Notification/notificationDeafult.png')} style={{width:30,height:20,flex:1}} resizeMode='contain'/>
                }
                </View>
                <View style={{flex:1}}>
                    <View style={{}}>
                        {Info.read==0?
                        <Text numberOfLines={5} style={[{fontWeight:'bold',fontSize:18}]}>{Info.title}</Text>
                        :
                        <Text style={[{fontSize:18}]}>{Info.title}</Text>
                        }
                    </View>
                    <View style={{}}>
                        {Info.read==0?
                        <Text style={[{fontWeight:'bold',fontSize:15}]}>{Info.Message}</Text>
                        :
                        <Text style={[{fontSize:15}]}>{Info.Message}</Text>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const Notificationpopup=({Data})=>{
        return(
            <View style={{postion:'absoulute',flex:1,justifyContent:'center',alignItems:'center',width:'100%',zIndex:9999}}>
                <View style={{width:50,height:50,backgroundColor:'#E9E7D2'}}>
                    <Text>{Data.title}</Text>
                </View>
            </View>
        )
    }
    return(
        <View style={styles.container}>
            <View style={{flexDirection:'row',margin:15}}>
                {/* <TouchableOpacity style={[{backgroundColor:'#6DB660',borderRadius:10,paddingLeft:10,paddingRight:10},isFilterOn && {backgroundColor:'blue'}]} onPress={turnOffFilter}> */}
                    <View style={{flexDirection:'row'}}>
                        <Image source={require('../../../../assets/components/filterSymbol.png')} style={{width:20,height:30,marginRight:10}} resizeMode="contain"/>
                        <Text style={{fontSize:19,color:'black'}}>Filter</Text>
                    </View>
                {/* </TouchableOpacity> */}
                <View style={{backgroundColor:'black',width:1,marginLeft:10,marginRight:10}}>

                </View>
                <View style={{flexDirection:'row'}}>
                {/* //FlatList of All option */}
                    <TouchableOpacity style={[{backgroundColor:'#6DB660',borderRadius:10,paddingLeft:10,paddingRight:10,marginLeft:10}, isOfferFilterOn&& {backgroundColor:'#0e3d05'}]} onPress={()=>{turnOnFilter("offer")}}>
                        <Text style={{fontSize:19,color:'white'}}>Offer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor:'#6DB660',borderRadius:10,paddingLeft:10,paddingRight:10,marginLeft:10}, isAlertFilterOn&& {backgroundColor:'#0e3d05'}]} onPress={()=>{turnOnFilter("alert")}}>
                        <Text style={{fontSize:19,color:'white'}}>Alert</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[{backgroundColor:'#6DB660',borderRadius:10,paddingLeft:10,paddingRight:10,marginLeft:10}, isOtherFilterOn&& {backgroundColor:'#0e3d05'}]} onPress={()=>{turnOnFilter("other")}}>
                        <Text style={{fontSize:19,color:'white'}}>Other</Text>
                    </TouchableOpacity>
                    
                </View>
            </View>
            <FlatList
                data={mynotificationlist}
                renderItem={({item})=>{
                    return <NotificationItem Info={item}/>
                }} 
            />
            
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2'
    }
})