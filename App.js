import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
// import { AuthProvider } from "./src/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import {
    KeyboardAvoidingView,
    Platform,
    useWindowDimensions,
} from "react-native";
import { DeviceType, getDeviceTypeAsync } from "expo-device";
import { ThemeProvider, useTheme } from "./src/theme/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

// ✅ Komponen ini berada di dalam ThemeProvider
const AppContent = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();

    return (
        <>
            <StatusBar
                style={isDark ? "light" : "dark"}
                translucent={true}
                animated={true}
                backgroundColor={theme.background}
            />
            <SafeAreaProvider style={{ backgroundColor: theme.surface }}>
                <PaperProvider>
                    <AppNavigator />
                </PaperProvider>
            </SafeAreaProvider>
        </>
    );
};

export default function App() {
    const { width, height } = useWindowDimensions();
    const [deviceName, setDeviceName] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [deviceUUID, set_deviceUUID] = useState(null);
    const [deviceOS, setDeviceOS] = useState(null);

    useEffect(() => {
        const deviceTypeMap = {
            [DeviceType.UNKNOWN]: "unknown",
            [DeviceType.PHONE]: "phone",
            [DeviceType.TABLET]: "tablet",
            [DeviceType.TV]: "tv",
            [DeviceType.DESKTOP]: "desktop",
        };
        getDeviceTypeAsync()
            .then((device) => {
                // dispatch(setDevice(deviceTypeMap[device])); // aktifkan kalau dispatch tersedia
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <ThemeProvider>
                    <AppContent />
                </ThemeProvider>
            </Provider>
        </GestureHandlerRootView>
    );
}
