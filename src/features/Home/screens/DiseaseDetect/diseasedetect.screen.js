import React, { useEffect, useState, useRef, useContext } from 'react';
import {Image, StyleSheet, View,Text, TextInput, TouchableOpacity,FlatList,Modal,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { UserDataContext } from '../../../../Services/userdata/userdata.context';
import { DiseaseDetectContext } from '../../../../Services/diseasesdetect/diseasedetect.context';
import { useRoute } from '@react-navigation/native';
import { getDiseaseCropAI } from '../../../../Services/diseasesdetect/diseasedetect.service';

export const  DiseaseDetect = ({ navigation }) => {
  const [alldiseases,setAlldiseases] = useState([]);
  const [ currSelectedCrop, setcurrSelectedCrop] = useState();
  const {allCropsDiseaseList,currentCropforDisease,setcurrentCropforDisease} = useContext(DiseaseDetectContext);
  const [sessiondiseaseslist,setsessiondiseaseslist] = useState([]);
  const [fixdiseaselist,setfixdiseaselist] = useState([]);
  const [searchValue,setsearchValue] = useState("");
  useEffect(()=>{
    const fetchdata = async () =>{
      const tempdata=allCropsDiseaseList;
      setAlldiseases(tempdata);
      setcurrSelectedCrop(currentCropforDisease)  
      await filterdata(); 
    }
    fetchdata();
  },[alldiseases]);
  const [showAskCaptureImageModal,setshowAskCaptureImageModal] = useState(false);
  const ClickPhoto=()=>{
    setshowAskCaptureImageModal(true); 
  }

  const filterdata = async () =>{
    let tempdata=alldiseases.filter(item => {
      // Extract the first four letters of cropName
      const firstFourLettersItem = item.cropName.substring(0, 4);
      const firstFourLettersCurrentCrop = currentCropforDisease.cropName.substring(0, 4);
      // console.log(firstFourLettersItem ," : ",firstFourLettersCurrentCrop )
      // console.log(firstFourLettersCurrentCrop)
      // Compare the first four letters of both strings
      return firstFourLettersItem === firstFourLettersCurrentCrop;
    });
    setsessiondiseaseslist(tempdata)
    setfixdiseaselist(tempdata)
  }

  const openCamera= async ()=>{
    setshowAskCaptureImageModal(false)
    await ImagePicker.requestCameraPermissionsAsync();
    let  result= await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing:true,
      aspect:[1,1],
      quality:1
    })
    if (!result.canceled) {
      //write api here
      setImage(result.assets[0].uri);
      // alert(result.assets[0].uri)
      var resultnav=await getDiseaseCropAI(result.assets[0].uri);
      var tempcropdataArray=allCropsDiseaseList.filter(item => item.modelResult === resultnav )
      var item=tempcropdataArray[0]

      navigation.navigate("DiseaseInfo",{item});
    }
    // navigation.navigate("CameraScreen")
  }
  const openDiseaseInfo=({item})=>{
 
    navigation.navigate("DiseaseInfo",{item})
  }
  
  const MydiseaseListComponent=({data})=>{
    return (
      <TouchableOpacity style={{backgroundColor:'#6DB660',flexDirection:'row',margin:10,borderRadius:6,alignItems:'center'}} onPress={()=>openDiseaseInfo({item: data})}>
          
          <View><Image source={{uri:data.imgUrl}} style={{width:50,height:50,borderRadius:40,margin:10}} resizeMode='contain'/></View>
          <View style={{flex:1}}>
              <View style={{}}>
                  <Text numberOfLines={5} style={[{fontWeight:'bold',fontSize:18}]}>{data.diseaseName}</Text>
              </View>
              <View style={{}}>
                  <Text style={[{fontWeight:'bold',fontSize:15}]}>{data.diseaseInfo.substring(0, 30)}...</Text>
              </View>
          </View>
      </TouchableOpacity>
    )
  }

  const [image, setImage] = useState(null);


  const pickImage = async () => {
    setshowAskCaptureImageModal(false)
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      //write api here
      setImage(result.assets[0].uri);
      // alert(result.assets[0].uri)
      var resultnav=await getDiseaseCropAI(result.assets[0].uri);
      var tempcropdataArray=allCropsDiseaseList.filter(item => item.modelResult === resultnav )
      var item=tempcropdataArray[0]

      navigation.navigate("DiseaseInfo",{item});
    }
  };

  const [hasCameraPermission,sethasCameraPermission]=useState(null);
  const [type,setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const renderFlatListofDisease = () =>{
    if (Array.isArray(alldiseases) && currSelectedCrop) {
     
      //const myseletedlist=alldiseases.filter(item => {  console.log("itemss: ", item.cropName ); return (item.cropName === currentCropforDisease.cropName)})
        const myseletedlist = alldiseases.filter(item => {
        // Extract the first four letters of cropName
        const firstFourLettersItem = item.cropName.substring(0, 4);
        const firstFourLettersCurrentCrop = currentCropforDisease.cropName.substring(0, 4);
        //console.log(firstFourLettersItem ," : ",firstFourLettersCurrentCrop )
        // console.log(firstFourLettersCurrentCrop)
        // Compare the first four letters of both strings
        return firstFourLettersItem === firstFourLettersCurrentCrop;
      });
    
      // console.log("my list " , myseletedlist)
    // console.log("my list ")
    return(
      <FlatList 
          data={sessiondiseaseslist}
          renderItem={({item})=>{
            return <MydiseaseListComponent data={item}/>
          }}
        />
    )}
    else {
      // Render some default UI or return null if data is not valid
      return null;
    }
  }

  const serachDisease = (text) =>{
    setsearchValue(text);
    if (text.trim() === '') {
      // If the search input is empty, show the whole list
      setsessiondiseaseslist(fixdiseaselist);
    } else {
      // If the search input is not empty, filter the list based on the search text
      const filteredDiseases = sessiondiseaseslist.filter(item => {
        // Check if the disease name contains the search value
        const diseaseNameMatches = item.diseaseName.toLowerCase().includes(text.toLowerCase());
        // Check if any tag contains the search value
        const tagMatches = item.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()));
        return diseaseNameMatches || tagMatches;
      });
      setsessiondiseaseslist(filteredDiseases);
    }

  }
  return (
    <View style={styles.container}>
      <View style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center',marginTop:'10%',height:'10%'}}>
        <TouchableOpacity style={{backgroundColor:'#6DB660',borderRadius:7,flexDirection:'row',alignItems:'center',justifyContent:'center',paddingHorizontal:10}} onPress={ClickPhoto}>
          <Image source={require('../../../../../assets/components/camera.png')} style={{width:30,height:30,marginHorizontal:10}} resizeMode='contain' />
          <Text style={{fontSize:20}}>Capture Image</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex:3,width:'100%'}}>
        <View style={{margin:10,justifyContent:'center'}}>
          <Image source={require('../../../../../assets/components/seachIcon.png')} style={{width:30,height:30,marginHorizontal:10,position:'absolute',zIndex:10}} resizeMode='contain' />

          <TextInput style={{backgroundColor:'#fffcd9',paddingHorizontal:45,borderRadius:10,fontSize:18,paddingVertical:10}} placeholder='Search Crop Disease Here....' value={searchValue} onChangeText={serachDisease}/>
        </View>
        {renderFlatListofDisease()}
      </View>
      <Modal
        animationType="none"
        transparent={true}
        visible={showAskCaptureImageModal}
        onRequestClose={() => {
        setshowAskCaptureImageModal(!showAskCaptureImageModal);}}
        pointerEvents="box-none"
      >
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onPress={() => setshowAskCaptureImageModal(false)} >
          
          <View style={{backgroundColor:'#E9E7D2',width:'85%',alignItems:'center',borderRadius:9,paddingVertical:10}}>
            <Text style={{fontSize:18}}>Select Option</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.bgforItem} onPress={openCamera}>
                  <View style={styles.bgforItemselect}>
                    <Image source={require('../../../../../assets/components/SelectCamera.png')}  style={{width: 70, height: 70}} resizeMode='contain'/>
                  </View>
                  <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{margin:20,alignItems:'center',justifyContent:'center'}} onPress={pickImage}>
                  <View style={{borderRadius:50,width:70,height:70,backgroundColor:'#6DB660',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../../../../assets/components/SelectGallery.png')}  style={{width:50,height:50}} resizeMode='contain'/>
                  </View>
                  <Text>Gallery</Text>
                </TouchableOpacity>
              </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2',
        alignItems:'center'
    },
    btnStageSelect: {
      alignItems: 'center',
      justifyContent: 'center',
      margin:20
    },
    bgforStageSelect: {
      width: 60,
      height: 60,
      borderRadius: 50,
      backgroundColor: '#6DB660',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bgforItem:{margin:20,alignItems:'center',justifyContent:'center'},
    bgforItemselect:{borderRadius:50,width:70,height:70,backgroundColor:'#6DB660',justifyContent:'center',alignItems:'center'}
})