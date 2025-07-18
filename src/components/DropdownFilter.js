import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

const { width } = Dimensions.get("window");

const DropdownFilter = ({
    data,
    selected,
    setSelected,
    FlexWidth = false,
    absolute = true,  
}) => {
    const [open, setOpen] = useState(false);
    const { theme } = useTheme();

    const toggleDropdown = () => setOpen(!open);
    const onSelect = (item) => {
        setSelected(item.key);
        setOpen(false);
    };

    const selectedLabel = data.find((item) => item.key === selected)?.value;

    return (
        <View style={[styles.container, absolute && { zIndex: 10 }]}>
            <TouchableOpacity
                style={[
                    styles.dropdownButton,
                    {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                    },
                ]}
                onPress={toggleDropdown}
            >
                <Text style={{ color: theme.textSecondary }}>
                    {selectedLabel || "Pilih filter"}
                </Text>
            </TouchableOpacity>

            {open && (
                <View
                    style={[
                        styles.dropdownList,
                        absolute
                            ? styles.absoluteDropdown
                            : styles.relativeDropdown,
                        {
                            backgroundColor: theme.surface,
                            borderColor: theme.border,
                            shadowColor: theme.shadow,
                            width: FlexWidth ? width - 40 : undefined,
                        },
                    ]}
                >
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.dropdownItem,
                                    { borderColor: theme.border },
                                ]}
                                onPress={() => onSelect(item)}
                            >
                                <Text style={{ color: theme.text }}>
                                    {item.value}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dropdownButton: {
        padding: 12,
        borderWidth: 1,
        borderRadius: 12,
    },
    dropdownList: {
        borderWidth: 1,
        borderRadius: 12,
        maxHeight: 160,
        elevation: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        paddingBottom: 8,
    },
    absoluteDropdown: {
        position: "absolute",
        top: 56,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    relativeDropdown: {
        marginTop: 8,
    },
    dropdownItem: {
        padding: 12,
        borderBottomWidth: 0.5,
    },
});

export default DropdownFilter;
