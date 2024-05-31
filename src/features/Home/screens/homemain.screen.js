import React,{ useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import {StyleSheet, View,Text, Image, TouchableOpacity,StatusBar, Modal, ImageBackground, FlatList, Alert} from 'react-native';
import { UserLocationContext } from '../../../Services/userdata/userlocations.context';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
import { GetPermission } from '../../account/screens/location.screen';
// import { getmarketprice } from '../../../Services/marketPrice/marketprice.service';
import { MarketPriceContext } from '../../../Services/marketprice/marketprice.context';
import { WeatherForcastContext } from '../../../Services/weatherinfo/weatherforcast.context';
import LoadingScreen from '../../../component/utility/loading.screen';
import { DiseaseDetectContext } from '../../../Services/diseasesdetect/diseasedetect.context';
// import SimpleLoader from '../../Components/SimpleLoader';
import messaging from '@react-native-firebase/messaging';
import { NotificationContext } from '../../../Services/notification/notification.context';


export const HomeMain = ({navigation}) => {
  const { userCity,userState,selectedCrops,allCrop,setselectedcrop,setAllCrops,onSettingLocation } = useContext(UserDataContext);
  const [ currentSelectedCropIndex , setcurrentSelectedCropIndex ] = useState(0);
  const [ currentSelectedCrop , setcurrentSelectedCrop ] = useState([]);
  const [myCropAll, setmyCropAll] = useState("");
  const {currentCropforDisease,setcurrentCropforDisease} = useContext(DiseaseDetectContext);
  const [selectedCropList,setselectedCropList]= useState([]);
  const [today, setToday] = useState('');

  const {minprice,maxprice,updateCropMarketPrice} = useContext(MarketPriceContext);

  const { tempc ,isday, condition ,fetchweather} = useContext(WeatherForcastContext);

  const { notificationListContext,setNotificationListContext } = useContext(NotificationContext);

  useEffect(()=>{
    fetchweather();
  },[])

  useEffect(()=>{
    messaging()
      .getInitialNotification()
        .then(async (remoteMessage) => {
          if(remoteMessage){
            console.log(
              "Notification  caused app to open from quit state",
              remoteMessage.notification
            )
          }
        });
    messaging().onNotificationOpenedApp((remoteMessage)=>{
      console.log(
        "Notification caused app to open from background state",
        remoteMessage.notification
      )
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) =>{
      try{
        var titletemp = remoteMessage?.notification?.title;
        var messagetemp = remoteMessage?.notification?.body;
        var notificationTemp={
          title:titletemp,
          message:messagetemp,
          read:0,
          type:""
        }
        if(NotificationContext){
          setNotificationListContext([notificationTemp, ...notificationListContext]);
        }
      }
      catch(error){
        console.error(error,"error")
      }
      
      // create json of above and set in setNotificationListContext usestate from context 
      console.log(
        "Message handeld in the background ",     remoteMessage
      )
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) =>{
      Alert.alert("A new Message", JSON.stringify(remoteMessage).notification.body);
    });
    return unsubscribe;
  },[])

  useEffect(() => {
    //  for only update current Date
    const currentDate = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = dateFormatter.format(currentDate);
    setToday(formattedDate);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      setshowisLoading(true);
      setmyCropAll(allCrop);
      setselectedCropList(selectedCrops);
      console.log("Home selected crops: ",typeof selectedCropList);
      setshowisLoading(false);
    };
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchData = async () => {
    if (selectedCropList[currentSelectedCropIndex]) {
      setcurrentSelectedCrop(selectedCropList[currentSelectedCropIndex]);
      setcurrentCropforDisease(selectedCropList[currentSelectedCropIndex])
      await updateCropMarketPrice(selectedCropList[currentSelectedCropIndex].cropName);
    }}

    fetchData();
  },[currentSelectedCropIndex,selectedCropList])
  


  const [addcropPop, showaddcroppop] = useState(false);
  const { t } = useTranslation();

  const selectCropinScreen = async (item) =>{
    const index = selectedCropList.findIndex(crop => crop.cropid === item.cropid);
    setcurrentSelectedCropIndex(index);
    setcurrentSelectedCrop(selectedCropList[currentSelectedCropIndex]);
    setcurrentCropforDisease(selectedCropList[currentSelectedCropIndex]);
    await updateCropMarketPrice(selectedCropList[currentSelectedCropIndex].cropName);
  }

  const mycropsselect =  (item) => (prevList) => [...prevList, item]

const handleonSelect = async (item) => {
    item.selected = !item.selected;
    const newItem = myCropAll.map((val) => {
        if (val.cropid === item.cropid) {
            return { ...val, selected: item.selected };
        } else {
            return val;
        }
    });
    setmyCropAll(newItem);
    
    await setAllCrops(newItem);
    var hasCrop = selectedCropList.some(p => p.cropid === item.cropid);
    if (item.selected === true) {
      if (!hasCrop) {
        const updatedSelectedCropList = mycropsselect(item)(selectedCropList);
        console.log("Added crop list : ",typeof updatedSelectedCropList)
        setselectedCropList(updatedSelectedCropList);
        setselectedcrop(updatedSelectedCropList);
        if(currentSelectedCrop.cropid !== item.cropid){
          var myind=updatedSelectedCropList.findIndex(crop => crop.cropid === item.cropid)
          setcurrentSelectedCropIndex(myind)
        }
      }
    } else {
      if (hasCrop) {
        const updatedSelectedCropList = selectedCropList.filter((crop) => crop.cropid !== item.cropid);
        console.log("Removed crop list :",  updatedSelectedCropList);
        setselectedCropList(updatedSelectedCropList);
        // Remove the await since setselectedcrop likely doesn't return a promise
        setselectedcrop(updatedSelectedCropList);
        if(currentSelectedCrop.cropid === item.cropid ){
          setcurrentSelectedCropIndex(0);
        }
      }
    }
    // await changeselectedcrop();
};

// const changeselectedcrop = async () =>{
//   console.log("my checkpoint: ",selectedCropList,"index",currentSelectedCropIndex)
//     if(!selectedCropList[currentSelectedCropIndex]){
//       setcurrentSelectedCropIndex(0);
//     }
// }
  const onPressCropSuggest = () => {
    navigation.navigate("Crop Suggestion");
  }
  const onPressAskAi = () => {
    navigation.navigate("Chat With KisanAI");
  }
  const onPressNotificationbell = () => {
    navigation.navigate("Notification");
  }
  const onPressDiseaseDetech = () => {
    navigation.navigate("Disease Detect");
  }
  const onPressLocationSelect = async () => {
    try {
      // setIsLoading(true);
      const data = await GetPermission();
      // console.log(data);
      await onSettingLocation(data.coords.latitude,data.coords.longitude);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  }

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={{alignSelf: "center",
        margin: 5,
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#6DB660",
        alignItems: "center",
        justifyContent: "center",
        height: 60,
        width: 60,}}
        onPress={() => handleonSelect(item)}
      >
        <Image
          source={{ uri: item.imageUrl }}
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
        {item.selected ? (
          <Image
            source={require("../../../../assets/components/selected.png")}
            resizeMode="contain"
            style={{
              zIndex: 9999,
              width: 20,
              height: 20,
              position: "absolute",
              bottom: -5,
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };

  // function to show flatlist of selected crops
  const renderFlatList = () => {
    if (Array.isArray(myCropAll)) {
      const FruitData = myCropAll.filter(item => item.cropType === "Fruit");
    return (
      <FlatList
        data={FruitData}
        renderItem={renderRow}
        keyExtractor={(item) => (item.cropid ? item.cropid.toString() : null)}
        numColumns={4} // Display 3 items per row
        contentContainerStyle={{ marginLeft: "auto",marginRight: "auto",alignItems: "flex-start",}}
      />
    );
  }
  else {
    // Render some default UI or return null if data is not valid
    return null;
  }
  };

  const renderFlatListVege = () => {
    if (Array.isArray(myCropAll)) {
    const vegetableData = myCropAll.filter(item => item.cropType === "Vegetable");

    return (
      <FlatList
      data={vegetableData}
      renderItem={renderRow}
      keyExtractor={(item) => (item.cropid ? item.cropid.toString() : null)}
      numColumns={4} // Display 3 items per row
      contentContainerStyle={{ marginLeft: "auto",marginRight: "auto",alignItems: "flex-start",}}
    />
    );
    }
    else {
      // Render some default UI or return null if data is not valid
      return null;
    }
  };


  const renderSelectedFlatList = () => {
    return (
      <FlatList
        style={{}}
        data={selectedCropList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
        return (
          <View>
            {item.selected ? (
              <View style={{ padding: 1, width: 60 }}>
                <TouchableOpacity style={{width: 55,height: 55,borderRadius: 50,marginLeft: "5%",backgroundColor: "#E9E7D2",borderRadius: 100,alignItems: "center",justifyContent: "center",}} onPress={()=>selectCropinScreen(item)}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: "75%", height: "75%" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
            
          </View>
        )}}
      />
    );
  };


  const [isLoading, setshowisLoading] = useState(false);
  return (

    <View style={styles.container}>
      {isLoading
        ?
          <LoadingScreen data="Getting Price"/>
        :
        <></>
      }
      <StatusBar barStyle='light-content' backgroundColor={'#000000'} />
      <View style={styles.topbar}>
        <TouchableOpacity style={styles.topbarLocation} onPress={onPressLocationSelect}>
          <Image style={styles.topbarLocationimg} source={require('../../../../assets/locationSymbol.png') } resizeMode='contain'/>
          {userCity === null ?<Text style={styles.topbarLocationtext}>Allow Permission</Text>
          :<Text style={styles.topbarLocationtext}>{userCity}, {userState}</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.topbarDrawer} onPress={onPressNotificationbell}>
          <Image style={styles.topbarLocationimg} source={require('../../../../assets/components/notification.png') } resizeMode='contain' />
          <View style={{width:18,height:18,borderRadius:10,backgroundColor:'#EF5050',position:'absolute',right:1,top:4,alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:'white'}}>10</Text>
          </View>
        
        </TouchableOpacity>
      </View>
      
      {/* <View style={styles.topbar}></View> */}
      <View style={styles.weatherSuggestion} >
        <View style={styles.weatherSuggestionWeather}>
          <Image style={styles.weatherSuggestionWeatherImage} source={require('../../../../assets/components/weatherlogo.png') } resizeMode='contain' />
          <Text style={styles.weatherSuggestionWeatherText} >
            <Text style={[styles.weatherSuggestionWeatherText,{fontSize:18}]} >
            {tempc}</Text>
            <Text style={[styles.weatherSuggestionWeatherText,{fontSize:18}]} >°</Text>
            <Text style={[styles.weatherSuggestionWeatherText,{fontSize:18}]}>C</Text>
          </Text>
        </View>
        <View style={styles.weatherSuggestionDivider}></View>
        <View style={styles.weatherSuggestionInfo}>
          <View style={styles.weatherSuggestionInfoTop}>
            {/* <Text style={styles.weatherSuggestionInfoTopText1}>ProTip</Text> */}
            <Text style={styles.weatherSuggestionInfoTopText1}>Outdoor Condition</Text>
            <Text style={styles.weatherSuggestionInfoTopText1}>{today}</Text>
          </View>
          <View style={[styles.weatherSuggestionInfoBottom,{flexDirection:'row'}]}>
            <Text style={[styles.weatherSuggestionInfoBottomText,{fontSize:15,flexWrap: 'wrap'}]}>
               {condition}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.addNewCrop}>
          <View style={styles.addNewCropSelected}>
          <View style={{flexDirection:'row',flex:1}}>
            {renderSelectedFlatList()}
          </View>
          </View>
          <TouchableOpacity style={styles.AddselectCropbg} onPress={() => { showaddcroppop(true) }}>
            <Image
              source={require('../../../../assets/UserInfoIMG/addsymboladd.png')}
              style={{ width: '75%', height: '75%' }}
              resizeMode='contain'
            />
          </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.selectStage}>
       
          <Image source={require('../../../assets/stageoffarming/LandPrepare.png')} style={styles.selectStageimgfirst} resizeMode='contain'/>
          <Text>1. Land Prepare</Text>
          <Image source={require('../../../assets/components/dropdown.png')} style={styles.selectStageimgdrop} resizeMode='contain'/>

       
      </TouchableOpacity> */}
      <View style={styles.partStageFeature}>
        <View style={{flex:1}}>
          <View style={{backgroundColor:'#6DB660',flex:1,alignSelf:'left',marginLeft:0,borderRadius: 8,width:'50%',height:'50%'}}>
            <View style={{backgroundColor:'#E9E7D2',flex:1,margin:5,borderRadius: 8,flexDirection:'column',paddingTop:5,paddingBottom:10}}>
              <View style={{marginLeft:10,flexDirection:'row',marginTop:3,alignItems:'center'}}>
                <View style={{backgroundColor:'#6DB660',width:40,height:40,borderRadius:50,justifyContent:'center',alignItems:'center'}}>
                <Image
                    source={{ uri: currentSelectedCrop && currentSelectedCrop.imageUrl }}
                    style={{ width: 30, height:30 }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{marginLeft:10}}>{currentSelectedCrop && currentSelectedCrop.cropName}</Text>
              </View>
              <View style={{marginLeft:10,flexDirection:'row'}}>
                <Text style={{fontStyle:'italic'}}>Min Price :  </Text>
                <Text value={minprice}>₹{minprice}</Text>
                <Text>/Qtl</Text>
              </View>
              <View style={{marginLeft:10,flexDirection:'row'}}>
                <Text style={{fontStyle:'italic'}}>Max Price :  </Text>
                <Text value={maxprice}>₹{maxprice}</Text>
                <Text>/Qtl</Text>
              </View>
            </View>
          </View>
        </View>
       
        
        {/* <FlatList
          data={data}
          
          renderItem={partStageFeature}
          keyExtractor={item => item.id}
          numColumns={2}
        /> */}

      </View>
      <View style={{marginTop:10,width:'100%'}}>
          <View style={{backgroundColor:'#FFD6D6',width:'100%',flexDirection:'row', alignItems:'center'}}>
            <Image source={require('../../../../assets/components/AlertSign.png')} style={{width: '5%', height: '90%' ,margin:0}}  resizeMode='contain' />
            <Text>Alert : </Text>
            <Text>Heavy Rainfall in 24 Hrs</Text>
          </View>
        </View>
      <View style={styles.bottomdivs}>
        <View style={styles.aifeautures}>
          <View style={styles.aifeauturesrow1}>
            {/* <TouchableOpacity style={styles.feature1}>
            <View style={styles.featureicon}>
              <Image
                source={require('../../../assets/features/fertilizerCheck.png')}
                style={{ width: '75%', height: '75%' }}
                resizeMode='contain'
              />
            </View>
              <Text style={styles.featureText}>Fertilizers Check</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feature1}>
              <View style={styles.featureicon}>
                <Image
                  source={require('../../../assets/features/smartirrigation.png')}
                  style={{ width: '75%', height: '75%' }}
                  resizeMode='contain'
                />
              </View>
              <Text>Smart Irrigation</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.aifeauturesrow1}> 
            
            <TouchableOpacity style={styles.feature1} onPress={onPressDiseaseDetech}>
            <View style={styles.featureicon}>
              <Image
                source={require('../../../../assets/features/diseasedetect.png')}
                style={{ width: '75%', height: '75%' }}
                resizeMode='contain'
              />
            </View>
              <Text>{t('DiseaseDetect')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.feature1} onPress={onPressAskAi}>
            <View style={styles.featureicon}>
              <Image
                source={require('../../../../assets/features/askai.png')}
                style={{ width: '75%', height: '75%' }}
                resizeMode='contain'
              />
            </View>
              <Text>Ask AI</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.cropSuggestion} onPress={onPressCropSuggest}>
          <View style={styles.cropSuggestionCalender}>
            <ImageBackground style={styles.cropSuggestionCalenderimgbg} source={require('../../../../assets/components/calendar.png')} resizeMode='contain'>
            <Image style={styles.cropSuggestionCalenderimg} source={require('../../../../assets/components/calCrop.png')} resizeMode='contain'/>
            </ImageBackground> 
            <Text  style={styles.cropSuggestionCalenderText}>Jan-Jul</Text>
          </View>
          <View style={styles.cropSuggestionDivider}></View>
          <View style={styles.cropSuggestionInfo}>
            <Text style={styles.cropSuggestionInfoT1}>Suggestion to Grow</Text>
            <Text style={styles.cropSuggestionInfoT2}>Grow Tomato</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={addcropPop}
      >

        <View style={styles.popupwindow} >
          <View style={styles.addnewcroppopUp} >
          <Text style={styles.popupHeading}>Add New Crops</Text>
            <FlatList
            style={styles.flatListContainer}
              data={['Fruits', 'Vegetables']}
              renderItem={({ item }) => (
                <>
                  <Text style={{ fontStyle: 'italic', alignSelf: 'flex-start', marginLeft: 15, marginVertical: 8, fontSize: 17 }}>{item}</Text>
                  {item === 'Fruits' ? renderFlatList() : renderFlatListVege()}
                </>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={styles.btnbg} onPress={() => { showaddcroppop(false) }}>
              <Text style={styles.btntext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E7D2',
    // justifyContent:'center',
    // alignContent:'center',
    alignItems: 'center',
  },
  topbar:{
    // backgroundColor: 'transparent',
    // height:'1%',
    // width:'95%',
    // marginTop:5,
    // flexDirection:'row',
    // justifyContent:'space-between',
    // flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,

  },
  topbarLocation:{
    flexDirection:'row',
    alignItems:'center',
  },
  topbarLocationimg:{
    margin:2,
    width:28,
    height:28,

  },
  topbarLocationtext:{

  },
  topbarDrawer:{
    alignSelf: 'center',
    marginRight: 10,
    position: 'absolute',
    right: 5,
  },
  topbarDrawerBox:{
    backgroundColor:'black',
    width:25,
    height:5,
    margin:1,
  },
  bottomdivs:{
    flexDirection:'column',
    flex:1  ,
    // backgroundColor: 'pink',
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center ',
    bottom:10,
  },
  aifeautures:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center ',
    flex:1,
  },
  aifeauturesrow1:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center ',
    marginBottom:10,
  },
  feature1:{
    backgroundColor: '#6DB660',
    // height: '50%',
    borderRadius: 8,
    padding:2,
    marginBottom:1,
    // marginLeft:2,
    marginHorizontal:8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center ',
    flex:1,
  },
  featureicon:{
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: '3%',
    backgroundColor: '#E9E7D2',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    zIndex:9999,
  },
  featureText:{
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  cropSuggestion: {
    backgroundColor: '#6DB660',
    // height: '70%',
    flex:1,
    width: '100%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center ',
    marginTop:10,
    marginBottom:5,
    padding:5,
  },


  cropSuggestionCalender: {
    backgroundColor: 'transparent',
    marginLeft: 8,
    marginRight: 17,
    height: '80%',
    width: '32%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  cropSuggestionCalenderimgbg:{
    width:45,
    height:45,
  },
  cropSuggestionCalenderimg:{
    width:40,
    height:40,
    marginTop:6,
    alignSelf:'center',
  },
  cropSuggestionCalenderText:{
    fontSize:22,
    fontWeight:'bold',
    fontStyle:'italic',
    padding:4,
    

  },
  cropSuggestionDivider: {
    backgroundColor: 'black',
    width: 1,
    // marginLeft:5,
    height: '70%',
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  cropSuggestionInfo: {
    backgroundColor: 'transparent',
    paddingHorizontal:4,
    marginLeft: 4,
    marginRight: 8,
    height: '80%',
    width: '54%',
    justifyContent:'center',
    alignItems:'center'
  },
  cropSuggestionInfoT1:{
    fontSize:11,
  },
  cropSuggestionInfoT2:{
    fontSize:24,
  },
  addNewCrop: {
    // flex:1,
    // top: '18%',
    backgroundColor: '#6DB660',
    width: '94%',
    height: 70,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addNewCropSelected:{
    flexDirection: 'row',
    flex:1,
  },
  AddselectCropbg: {
    
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: '3%',
    backgroundColor: '#E9E7D2',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    zIndex:9999,
    
  },
  popupwindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  addnewcroppopUp: {
    backgroundColor: '#EFEED2',
    width: "90%",
    minHeight: "50%",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,  // Border width
    borderColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 10,

  },
  popupHeading: {
    fontSize: 20,
    marginTop: 5,
  },
  flatListContainer: {
    flex: 1, // Ensure the FlatList takes all available space
    marginBottom: 55, // Adjust to accommodate the button
    borderRadius:10
  },
  btnbg: {
    position: 'absolute',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#6DB660',
    borderRadius: 50,

    textAlign: 'center',
    bottom: 10,
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold',

  },
  selectStage: {
    // flex:1,
    backgroundColor: '#6DB660',
    margin: 10,
    height: '7%',
    width: '60%',
    borderRadius: 8,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    // paddingHorizontal:60,
    paddingLeft:52,
    paddingRight:65,
  },
  selectStageimgfirst:{
    width:'100%',
    height:'100%',
  }, selectStageimgdrop:{
    width:'70%',
    height:'70%',
  },
  partStageFeature: {
    // flex:1,
    backgroundColor: 'transparent',
    marginTop: 30,
    height: '18%',
    width: '100%',
    borderRadius: 8,
    paddingLeft:'auto',
    paddingRight:'auto',
  },
  partStageFeatureOneBox: {
    // flex:1,
    backgroundColor: '#6DB660',
    width: '48%',
    height: 110,
    margin:1,
    borderRadius:5,
    // alignSelf:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  partStageFeatureOneBoxText:{
    fontSize:18,
    textAlign:'center'
  },
  weatherSuggestion: {
    // flex:1,
    // bottom: 0,
    backgroundColor: '#ADE0E7',
    marginBottom: 10,
    minHeight: '10%',
    maxHeight: '25%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center '

  },
  weatherSuggestionWeather: {
    backgroundColor: 'transparent',
    marginLeft: 8,
    marginRight: 4,
    height: '100%',
    width: '32%',
    flexDirection:'row',
    // justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  weatherSuggestionWeatherImage:{
    margin:2,
    width:45,
    height:45,
  },
  weatherSuggestionWeatherText:{
    alignSelf:'center',
    fontWeight:'bold',
    fontSize:25,
    marginLeft:5,

  },
  weatherSuggestionDivider: {
    backgroundColor: 'white',
    width: 1,
    height: '70%',
    position: 'relative',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  weatherSuggestionInfo: {
    backgroundColor: 'transparent',
    marginLeft: 4,
    marginRight: 8,
    height: '80%',
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    
  },
  weatherSuggestionInfoTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    
  },
  weatherSuggestionInfoTopText1:{
    fontSize:12,
  },
  weatherSuggestionInfoTopText2:{
    fontSize:20,
  },
  weatherSuggestionInfoBottom:{
    flex:1,
    marginLeft:15,
    justifyContent:'flex-start',
    alignContent:'center',
    alignItems:'center',
    flexWrap: 'wrap', // Allow text to wrap
    textAlignVertical: 'top', // Align text to top
  },
  weatherSuggestionInfoBottomText:{
      fontSize:18,
  },
});
