import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../theme/ThemeContext";
const CustomTextInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    mandatory = false,
    editable = true,
    endIcon = null,
    password = false,
}) => {
    const { theme, isDark, toggleTheme, themeMode  } = useTheme();
    const [isSecure, setIsSecure] = useState(secureTextEntry || password);
    const renderIcon = () => {
        if (!endIcon) return null;
        if (endIcon === "eye") {
            return (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <MaterialCommunityIcons
                        name={isSecure ? "eye-off" : "eye"}
                        size={20}
                        color={theme.icon}
                    />
                </TouchableOpacity>
            );
        }
        return <MaterialCommunityIcons name={endIcon} size={20} color={theme.icon} />;
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                {label && (
                    <Text style={[styles.label, { color: theme.text }]}>
                        {label}
                    </Text>
                )}
                {mandatory && <Text style={{ color: theme.error }}>*</Text>}
            </View>
            <View style={[styles.input, { borderColor: theme.border }]}>
                <TextInput
                    style={[
                        styles.inputField,
                        {
                            color: theme.text,
                            backgroundColor: theme.inputBackground,
                        },
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={theme.placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                    editable={editable}
                />

                {renderIcon()}
            </View>
        </View>
    );
};

export default CustomTextInput;

const styles = StyleSheet.create({
    container: {
        gap: 0,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingRight: 14,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },
    inputField: {
        borderRadius: 14,
        height: 40,
        paddingLeft: 14,
        paddingVertical: 10,
        flex: 1,
        fontSize: 16,
    },
});
