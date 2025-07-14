import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";
import Header from "../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";

const ThemeScreen = () => {
    const { changeTheme, theme } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <Header
                title="Tema"
                showBack={true}
                onBackPress={() => navigation.goBack()}
            />
            <View style={{ flex: 1, padding: 20, gap: 20 }}>
                <CustomButton
                    title="Teran"
                    onPress={() => changeTheme("light")}
                />
                <CustomButton
                    title="Gelap"
                    onPress={() => changeTheme("dark")}
                />
                <CustomButton
                    title="Otomatis"
                    onPress={() => changeTheme(null)}
                />
            </View>
        </View>
    );
};

export default ThemeScreen;
