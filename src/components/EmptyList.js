import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // pastikan sudah install
import { useTheme } from "../theme/ThemeContext"; // sesuaikan path
import LottieView from "lottie-react-native";

const EmptyList = ({
    message = "Tidak ada data",
    icon = "document-outline",
}) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <LottieView
                source={require("../../assets/EmptyList/EmptyList.json")}
                autoPlay
                loop
                style={{ width: 160, height: 160 }}
            />
            <Text style={[styles.text, { color: theme.textSecondary }]}>
                {message}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        marginBottom: 16,
    },
    text: {
        fontSize: 16,
        textAlign: "center",
    },
});

export default EmptyList;
