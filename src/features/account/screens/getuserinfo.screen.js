import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image,ScrollView, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AuthenticationContext } from "../../../Services/authentication/authentication.context";
import { UserLocationContext } from "../../../Services/userdata/userlocations.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDataContext } from "../../../Services/userdata/userdata.context";
import LoadingScreen from "../../../component/utility/loading.screen";

import { SelectList } from "react-native-dropdown-select-list";

export const GetUserInfo = ({ navigation }) => {
  const { userMobileLoggedIn} = useContext(AuthenticationContext);
  const { setuserData } = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(false);

  const [usrName, setUsrName] = useState("");
  const [usrContactNumber, setUsrContactNumber] = useState("");
  const [usrAddress, setUsrAddress] = useState("");
  const [farmNValue, setFarmNValue] = useState("");
  const [farmPValue, setFarmPValue] = useState("");
  const [farmKValue, setFarmKValue] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [farmsizeUnit, setFarmsizeUnit] = useState("acres");

  const data = [
    { key: "Acres", value: "Acres" },
    { key: "Hectares", value: "Hectares" },
    { key: "Square Meters", value: "Square Meters" },
    { key: "Bigha", value: "Bigha" },
  ];

  const dirToHome =  async () => {
    await Keyboard.dismiss();
    setIsLoading(true);
    await setuserData(usrName, usrContactNumber, usrAddress, farmNValue, farmPValue, farmKValue, farmSize, farmsizeUnit);
    setIsLoading(false);
    navigation.navigate("Settingdata");
};

  useEffect(()=>{
    if(userMobileLoggedIn!==""){
      setUsrContactNumber(userMobileLoggedIn);
    }
  },[])
  const onpressbck = () => {
    navigation.navigate("AddNewCrop");
  };
  return (
    <View style={styles.container}>
      {/* using as Stack bubble UI and Its background image */}
      {/* <TopComponent style={styles.TopComponent} /> */}
      {isLoading ? (
        <View
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <LoadingScreen data={"Setting Up App"} />
        </View>
      ) : (
        <></>
      )}

      <View style={styles.containebuubler}>
        <Image
          source={require("../../../../assets/UserInfoIMG/getuserinfo.jpg")}
          style={[styles.bgimg, { width: "100%" }]}
          resizeMode="cover"
        />
        <View style={styles.choicebtn}></View>
        <View style={styles.choicebtn}></View>
        <View style={styles.choicebtn}>
          <View style={styles.choicebtnselected} />
        </View>
      </View>

      
        {/* <View> */}
          <View style={{alignItems:'center'}}>
          <Text style={{ fontSize: 20 ,alignItems:'center'}}>Tell Us More About You</Text>
          </View>
          <ScrollView ontentContainerStyle={{ alignItems: "center" }}
          style={{ width: "100%",marginBottom:65 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Name:</Text>
            </View>
            <TextInput
              autoCompleteType="off"
              placeholder="Enter your full Name"
              value={usrName} 
              onChangeText={(text) => setUsrName(text)}
              style={{
                backgroundColor: "#E9E7D2",
                borderRadius: 8,
                paddingHorizontal: 10,
                width: "60%",
                height: 40,
                marginBottom: "2%",
                marginRight: 30,
              }}
            />
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Mobile Number:</Text>
            </View>
            <TextInput
              autoCompleteType="off"
              placeholder="Enter your Mobile Number"
              keyboardType="numeric"
              value={usrContactNumber}
              onChangeText={(text) => setUsrContactNumber(text)}
              style={{
                backgroundColor: "#E9E7D2",
                borderRadius: 8,
                paddingHorizontal: 10,
                width: "60%",
                height: 40,
                marginBottom: "2%",
                marginRight: 30,
              }}
            />
          </View>

          {/* address */}
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Address:</Text>
            </View>
            <TextInput
              autoCompleteType="off"
              placeholder="Enter your Residence"
              value={usrAddress}
              onChangeText={(text) => setUsrAddress(text)}
              style={{
                backgroundColor: "#E9E7D2",
                borderRadius: 8,
                paddingHorizontal: 10,
                width: "60%",
                height: 40,
                marginBottom: "2%",
                marginRight: 30,
              }}
            />
          </View>

          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              marginVertical: 8,
              marginLeft: 10,
            }}
          >
            <Text style={{ fontSize: 16 }}>Farm Details:</Text>
          </View>

          {/* NPK value */}
          <View
            style={{
              width: "100%",
              // flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Soil Content: in(mg/kg)</Text>
            </View>
            <View style={{flexDirection:'row',width:'100%'}}>
            <View
              style={{
                alignItems: "center",
                width: "20%",
                marginTop:10,
                marginRight: 25,
                flexDirection: "row",
                marginLeft:10,

              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>nitrogen (N):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmNValue}
                keyboardType="numeric"
                onChangeText={(text) => setFarmNValue(text)}
                style={{
                  backgroundColor: "#E9E7D2",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:'30%',
                  width:40,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />

            </View>
            <View
              style={{
                alignItems: "center",
                width: "24%",
                marginTop:10,
                marginRight: 25,
                flexDirection: "row",
                marginLeft:10,

              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>phosphorus (P):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmPValue}
                keyboardType="numeric"
                onChangeText={(text) => setFarmPValue(text)}
                style={{
                  backgroundColor: "#E9E7D2",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:'30%',
                  width:40,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />

            </View>
            <View
              style={{
                alignItems: "center",
                width: "20%",
                marginTop:10,
                marginRight: 30,
                flexDirection: "row",
                marginLeft:10,

              }}
            >
              <Text style={{marginRight:5,fontSize:13}}>potassium(K):</Text>

              <TextInput
                autoCompleteType="off"
                value={farmKValue}
                keyboardType="numeric"
                onChangeText={(text) => setFarmKValue(text)}
                style={{
                  backgroundColor: "#E9E7D2",
                  borderRadius: 8,
                  paddingHorizontal: 5,
                  width:'30%',
                  width:40,
                  // marginHorizontal:20,
                  height: 40,
                }}
              />

            </View>
            
            </View>
           
              {/* <Text style={{ fontWeight: "bold" }}>(mg/kg)</Text> */}
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <View
              style={{
                fontSize: 15,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Farm Size:</Text>
            </View>
            <View
              style={{
                // flexDirection:'row',
                width: "60%",
                marginBottom: "2%",
                marginRight: 30,
                // alignItems:'center'
                position: "relative",
                flexDirection:'row',
                alignItems:'center'
              }}
            >
              <TextInput
                autoCompleteType="off"
                placeholder="e.g: 10"
                value={farmSize}
                keyboardType="numeric"
                onChangeText={(text) => setFarmSize(text)}
                maxLength={10}
                style={{
                  backgroundColor: "#E9E7D2",
                  width: "30%",
                  borderRadius: 8,
                  marginTop: 3,
                  paddingHorizontal: 10,
                  height: 40,
                  // marginRight:10
                }}
              />
              <Text style={{marginHorizontal:10,fontSize:16}}>(acres)</Text>
              {/* <View
                style={{
                  position: "absolute",
                  zIndex: 9999,
                  borderRadius: 8,
                  marginLeft: "40%",
                }}
              >
                <SelectList
                  setSelected={(val) => setFarmsizeUnit(val)}
                  data={data}
                  save="value"
                  defaultOption={{ key: "Acres", value: "Acres" }}
                  search={false}
                  dropdownStyles={{ backgroundColor: "#E9E7D2" }}
                  boxStyles={{ padding: 0 }}
                />
              </View> */}
            </View>

            
          </View>

         
          
        {/* </View> */}
      </ScrollView>
      <TouchableOpacity style={styles.btnbg} onPress={dirToHome}>
        <Text style={styles.btntext}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.stackbtn}>
        <TouchableOpacity
          style={styles.leftStackbtn}
          onPress={onpressbck}
        ></TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#FFFDD0",
  },
  TopComponent: {
    // flex: 1,
    backgroundColor: "green",
    // position: 'absolute',
  },
  mainscreen: {
    // flex: 1,
    position: "relative",
    // backgroundColor:'red',
    width: "100%",
    // justifyContent: 'center',
    alignItems: "center",
  },
  dataphoto: {
    width: 50,
    height: 50,
  },
  btnbg: {
    padding: 10,
    alignItems: "center",
    elevation: 4,
    bottom:20,
    backgroundColor: "#6DB660",
    borderRadius: 50,
    width:'30%'
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
  },
  stackbtn: {
    width: "100%",
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftStackbtn: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 25,
    borderRightWidth: 50,
    borderBottomWidth: 25,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderRightColor: "#6DB660",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    marginLeft: 15,
  },

  //

  containebuubler: {
    // flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 160,
    justifyContent: "center",
  },
  bgimg: {
    position: "absolute",
    // flex: 1,
    height: 150,
    top: 0,
    backgroundColor: "lightblue",
  },
  choicebtn: {
    backgroundColor: "#E9E7D2",
    height: 16,
    width: 16,
    borderRadius: 8,
    margin: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  choicebtnselected: {
    backgroundColor: "#6DB660",
    width: 9,
    height: 9,
    borderRadius: 5,
  },
});
