import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "../auth/authNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../theme/ThemeContext";

const AppNavigator = () => {
    const theme = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1}}>
                {/* {isLoggedIn ? <MainStackNavigator /> : <AuthNavigator />} */}
                <AuthNavigator />
            </SafeAreaView>
        </NavigationContainer>
    );
};

export default AppNavigator;
