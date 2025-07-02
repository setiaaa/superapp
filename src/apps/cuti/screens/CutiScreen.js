import React, { useState } from "react";
import { View, Text } from "react-native";
import CutiTabs from "./CutiTabs"; // Assuming you have a CutiBottomTab component

const CutiScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <CutiTabs />
        </View>
    );
};

export default CutiScreen;
