import React, { createContext, useEffect, useState } from "react";
import { getAllDiseases } from "./diseasedetect.service";

export const DiseaseDetectContext = createContext();

export const DiseaseDetectContextProvider = ({children}) =>{
    const [allCropsDiseaseList,setallCropsDiseaseList] = useState([]);
    const [currentCropforDisease,setcurrentCropforDisease] = useState("");
    useEffect(()=>{
        const fetchdata = async () =>{
            const tempdata = await getAllDiseases();
            // console.log("Disease on context: ",tempdata)
            setallCropsDiseaseList(tempdata)
        }
        fetchdata();
    },[])

    return (
        <DiseaseDetectContext.Provider
            value={{
                allCropsDiseaseList,
                currentCropforDisease,
                setcurrentCropforDisease
            }}
        >
            {children}
        </DiseaseDetectContext.Provider>
    )
}