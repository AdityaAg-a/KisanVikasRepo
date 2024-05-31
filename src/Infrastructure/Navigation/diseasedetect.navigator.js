import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DiseaseDetect } from '../../features/Home/screens/DiseaseDetect/diseasedetect.screen';
import { DiseaseInfo } from '../../features/Home/screens/DiseaseDetect/diseaseinfo.screen';


const Stack = createStackNavigator();

export default function DiseaseDetectNavigator() {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="Disease Detect" component={DiseaseDetect}
                    options={{ headerShown: false }}
                />
                {/* <Stack.Screen name="CameraScreen" component={CameraScreen}
                     options={{ headerShown: false, tabBarVisible: false }}
                /> */}
                <Stack.Screen name="DiseaseInfo" component={DiseaseInfo}
                     options={{ headerShown: false, tabBarVisible: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
