import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../../../components/Header";
import BottomTabNavigator from "../../../components/BottomTabNavigator";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Dokumen  from "./tabs/Dokumen/DokumenTab";
import Dibagikan from "./tabs/Dibagikan/DibagikanTab";
import DokumenTemplate from "./tabs/DokumenTemplate/DokumenTemplateTab";
import Tinjauan from "./tabs/Tinjauan/TinjauanTab";



const tabs = [
    // { name: "Personal", icon: "home", component: PersonalTab },
    {
        name: "Dokumen",
        icon: "file",
        component: Dokumen,
    },
    {
        name: "Dibagikan",
        icon: "share-variant",
        component: Dibagikan,
    },
    {
        name: "Tinjauan",
        icon: "file-eye",
        component: Tinjauan,
    },
    {
        name: "Dokumen Template",
        icon: "file-document-multiple",
        component: DokumenTemplate,
    },
];
const PrepareAndSharingTabs = () => {
    return <BottomTabNavigator tabs={tabs} />;
};

const styles = StyleSheet.create({});

export default PrepareAndSharingTabs;
