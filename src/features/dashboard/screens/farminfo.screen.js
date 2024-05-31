import React, { useContext, useEffect, useState } from 'react'
import {View,Text,StyleSheet,TextInput,Image, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { UserDataContext } from '../../../Services/userdata/userdata.context';
export const FarmInfo = ({navigation}) => {
    const [farmNValueLocal, setFarmNValueLocal] = useState("");
    const [farmPValueLocal, setFarmPValueLocal] = useState("");
    const [farmKValueLocal, setFarmKValueLocal] = useState("");
    const [farmSizeLocal, setFarmSizeLocal] = useState("");
    const [farmsizeUnitLocal, setFarmsizeUnitLocal] = useState("acres");
    const { soilNValue, soilPValue , soilKValue , fieldSize,fieldFarmSizeUnit,updateFarmdetails} = useContext(UserDataContext);
    useEffect(()=>{
      setFarmNValueLocal(soilNValue)
      setFarmPValueLocal(soilPValue)
      setFarmKValueLocal(soilKValue)
      setFarmSizeLocal(fieldSize)
      setFarmsizeUnitLocal(fieldFarmSizeUnit)
    },[])



    const onSaveChange = async () =>{
        await updateFarmdetails(farmNValueLocal,farmPValueLocal,farmKValueLocal,farmSizeLocal,farmsizeUnitLocal)
        navigation.navigate("DashboardScreen")
    }
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={{alignItems:'center',width:'100%',justifyContent:'center',marginVertical:30}}>
                        <Image source={require('../../../../assets/components/farminfo (2).png')} style={{width:150,height:150,borderRadius:80}} resizeMode='contain'/>
                        <Text style={{ fontSize: 20,fontWeight:'bold' }}>Farm Details:</Text>
                </View>
                <View
              style={{
                width: "100%",
                // flexDirection: "row",
                // alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Soil Content: in(mg/kg)</Text>
            </View>
            <View style={{flexDirection:'column',width:'100%',justifyContent:'center',alignItems:'center'}}>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                marginTop:10,
                flexDirection: "row",
                marginLeft:'25%'
              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>nitrogen (N):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmNValueLocal}
                keyboardType="numeric"
                onChangeText={(text) => setFarmNValueLocal(text)}
                style={{
                  backgroundColor: "#FFFDD0",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:80,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />

            </View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                marginTop:10,
                flexDirection: "row",
                marginLeft:'25%'

              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>phosphorus (P):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmPValueLocal}
                keyboardType="numeric"
                onChangeText={(text) => setFarmPValueLocal(text)}
                style={{
                  backgroundColor: "#FFFDD0",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:80,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />

            </View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                marginTop:10,
                flexDirection: "row",
                marginLeft:'25%'

              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>potassium(K):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmKValueLocal}
                keyboardType="numeric"
                onChangeText={(text) => setFarmKValueLocal(text)}
                style={{
                  backgroundColor: "#FFFDD0",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:80,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />
            </View>
            </View>           
          </View>

          <View
            style={{
              width: "100%",
              // flexDirection: "row",
              // alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Farm Size:</Text>
            </View>
            <View
              style={{
                flexDirection:'row',
                // width: "60%",
                marginBottom: "2%",
                // marginRight: 30,
                alignItems:'center',
                position: "relative",
                flexDirection:'row',
                alignItems:'center'
              }}
            >
              <TextInput
                autoCompleteType="off"
                placeholder="e.g: 10"
                value={farmSizeLocal}
                keyboardType="numeric"
                onChangeText={(text) => setFarmSizeLocal(text)}
                maxLength={10}
                style={{
                  backgroundColor: "#FFFDD0",
                  width: "30%",
                  borderRadius: 8,
                  marginTop: 3,
                  paddingHorizontal: 10,
                  height: 40,
                  marginLeft:40
                }}
              />
              <Text style={{marginHorizontal:10,fontSize:16}}>(acres)</Text>
            </View>

            
          </View>
            </ScrollView>
            <TouchableOpacity style={{borderRadius:7,backgroundColor:'#6DB660',padding:10,margin:10}} onPress={onSaveChange}> 
                <Text style={{color:'white'}}>Save Changes</Text>
            </TouchableOpacity>

        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#E9E7D2',
        justifyContent:'center',
        alignItems:'center'

    }
})
