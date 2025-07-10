import React, { use, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import Main from "../navigation/MainStackNavigator"; // Assuming Main is your main app navigator

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
