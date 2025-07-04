import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HomeTabs from "./HomeTabs";
import { Provider, useSelector } from "react-redux";
import { store } from "../store/store";

const HomeScreen = () => {
    const navigation = useNavigation();
    return (
        <Provider store={store}>
        <View style={{ flex: 1 }}>
            <HomeTabs />
        </View>
        </Provider>
    );
};

export default HomeScreen;
