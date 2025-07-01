import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
import CalenderNavigator from "../apps/calender/CalenderNavigator";
import DigiSignNavigator from "../apps/digisign/DigiSignNavigator";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Calender" component={CalenderNavigator} />
                <Stack.Screen name="DigiSign" component={DigiSignNavigator} />
                {/* <Stack.Screen name="SuratApp" component={SuratNavigator} />
            <Stack.Screen name="AbsensiApp" component={AbsensiNavigator} /> */}
            </Stack.Navigator>
    </SafeAreaView>
);

export default MainStackNavigator;
