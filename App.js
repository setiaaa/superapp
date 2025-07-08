import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
// import { AuthProvider } from "./src/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { KeyboardAvoidingView } from "react-native";

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <Provider store={store}>
                    {/* <AuthProvider> */}
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

                        <AppNavigator />
                    {/* </AuthProvider> */}
                    </KeyboardAvoidingView>
                </Provider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
