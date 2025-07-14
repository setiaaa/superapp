import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../theme/ThemeContext"; // Pastikan path sesuai

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ tabs = [] }) => {
  const { theme, isDark, toggleTheme, themeMode  } = useTheme(); // 🔥 ambil tema aktif

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const currentTab = tabs.find((tab) => tab.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: theme.primary, // 🔵 warna aktif
          tabBarInactiveTintColor: theme.iconSecondary, // ⚪ warna pasif
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            backgroundColor: theme.card, // 🟦 latar tab bar
            borderTopColor: theme.border,
            borderTopWidth: 1,
            
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={currentTab?.icon || "circle"}
              size={size}
              color={color}
            />
          ),
        };
      }}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
