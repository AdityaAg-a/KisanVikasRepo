import React, { useEffect } from 'react'
import {View,StyleSheet,Text,Image, ScrollView} from 'react-native';
export const DiseaseInfo = ({route}) => {    
    // const route = useRoute();
    const {item}  = route.params;
    useEffect(()=>{
        // alert({item})
        // console.log("inseide nav: ",route)
    },[])
  return (
    <View style={styles.container}>
            <View style={{borderRadius:300,width:"50%",aspectRatio: 1,borderWidth: 5,borderColor:'#6DB660',marginTop:20,justifyContent:'center',alignItems:'center'}}>
                <Image source={{uri:item?.imgUrl}} style={{width:"95%",aspectRatio:1,borderRadius:300}} resizeMode='contain'/>
            </View>

            <Text style={{marginVertical:20,fontSize:20,fontWeight:'bold'}}>{item?.diseaseName}</Text>
            <ScrollView style={{width:'100%'}}>
                <View style={{backgroundColor:'#6DB660',borderRadius:6,marginHorizontal:10,marginBottom:10}}>
                    <View style={{alignItems:'center'}}>
                        <View style={{backgroundColor:'#E9E7D2',borderRadius:6,margin:5,flexDirection:'row',justifyContent:'center',padding:2,paddingHorizontal:8}}>
                            <Image style={{ width:30,height:30,borderRadius:40,marginRight:10}} source={require('../../../../../assets/components/CropYield.jpg')} resizeMode='contain'/>
                            <View style={{alignItems:'center',flexDirection:'row'}}>
                                <Text style={{flexGrow:1,justifyContent:'center',fontSize:17,fontWeight:'bold'}}>About Disease</Text>
                            </View>
                        </View>
                        <Text style={[{marginVertical:10,fontSize:17,margin:5}]}>{item?.diseaseInfo}</Text>
                    </View>
                </View>

                <View style={{backgroundColor:'#6DB660',borderRadius:6,marginHorizontal:10,marginBottom:10}}>
                    <View style={{alignItems:'center'}}>
                        <View style={{backgroundColor:'#E9E7D2',borderRadius:6,margin:5,flexDirection:'row',justifyContent:'center',padding:2,paddingHorizontal:8}}>
                            <Image style={{ width:30,height:30,borderRadius:40,marginRight:10}} source={require('../../../../../assets/components/CropYield.jpg')} resizeMode='contain'/>
                            <View style={{alignItems:'center',flexDirection:'row'}}>
                                <Text style={{flexGrow:1,justifyContent:'center',fontSize:17,fontWeight:'bold'}}>Treatment</Text>
                            </View>
                        </View>
                        <Text style={[{marginVertical:10,fontSize:17,alignSelf:'flex-start',paddingHorizontal:10}]}>{item?.treatment}</Text>
                    </View>
                </View>
            </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2',
        alignItems:'center'
    }
})
