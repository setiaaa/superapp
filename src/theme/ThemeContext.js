import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "./themes";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(null);

    useEffect(() => {
        const initialScheme = Appearance.getColorScheme();
        setIsDark(initialScheme === "dark");

        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setIsDark(colorScheme === "dark");
        });

        return () => subscription.remove();
    }, []);

    if (isDark === null) return null; // jangan render dulu sampai tahu mode

    const theme = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => setIsDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
