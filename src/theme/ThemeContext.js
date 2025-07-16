import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "./themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(null);
    const [systemColorScheme, setSystemColorScheme] = useState(Appearance.getColorScheme());

    useEffect(() => {
        const loadTheme = async () => {
            const savedMode = await AsyncStorage.getItem("themeMode");
            if (savedMode === "light" || savedMode === "dark") {
                setThemeMode(savedMode);
            } else {
                setThemeMode(null);
            }
        };
        loadTheme();
    }, []);

    useEffect(() => {
        if (themeMode === null) {
            const listener = Appearance.addChangeListener(({ colorScheme }) => {
                setSystemColorScheme(colorScheme);
            });
            return () => listener.remove();
        }
    }, [themeMode]);

    const changeTheme = async (mode) => {
        setThemeMode(mode);
        if (mode === "light" || mode === "dark") {
            await AsyncStorage.setItem("themeMode", mode);
        } else {
            await AsyncStorage.removeItem("themeMode");
        }
    };

    const isDark = themeMode === "dark" || (themeMode === null && systemColorScheme === "dark");
    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDark, themeMode, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
