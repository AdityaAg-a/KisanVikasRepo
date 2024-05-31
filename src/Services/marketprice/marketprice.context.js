import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserDataContext } from "../userdata/userdata.context";
import { getmarketprice } from "./marketprice.service";

export const MarketPriceContext=createContext();

export const MarketPriceContextProvider = ({children}) =>{
    const { userCity ,selectedCrops } = useContext(UserDataContext);

    const [minprice,setMinprice]= useState("");
    const [maxprice,setMaxprice]= useState("");
    // useEffect(() => {
    //     // console.log("##############################################asdfj;alskjdf;#");
    //     (async () => {
    //         if(selectedCrops[0]){
    //         var mypricedata = await getmarketprice(userCity, selectedCrops[0].cropName);
    //          setMaxprice(mypricedata.records[0].max_price);
    //         //  console.log(mypricedata)
    //         setMinprice(mypricedata.records[0].min_price);
    //         }
    //     })();
    // }, [selectedCrops]);

    const updateCropMarketPrice = async (item) =>{
        console.log("item")
        console.log(item)
        try{
            var mypricedata = await getmarketprice(userCity, item);
            if(mypricedata && mypricedata.records && mypricedata.records.length > 0){
                setMaxprice(mypricedata.records[0].max_price);
                setMinprice(mypricedata.records[0].min_price);
                //console.log(mypricedata.records[0])
            }
            else {
                //console.log("No data available in mypricedata.records");
                setMaxprice("NA");
                setMinprice("NA");
            }
        }
        catch(error){
            console.error(error,"Exception Occured")
            setMaxprice("NA");
            setMinprice("NA");
        }
    }
    return(
        <MarketPriceContext.Provider
            value={{
                minprice,
                maxprice,
                updateCropMarketPrice
            }}
        >
            {children}
        </MarketPriceContext.Provider>
    )
}