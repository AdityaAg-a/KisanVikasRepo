import { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  FlatList,
  BackHandler,
  Alert,
} from "react-native";
import { MyCropList } from "../../../Services/appdata/mycroplist.service";
import { UserDataContext } from "../../../Services/userdata/userdata.context";
import { AuthenticationContext } from "../../../Services/authentication/authentication.context";

export const AddNewCrop = ({ navigation }) => {
    const [data, setdata] = useState("");
    const { user } =useContext(AuthenticationContext);
    const { allCrop, selectedCrops, onCropSelection ,onSetUser} = useContext(UserDataContext);
    // const handleBackPress = () => {
    //     // Call the onLogout function
    //     // Alert.alert("pressing back")
    //     // onLogout(); // This function should handle the logout logic and navigate to the login screen
    //     // return true; // Prevent default behavior (exit app)
    //   };
    
    //   useEffect(() => {
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       handleBackPress // Pass the handleBackPress function as the event handler
    //     );
    
    //     return () => backHandler.remove();
    //   }, []);
    const [selectedCropList, setselectedCropList] = useState([]);

    useEffect(()=>{
        MyCropList()
            .then((result) =>{
                console.log("alcroppss :: " + allCrop);
                if (allCrop.length === 0 ) {
                  console.log("set data result")
                  setdata(result);
              } else {
                console.log("set data Allcrops")
                  setdata(allCrop);
              }
            })
        if(selectedCrops.length === 0){

        }
        else{
          setselectedCropList(selectedCrops)
        }

        // onSetUser(user,"true")
    },[]);

  // function to set crop seleted or deselected
  const handleonSelect = (item) => {
    item.selected=!item.selected;
    const newItem = data.map((val) => {
      if (val.cropid === item.cropid) {
        return { ...val, selected: item.selected };
      } else {
        return val;
      }
    });
    console.log(newItem);
    setdata(newItem);
    var hasCrop=selectedCropList.some(p => p.cropid === item.cropid)
    console.log("has crop: "+hasCrop);
    console.log(selectedCropList);
    if(item.selected === true){
        console.log("item is selected")
        if(hasCrop){

        }
        else{
            setselectedCropList(prevList =>[ ...prevList, item]);
            console.log(selectedCropList)
        }
    }
    else{
        console.log(hasCrop+ " : item is deselected")
        if(hasCrop){
            console.log("item removing")
            setselectedCropList(prevList => prevList.filter(p => p.cropid !== item.cropid));
        }
        else{
            console.log("why item removing")
        }
    }

  };

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
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
    if (Array.isArray(data)) {
    const FruitData = data.filter(item => item.cropType === "Fruit");
    return (
      <FlatList
        data={FruitData}
        renderItem={renderRow}
        keyExtractor={(item) => item.cropid}
        numColumns={4} // Display 3 items per row
        contentContainerStyle={styles.list}
      />
    );
    }
    else {
      // Render some default UI or return null if data is not valid
      return null;
    }
  };
  const renderFlatListVege = () => {
    if (Array.isArray(data)) {
    const vegetableData = data.filter(item => item.cropType === "Vegetable");

    return (
      <FlatList
        data={vegetableData}
        renderItem={renderRow}
        keyExtractor={(item) => item.cropid}
        numColumns={4} // Display 3 items per row
        contentContainerStyle={styles.list}
      />
    );
    }
    else {
      // Render some default UI or return null if data is not valid
      return null;
    }
  };
