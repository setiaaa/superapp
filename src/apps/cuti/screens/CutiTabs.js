import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomTabNavigator from "../../../components/BottomTabNavigator";
import { useNavigation } from "@react-navigation/native";
import PersonalTab from "./tabs/Personal/PersonalTab";
import DokumenPersetujuanTab from "./tabs/DokumenPersetujuan/DokumenPersetujuanTab";
import DokumenPersonal from "./tabs/DokumenPersonal/DokumenPersonalTab";

const tabs = [
  {
    name: "Personal",
    label: "Personal",
    icon: "home",
    component: PersonalTab,
  },
  {
    name: "Dokumen Persetujuan",
    label: "Dokumen\nPersetujuan",
    icon: "briefcase",
    component: DokumenPersetujuanTab,
  },
  {
    name: "Dokumen Personal",
    label: "Dokumen\nPersonal",
    icon: "file-document-outline",
    component: DokumenPersonal,
  },
];

const CutiTabs = () => {
  return <BottomTabNavigator tabs={tabs} />;
};

const styles = StyleSheet.create({});

export default CutiTabs;
