import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
// import { AuthProvider } from "./src/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { KeyboardAvoidingView, useWindowDimensions } from "react-native";
import { DeviceType, getDeviceTypeAsync } from "expo-device";

import SplashScreen from "./src/components/SplashScreen";

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

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
        dispatch(setDevice(deviceTypeMap[device]));
      })
      .catch((error) => console.log(error));
  }, []);

  if (!isAppReady) {
    // onFinish akan memanggil setIsAppReady(true) setelah 3 detik
    return <SplashScreen onFinish={() => setIsAppReady(true)} />;
  }

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
