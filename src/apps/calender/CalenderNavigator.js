import { createNativeStackNavigator, useNavigation  } from "@react-navigation/native-stack";
import AppHeader from "../../components/Header";
import CalenderScreen from "./screens/CalenderScreen";

const Stack = createNativeStackNavigator();

export default function CalenderNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: () => <AppHeader title="Kalender" showBack={true} />,
            }}
        >
            <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
        </Stack.Navigator>
    );
}
