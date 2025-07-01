import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeBottomTabs from "./HomeBottomTabs";

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1}}>
            <HomeBottomTabs />
        </View>
    );
};

export default HomeScreen;
