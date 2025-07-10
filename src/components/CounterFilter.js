import React from "react";
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext"; // Adjust the import path as necessary

const CounterFilter = ({ filters = [], selected, onSelect }) => {
    const { theme } = useTheme();
    const renderItem = ({ item }) => {
        const isSelected = selected === item.key;

        return (
            <TouchableOpacity
                style={[
                    styles.counterBox,
                    {
                        backgroundColor: theme.card, // 🔹 latar kartu
                        borderColor: isSelected ? item.color : theme.border, // 🔸 border dinamis
                    },
                ]}
                onPress={() => onSelect(item.key)}
            >
                <View style={styles.topSection}>
                    <View
                        style={{
                            ...styles.iconWrapper,
                            backgroundColor: item.color, // Tetap pakai item.color
                        }}
                    >
                        <Ionicons
                            name="calendar-outline"
                            size={16}
                            color="#fff"
                        />
                    </View>
                    <Text
                        style={[
                            styles.count,
                            { color: isSelected ? item.color : theme.text }, // 🔸 angka kontras
                        ]}
                    >
                        {item.value}
                    </Text>
                </View>

                <Text
                    style={[
                        styles.label,
                        {
                            color: isSelected
                                ? item.color
                                : theme.textSecondary, // 🔸 teks label
                        },
                    ]}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={filters}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false} // non-scrollable
        />
    );
};

const styles = StyleSheet.create({
    row: {
        justifyContent: "space-between",
        margin: 6,
        flexWrap: "wrap",
    },
    counterBox: {
        width: "48%",
        backgroundColor: "#fff",
        borderWidth: 2,
        borderRadius: 12,
        paddingTop: 8,
        paddingBottom: 4,
        paddingHorizontal: 8,
        elevation: 2,
        gap: 8,
    },
    topSection: {
        flexDirection: "row",
        flex: 1,
        gap: 8,
        alignItems: "center",
    },
    iconWrapper: {
        padding: 8,
        borderRadius: 40,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        fontWeight: "500",
        textAlign: "left",
    },
    count: {
        fontSize: 24,
        fontWeight: "600",
    },
});

export default CounterFilter;
