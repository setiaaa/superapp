import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ tabs = [] }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const currentTab = tabs.find((tab) => tab.name === route.name);
        return {
          headerShown: false,
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "#888",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#ccc",
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
