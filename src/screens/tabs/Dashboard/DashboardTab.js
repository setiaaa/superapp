import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const DashboardTab = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dasbor</Text>
            <Text style={styles.description}>
                Ini adalah tab Dasbor yang menampilkan informasi penting.
            </Text>
        </View>
    );  
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#666",
    },
});

export default DashboardTab;