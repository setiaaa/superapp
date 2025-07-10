import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../theme/ThemeContext"; // Adjust the import path as necessary

const CustomButton = ({
    title,
    onPress,
    color = null,
    disabled = false,
    startIcon = null,
    endIcon = null,
}) => {
    const { theme } = useTheme();

    const backgroundColor = color ? color : theme.surface;

    const textColor = color == null ? theme.textSecondary : theme.text; // agar kontras di background berwarna

    const borderColor = color ?? theme.border;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.disabled,
                {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            {startIcon && (
                <MaterialCommunityIcons
                    name={startIcon}
                    color={disabled ? theme.text : textColor}
                    size={18}
                />
            )}
            <Text
                style={[
                    styles.buttonText,
                    { color: disabled ? "#666" : textColor },
                ]}
            >
                {title}
            </Text>
            {endIcon && (
                <MaterialCommunityIcons
                    name={endIcon}
                    color={textColor}
                    size={18}
                />
            )}
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6200ee",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
        height: 48,
    },
    disabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        // color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