//   var selectedcropp = selectedCropList.filter((item) => item.selected);

  const renderSelectedFlatList = () => {
    return (
      <FlatList
        style={{}}
        data={selectedCropList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {item.selected ? (
              <View style={{ padding: 1, width: 60 }}>
                <TouchableOpacity style={styles.selectCropbg}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: "75%", height: "75%" }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      />
    );
  };

  const [selectedItem, setSelectedItem] = useState(data);
  const handleStageModalOpen = (item) => {
    setSelectedItem(item);
    showselectStagePop(true);
  };

  const handleStageModalClose = () => {
    showselectStagePop(false);
  };

  const handleSaveModalValue = (value) => {
    const updatedData = selectedCropList.map((item) => {
      if (item.cropid === selectedItem.cropid) {
        return { ...item, stageofFamring: value };
      } else {
        return item;
      }
    });
    setselectedCropList(updatedData);
    showselectStagePop(false);
  };

  const renderSelectedFlatListStage = () => {
    return (
      <FlatList
        style={{}}
        data={selectedCropList}
        renderItem={({ item }) => (
          <View>
            {item.selected ? (
              <View style={styles.choosenCropS}>
                <View style={styles.selectedCropbg}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={{ width: "75%", height: "75%" }}
                    resizeMode="contain"
                  />
                </View>
                <TouchableOpacity
                  style={styles.dropdownbox}
                  onPress={() => handleStageModalOpen(item)}
                >
                  <Text style={styles.dropdownboxtxt}>
                    {item.stageofFamring}
                  </Text>
                  <Image
                    style={styles.dropdownlogo}
                    source={require("../../../../assets/components/dropdown.png")}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}
      />
    );
  };
  const selectstagefunc = ({ item }) => {
    showselectStagePop(true);
    item.stageofFamring;
  };

  const [addcropPop, showaddcroppop] = useState(false);
  const [selectStagePop, showselectStagePop] = useState(false);
  const [seletedStage, setseletedStage] = useState("");

  const disableseletestagepop = () => {
    showselectStagePop(false);
  };

  const onPressnxt = async () => {
    await onCropSelection({data,selectedCropList})
    navigation.navigate("GetUserInfo");
  };
  const onpressbck = () => {
    navigation.navigate("location");
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={"#000000"} />
      {/* using as Stack bubble UI and Its background image */}
      <View style={styles.containebuubler}>
        <Image
          source={require("../../../../assets/UserInfoIMG/addnewcrop.jpg")}
          style={[styles.bgimg, { width: "100%" }]}
          resizeMode="cover"
        />
        <View style={styles.choicebtn}></View>
        <View style={styles.choicebtn}>
          <View style={styles.choicebtnselected} />
        </View>
        <View style={styles.choicebtn}></View>
      </View>

      {/* mainscreen */}

      <View style={styles.mainscreen}>
        <Text style={styles.datatext}>Select Crops </Text>
        
        <View style={styles.ChooseCrop}>
          <View style={styles.selectedcrops}>{renderSelectedFlatList()}</View>

          <TouchableOpacity
            style={styles.AddselectCropbg}
            onPress={() => {
              showaddcroppop(true);
            }}
          >
            <Image
              source={require("../../../../assets/UserInfoIMG/addsymboladd.png")}
              style={{ width: "75%", height: "75%" }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.selectstage}>
          {/* <View style={styles.selectstagechoice}> */}
          {renderSelectedFlatListStage()}
          {/* </View> */}
        </View>
      </View>

      {/* nav button */}

      <View style={styles.stackbtn}>
        <TouchableOpacity
          style={styles.leftStackbtn}
          onPress={onpressbck}
        ></TouchableOpacity>
        <TouchableOpacity
          style={styles.rightStackbtn}
          onPress={onPressnxt}
        ></TouchableOpacity>
      </View>

      {/* add new crop pop up modal */}
      <Modal transparent={true} visible={addcropPop}>
        <View style={styles.popupwindow}>
          <View style={styles.addnewcroppopUp}>
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
            <TouchableOpacity
              style={styles.btnbg}
              onPress={() => {
                showaddcroppop(false);
              }}
            >
              <Text style={styles.btntext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* select a stage modal pop up */}
      <Modal
        transparent={true}
        visible={selectStagePop}
        // onRequestClose={handleStageModalClose}
      >
        <View style={styles.popupwindow}>
          <View style={styles.selectstagepopup}>
            <Text style={styles.popupHeading}>
              Select a Stage for : {selectedItem.cropName}
            </Text>

            <View style={styles.StageSelectbtnwindow}>
              <TouchableOpacity
                style={styles.btnStageSelect}
                onPress={() => handleSaveModalValue("1. Land Prepare")}
              >
                <View style={styles.bgforStageSelect}>
                  <Image
                    source={require("../../../../assets/stageoffarming/LandPrepare.png")}
                    resizeMode="contain"
                    style={{ width: 55, height: 55 }}
                  />
                </View>
                <Text style={styles.txtStageSelect}>1. Land Prepare</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnStageSelect}
                onPress={() => handleSaveModalValue("2. Sowing")}
              >
                <View style={styles.bgforStageSelect}>
                  <Image
                    source={require("../../../../assets/stageoffarming/sowing.png")}
                    resizeMode="contain"
                    style={{ width: 45, height: 45 }}
                  />
                </View>
                <Text style={styles.txtStageSelect}>2. Sowing</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnStageSelect}
                onPress={() => handleSaveModalValue("3. Farming")}
              >
                <View style={styles.bgforStageSelect}>
                  <Image
                    source={require("../../../../assets/stageoffarming/farming.png")}
                    resizeMode="contain"
                    style={{ width: 45, height: 45 }}
                  />
                </View>
                <Text style={styles.txtStageSelect}>3. Farming</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.StageSelectbtnwindow}>
              <TouchableOpacity
                style={styles.btnStageSelect}
                onPress={() => handleSaveModalValue("4. Harvesting")}
              >
                <View style={styles.bgforStageSelect}>
                  <Image
                    source={require("../../../../assets/stageoffarming/Harvesting.png")}
                    resizeMode="contain"
                    style={{ width: 45, height: 45 }}
                  />
                </View>
                <Text style={styles.txtStageSelect}>4. Harvesting</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnStageSelect}
                onPress={() => handleSaveModalValue("5. Storage & Sell")}
              >
                <View style={styles.bgforStageSelect}>
                  <Image
                    source={require("../../../../assets/stageoffarming/Storage.png")}
                    resizeMode="contain"
                    style={{ width: 45, height: 45 }}
                  />
                </View>
                <Text style={styles.txtStageSelect}>5. Storage & Sell</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFDD0",
  },
  TopComponent: {
    flex: 1,
    backgroundColor: "green",
    position: "absolute",
  },
  mainscreen: {
    flex: 4,
    // backgroundColor:'red',
    width: "100%",
    alignItems: "center",
  },
  dataphoto: {
    width: 50,
    height: 50,
  },
  btnbg: {
    padding: 10,
    marginTop:40,
    alignItems: "center",
    elevation: 4,
    backgroundColor: "#6DB660",
    borderRadius: 50,
    position:'relavtive',
    top: "0px",
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
  },
  stackbtn: {
    flex: 1,
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
  rightStackbtn: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 25,
    borderRightWidth: 0,
    borderBottomWidth: 25,
    borderLeftWidth: 50,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#6DB660",
    marginRight: 15,
  },

  //

  containebuubler: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 200,
    justifyContent: "center",
  },
  bgimg: {
    position: "absolute",
    flex: 1,
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

  //mainscreen
  datatext: {
    position: "absolute",
    top: "5%",
    fontSize: 20, // fontSize: '20px',
  },
  nxtlinetext: {
    position: "absolute",
    top: "10%",
    fontSize: 14,
  },
  ChooseCrop: {
    top: "18%",
    backgroundColor: "#6DB660",
    width: "94%",
    height: 70,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  selectedcrops: {
    flexDirection: "row",
    flex: 1,
  },
  showselectedcropslist: {
    flexDirection: "row",
  },
  selectCropbg: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: "5%",
    backgroundColor: "#E9E7D2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  AddselectCropbg: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: "3%",
    backgroundColor: "#E9E7D2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    zIndex: 9999,
  },
  selectstage: {
    // justifyContent:'center',
    // flex:6,
    // top:'20%',
    // width:'85%',
    // height:100,
    // width:'95%',
    top: "16%",
    height: 280,
    margin: 0,
    width: "90%",
    alignContent: "center",
    position: "relative",
    // backgroundColor:'pink'
  },
  // selectstagechoice:{
  //   // justifyContent:'center',
  //   flex:1,

  // },

  scrollContainer: {
    flexGrow: 1,
    width: "100%",
  },

  choosenCropS: {
    // top: '25%',
    backgroundColor: "#6DB660",
    // width: '85%',
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    margin: 5,
  },
  selectedCropbg: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginLeft: "3%",
    backgroundColor: "#E9E7D2",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownbox: {
    // backgroundColor:'pink',
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: "6%",
    backgroundColor: "#619558",
    width: 40,
    height: 40,
    elevation: 1,
    borderRadius: 5,
  },
  dropdownboxtxt: {
    // justifyContent:'center',
    // alignContent:'center',
    alignSelf: "center",
    color: "white",

    // paddingLeft:'5%',
    // paddingRight:'30%',
    // paddingTop:'1%',
    // paddingBottom:'1%',
  },
  dropdownlogo: {
    flex: 1,
    // backgroundColor:'pink',
    width: "100%",
    height: "100%",
  },

  // popup for add new crop

  popupwindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addnewcroppopUp: {
    backgroundColor: "#E9E7D2",
    width: "90%",
    minHeight: "55%",
    height:100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
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
    position: "absolute",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    backgroundColor: "#6DB660",
    borderRadius: 50,

    textAlign: "center",
    bottom: 10,
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
  },
  list: {
    // justifyContent: 'center',
    // alignContent:'center',
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "flex-start",
    // backgroundColor:'lightblue',
  },
  item: {
    alignSelf: "center",
    margin: 5,
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#6DB660",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
  },
  // pop up for selecting stage of farming
  selectstagepopup: {
    backgroundColor: "#E9E7D2",
    width: "90%",
    minHeight: "40%",
    borderRadius: 10,
    // justifyContent: 'center',
    alignItems: "center",
  },
  btnStageSelect: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 35,
    marginRight: 18,
    marginTop: 15,
    marginBottom: 6,
  },
  StageSelectbtnwindow: {
    flexDirection: "row",
  },
  bgforStageSelect: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#6DB660",
    alignItems: "center",
    justifyContent: "center",
  },
  txtStageSelect: {
    fontSize: 8,
  },
});
