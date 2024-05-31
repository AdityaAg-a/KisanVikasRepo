import LottieView from "lottie-react-native";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

const LoadingScreen = ({data}) => {
    // if(Text === null ){
    //     Text="Loading"
    // }
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="blue" /> */}
      {/* <View
        style={{ width: "100%", height: "40%", position: "absolute", top: 30 }}
      >
        <LottieView
          key="animation"
          source={require("../../../assets/watermelon.json")}
          autoPlay
          loop
        />
      </View> */}
      <View style={{flexDirection:'row'}}>
        <ActivityIndicator size="small" color="blue" />
        <Text>{data}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex:9999,
    position:'absolute',
    width:'100%',
    height:'100%'
  },
});

export default LoadingScreen;
