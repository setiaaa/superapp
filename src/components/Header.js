// Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = ({ title, showBack = false }) => {
    const navigation = useNavigation();

    const canGoBack = navigation.canGoBack();
    return (
        <View style={styles.header}>
            <Text
                style={{
                    ...styles.headerText,
                    position: "absolute",
                    textAlign: "center",
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
                        color="black"
                    />
                    <Text style={{ fontSize: 16 }}>Kembali</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#FFF",
        paddingVertical: 16,
        paddingHorizontal: 0,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        color: "black",
        fontSize: 16,
        fontWeight: "bold",
        width: "100%",
    },
});

export default Header;
