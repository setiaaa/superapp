import React, { useState } from "react";
import { View, Text } from "react-native";
import { Search } from "../../../components/Search";
import BadgeFilter from "../../../components/BadgeFilter";
import CutiBottomTab from "./CutiBottomTab"; // Assuming you have a CutiBottomTab component

const CutiScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <CutiBottomTab />
        </View>
    );
};

export default CutiScreen;
