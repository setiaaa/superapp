import React from "react";
import {
  createNativeStackNavigator,
  useNavigation,
} from "@react-navigation/native-stack";
import AppHeader from "../../components/Header";
import CutiScreen from "./screens/CutiScreen";
import DokumenPersetujuanDetail from "./screens/tabs/DokumenPersetujuan/DokumenPersetujuanDetail";

const Stack = createNativeStackNavigator();

export default function CutiNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ route, navigation, options }) => ({
        header: (props) => {
          const title = props.options?.headerTitle || "Cuti"; // 🧼 kosong jika tidak diset
          const showBack = props.options?.showBack ?? true;
          return <AppHeader title={title} showBack={showBack} />;
        },
      })}
    >
      <Stack.Screen name="CutiScreen" component={CutiScreen} />
      <Stack.Screen
        name="DokumenPersetujuanDetail"
        component={DokumenPersetujuanDetail}
      />
    </Stack.Navigator>
  );
}
