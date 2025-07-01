import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Search } from "../../../../components/Search";
import BadgeFilter from "../../../../components/BadgeFilter";

const PersonalTab = () => {
    const [selected, setSelected] = useState(null);
    const filters = [
        { key: "semua", label: "Semua" },
        { key: "butuh_ttde", label: "Butuh TTDE" },
        { key: "selesai", label: "Selesai" },
        { key: "revisi", label: "Revisi" },
    ];

    return (
        <View style={styles.container}>
            <Search
                placeholder="Cari"
                iconColor="#ccc"
                onSearch={(text) => console.log("Searching:", text)}
            />
            <View style={styles.wrapper}>
                <View style={styles.counterBox}>
                    <Text style={styles.label}>Butuh TTDE</Text>
                    <Text style={styles.count}>20</Text>
                </View>
                <View style={styles.counterBox}>
                    <Text style={styles.label}>Selesai</Text>
                    <Text style={styles.count}>20</Text>
                </View>
            </View>
            <View style={{ padding: 0 }}>
                <BadgeFilter
                    filters={filters}
                    selectedFilter={selected}
                    onSelect={setSelected}
                />
            </View>
            <View style={styles.card}>
                <Text style={styles.text}>Daftar TTD Elektronik</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
    },
    text: {
        fontSize: 20,
        color: "#333",
    },
    wrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 16,
        gap: 12,
    },
    counterBox: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
    },
    label: {
        fontSize: 14,
        color: "#555",
        marginBottom: 6,
        fontWeight: "600",
    },
    count: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6200ee",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        elevation: 2,
        marginTop: 16,
    },
});
export default PersonalTab;
