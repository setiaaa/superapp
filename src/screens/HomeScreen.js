import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeTabs from "./HomeTabs";
import { useSelector } from "react-redux";

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <HomeTabs />
        </View>
    );
};

export default HomeScreen;
