import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import AuthNavigator from "../auth/authNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const AppNavigator = () => {

    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* {isLoggedIn ? <MainStackNavigator /> : <AuthNavigator />} */}
                <AuthNavigator />
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default AppNavigator;
