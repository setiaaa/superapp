import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../../components/Header";
import PrepareAndSharingScreen from "./screens/PrepareAndSharingScreen";
import DokumenDetail from "./screens/tabs/Dokumen/DokumenDetail";
import BerbagiDokumen from "./screens/tabs/Dokumen/BerbagiDokumen";

const Stack = createNativeStackNavigator();

export default function PrepareAndSharingNavigator() {
    console.log("PrepareAndSharingNavigator loaded");
    return (
        // <Stack.Navigator
        //     screenOptions={{
        //         header: () => (
        //             <AppHeader title="Prepare and Sharing" showBack={true} />
        //         ),
        //     }}
        // >
        //     <Stack.Screen
        //         name="PrepareAndSharingScreen"
        //         component={PrepareAndSharingScreen}
        //     />
        //     <Stack.Screen
        //         name="DokumenDetail"
        //         component={DokumenDetail}
        //         options={{ headerTitle: "Detail Dokumen" }}
        //     />
        // </Stack.Navigator>
        <Stack.Navigator
            screenOptions={({ route, navigation, options }) => ({
                header: (props) => {
                    const title = props.options?.headerTitle || "Prepare and Sharing"; // 🧼 kosong jika tidak diset
                    const showBack = props.options?.showBack ?? true;
                    return <AppHeader title={title} showBack={showBack} />;
                },
            })}
        >
            <Stack.Screen
                name="PrepareAndSharingScreen"
                component={PrepareAndSharingScreen}
            />
            <Stack.Screen name="DokumenDetail" component={DokumenDetail} />
            <Stack.Screen name="BerbagiDokumen" component={BerbagiDokumen} />
        </Stack.Navigator>
    );
}
