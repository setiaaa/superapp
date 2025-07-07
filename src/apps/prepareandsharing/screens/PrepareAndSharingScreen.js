import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import { getTokenValue } from "../../../services/session";
import PrepareAndSharingTabs from "./PrepareAndSharingTabs";


const PrepareAndSharingScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <PrepareAndSharingTabs />
        </View>
    );
}

export default PrepareAndSharingScreen;