import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "../auth/authNavigator";
import MainStackNavigator from "./MainStackNavigator.js";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {isLoggedIn ? <MainStackNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;
