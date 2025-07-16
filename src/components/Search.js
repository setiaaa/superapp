import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
// import { useSelector } from "react-redux";
import { useTheme } from "../theme/ThemeContext";

export const Search = ({ onSearch, placeholder, iconColor }) => {
    const { theme, isDark, toggleTheme, themeMode  } = useTheme();
    return (
        <View style={[
                styles.input,
                {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                },
            ]}>
            <Ionicons
                name="search"
                color={iconColor || theme.iconSecondary}
            />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.placeholder}
                style={{
                    flex: 1,
                    color: theme.text,
                }}
                maxLength={30}
                onChangeText={( onSearch )}
                clearButtonMode="always"
                allowFontScaling={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 12,
    },
});
