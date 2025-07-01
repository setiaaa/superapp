import React from "react";
import { createNativeStackNavigator, useNavigation  } from "@react-navigation/native-stack";
import AppHeader from "../../components/Header";
import DigiSignScreen from "./screens/DigiSignScreen";

const Stack = createNativeStackNavigator();

export default function DigiSignNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <AppHeader title="Digital Sign" showBack={true} />,
            }}
        >
            <Stack.Screen name="DigiSignScreen" component={DigiSignScreen} />
        </Stack.Navigator>
    );
}