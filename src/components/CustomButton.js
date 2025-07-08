import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomButton = ({
    title,
    onPress,
    color = null,
    disabled = false,
    startIcon = null,
    endIcon = null,
}) => {
    const backgroundColor = disabled ? "#ccc" : color ?? "#fff";
    const textColor = color == null ? "#000" : "#fff";
    const borderColor = color ?? "#333";
    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.disabled,
                { backgroundColor, borderColor },
            ]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            {startIcon && (
                <MaterialCommunityIcons
                    name={startIcon}
                    color={textColor}
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
