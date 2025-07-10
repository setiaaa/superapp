import React from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from "react-native";
import { useTheme } from "../theme/ThemeContext"; // pastikan path benar

const BadgeFilter = ({ filters, selectedFilter, onSelect }) => {
    const { theme } = useTheme();

    return (
        <View style={{ marginVertical: 12 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filters.map((filter) => {
                    const isActive = selectedFilter.key === filter.key;
                    return (
                        <TouchableOpacity
                            key={filter.key}
                            style={[
                                styles.badge,
                                {
                                    backgroundColor: isActive
                                        ? theme.primary
                                        : theme.card,
                                    borderColor: isActive
                                        ? theme.primary
                                        : theme.border,
                                },
                            ]}
                            onPress={() => onSelect(filter)}
                        >
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: isActive
                                            ? "#fff"
                                            : theme.text,
                                    },
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
        marginRight: 10,
        borderWidth: 1,
    },
    label: {
        fontSize: 13,
    },
});
