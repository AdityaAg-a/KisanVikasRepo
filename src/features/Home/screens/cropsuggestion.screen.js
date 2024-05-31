import React from "react";
import {View,StyleSheet,Text,ScrollView,Image} from 'react-native';

export const CropSuggestion = () => {
    return(
        <ScrollView style={styles.container}>
            <View style={{backgroundColor:'#6DB660',borderRadius:6,margin:10,padding:8,flexDirection:'row',alignItems:'center',marginTop:30}}>
                <View style={{width:60,height:60,borderRadius:30,backgroundColor:'#E9E7D2',marginLeft:20,alignItems:'center',justifyContent:'center'}}>
                {/* https://i.imgur.com/qcJBZQD.png */}
                <Image
                    source={{uri: 'https://i.imgur.com/qcJBZQD.png'}}
                    style={{ width: '75%', height: '75%' }}
                    resizeMode='contain'
                />
                </View>
                <View style={{flexGrow:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{marginLeft:10,fontSize:15,fontWeight:'bold'}}>Suggestion to Grow</Text>
                    <Text style={{marginLeft:10,fontSize:25}}>Tomato</Text>
                </View>
            </View>
            <View style={{margin:5,flexDirection:'row',minHeight:80}}>
                <View style={{flex:1,backgroundColor:'#6DB660',borderRadius:6,margin:5,paddingTop:5}}>
                    <Text style={{alignSelf:'center',fontWeight:'bold'}}>Fertilizer Required</Text>
                    <Text style={{alignSelf:'center',marginTop:5,fontSize:20}}>Urea</Text>
                </View>
                <View style={{flex:1,backgroundColor:'#6DB660',borderRadius:6,margin:5,paddingTop:5}}>
                    <Text style={{alignSelf:'center',fontWeight:'bold'}}>Average Cost of Farming</Text>
                    <Text style={{alignSelf:'center',marginTop:5,fontSize:20}}>₹ 1 lac / hector</Text>
                </View>
            </View>
            <View style={{backgroundColor:'#6DB660',borderRadius:6,margin:10}}>
                <View style={{backgroundColor:'#E9E7D2',borderRadius:6,margin:10,flexDirection:'row',justifyContent:'center',padding:5}}>
                    <Image style={{ width:45,height:45,}} source={require('../../../../assets/components/calendar.png')} resizeMode='contain'/>
                    <View style={{alignItems:'center',flexDirection:'row'}}>
                        <Text style={{flexGrow:1,justifyContent:'center',fontSize:20,fontWeight:'bold'}}>Cultivation Calendar</Text>
                    </View>
                </View>
                <View style={{marginLeft:10,marginRight:10,paddingLeft:5,paddingRight:5,paddingBottom:10,flexDirection:'row'}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{fontSize:20}}>Sowing</Text>
                        <Text style={{fontSize:15}}>Jan/23</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center',alignItems:'center'}}>
                        {/* <Text style={{fontSize:20}}></Text> */}
                        <Text style={{fontSize:20,alignSelf:'center'}}>-</Text>
                    </View>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Text style={{fontSize:20}}>Harvest</Text>
                        <Text style={{fontSize:15}}>Jul/23</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor:'#6DB660',borderRadius:6,margin:10}}>
                <View style={{backgroundColor:'#E9E7D2',borderRadius:6,margin:10,flexDirection:'row',justifyContent:'center',padding:5}}>
                    <Image style={{ width:45,height:45,borderRadius:40,marginRight:10}} source={require('../../../../assets/components/CropYield.jpg')} resizeMode='contain'/>
                    <View style={{alignItems:'center',flexDirection:'row'}}>
                        <Text style={{flexGrow:1,justifyContent:'center',fontSize:20,fontWeight:'bold'}}>Yield Prediction</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20}}>12312 ha/hg</Text>
                    <Text style={{marginTop:10}}>ha/hg - means hectograms per hectare </Text>
                    <Text style={{}}>More Yield means More Produce</Text>

                </View>
            </View>
            <View style={{backgroundColor:'#6DB660',borderRadius:6,margin:10}}>
                <View style={{backgroundColor:'#E9E7D2',borderRadius:6,margin:10,flexDirection:'row',justifyContent:'center',padding:5}}>
                    <Image style={{ width:45,height:45,borderRadius:40,marginRight:10}} source={require('../../../../assets/components/yieldIcon.jpg')} resizeMode='contain'/>
                    <View style={{alignItems:'center',flexDirection:'row'}}>
                        <Text style={{flexGrow:1,justifyContent:'center',fontSize:20,fontWeight:'bold'}}>Total Profit Prediction</Text>
                    </View>
                </View>
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20}}>₹ NA</Text>
                    <Text style={{}}>for total avilable Land : 10 acr <Text style={{fontSize:10}}>(Update in Dashboard)</Text></Text>

                </View>
            </View>
            
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2'
    },
})
