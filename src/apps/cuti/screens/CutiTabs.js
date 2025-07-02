//HomeBottomTabs.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomTabNavigator from "../../../components/BottomTabNavigator";
import { useNavigation } from "@react-navigation/native";
import PersonalTab from "./tabs/PersonalTab";
import DokumenPersetujuanTab from "./tabs/DokumenPersetujuanTab";


const tabs = [
    { name: "Personal", icon: "home", component: PersonalTab },
    {
        name: "Dokumen Persetujuan",
        icon: "briefcase",
        component: DokumenPersetujuanTab,
    },
    // { name: "Dokumen Personal", icon: "file", component: DokumenPersetujuanTab },
];
const CutiTabs = () => {
    return <BottomTabNavigator tabs={tabs} />;
};

const styles = StyleSheet.create({});

export default CutiTabs;
