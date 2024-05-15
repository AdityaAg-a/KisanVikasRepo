import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen(){
    const [folderList,setFolderList] = useState([]);
    useEffect(()=>{
        var tempFolderList=[
            {"number":1,"Name":"Anatomy"},
            {"number":2,"Name":"Phyisology"},
            {"number":3,"Name":"Biochemistry"}
        ]
        setFolderList()
    },[])
    return(
        <View>
            <Text>This is Home Screen</Text>
            <FlatList
                
            />
            <TouchableOpacity>Capture Image</TouchableOpacity>
        </View>
    );
}