import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../../components/Header";
import PrepareAndSharingScreen from "./screens/PrepareAndSharingScreen";

const Stack = createNativeStackNavigator();

export default function PrepareAndSharingNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <AppHeader title="Prepare and Sharing" showBack={true} />,
            }}
        >
            <Stack.Screen name="PrepareAndSharingScreen" component={PrepareAndSharingScreen} />
            {/* <Stack.Screen name="DokumenPersetujuanDetail" component={DokumenPersetujuanDetail} /> */}
        </Stack.Navigator>
    );
}