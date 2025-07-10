// Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "../theme/ThemeContext"; // Adjust the import path as necessary

const Header = ({ title, showBack = false }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const canGoBack = navigation.canGoBack();
    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: theme.card, // 🟦 latar belakang header
                    borderBottomColor: theme.border, // 🟧 garis bawah
                },
            ]}
        >
            <Text
                style={{
                    ...styles.headerText,
                    position: "absolute",
                    textAlign: "center",
                    color: theme.text, // 🟩 teks judul
                }}
            >
                {title}
            </Text>
            {showBack && canGoBack && (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Ionicons
                        name="chevron-back-outline"
                        size={28}
                        color={theme.icon}
                    />
                    <Text style={{ fontSize: 16, color: theme.text }}>
                        Kembali
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 16,
        paddingHorizontal: 0,
        alignItems: "center",
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
    },
});

export default Header;
