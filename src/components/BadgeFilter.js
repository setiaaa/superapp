import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";

const BadgeFilter = ({ filters, selectedFilter, onSelect }) => {
    return (
        <View style={{ marginVertical: 12 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filters.map((filter) => {
                    const isActive = selectedFilter === filter.key;
                    return (
                        <TouchableOpacity
                            key={filter.key}
                            style={[
                                styles.badge,
                                isActive && styles.activeBadge,
                            ]}
                            onPress={() => onSelect(filter.key)}
                        >
                            <Text
                                style={[
                                    styles.label,
                                    isActive && styles.activeLabel,
                                ]}
                            >
                                {filter.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default BadgeFilter;

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginRight: 10,
    },
    activeBadge: {
        backgroundColor: "#6200ee",
    },
    label: {
        fontSize: 13,
        color: "#333",
    },
    activeLabel: {
        color: "#fff",
        fontWeight: "600",
    },
});
