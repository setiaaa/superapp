import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import CalenderNavigator from "../apps/calender/CalenderNavigator";
import CutiNavigator from "../apps/cuti/CutiNavigator";
import { useSelector } from "react-redux";
import { getTokenValue } from "../services/session";
import PrepareAndSharingNavigator from "../apps/prepareandsharing/PrepareAndSharingNavigator";
import ThemeScreen from "../screens/tabs/Profile/ThemeScreen";
import { AddressBook } from "../addressbook/AddressBookScreen";

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
    const { device } = useSelector((state) => state.apps);
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, orientation: "auto" }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Calender" component={CalenderNavigator} />
            <Stack.Screen name="Cuti" component={CutiNavigator} />
            <Stack.Screen name="PrepareAndSharing" component={PrepareAndSharingNavigator} />
            <Stack.Screen name="Tema" component={ThemeScreen} />
            <Stack.Screen name="AddressBook" component={AddressBook} />
            {/* <Stack.Screen name="SuratApp" component={SuratNavigator} />
            <Stack.Screen name="AbsensiApp" component={AbsensiNavigator} /> */}
        </Stack.Navigator>
    );
};

export default MainStackNavigator;
