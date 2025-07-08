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
    const scheme = useColorScheme();
const textColor = scheme === 'dark' ? '#fff' : '#000';
    const [isSecure, setIsSecure] = useState(secureTextEntry || password);
    const renderIcon = () => {
        if (!endIcon) return null;

        // jika ikon adalah "eye", maka bisa toggle secureTextEntry
        if (endIcon === "eye") {
            return (
                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                    <MaterialCommunityIcons
                        name={isSecure ? "eye-off" : "eye"}
                        size={20}
                        color="#aaa"
                    />
                </TouchableOpacity>
            );
        }

        // selain "eye", tampilkan sebagai ikon biasa
        return <MaterialCommunityIcons name={endIcon} size={20} color="#aaa" />;
    };
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                }}
            >
                {label && <Text style={styles.label}>{label}</Text>}
                {mandatory && <Text style={{ color: "red" }}>*</Text>}
            </View>
            <View style={{ ...styles.input }}>
                <TextInput
                    style={[styles.inputField, { color: textColor }]}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
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
        color: "#333",
    },
    input: {
        
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        paddingRight: 14,
        borderRadius: 12,
        alignItems: "center",
        flexDirection: "row",
        gap: 8,
    },
    inputField: {
        height: 40,
        paddingLeft: 14,
        paddingVertical: 10,
        color: "#000",
        flex: 1,
        fontSize: 16,
        backgroundColor: "#fff",
    },
});
