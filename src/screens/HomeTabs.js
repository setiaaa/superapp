
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomTabNavigator from "../components/BottomTabNavigator";
import HomeTab from "./tabs/Home/HomeTab";
import DashboardTab from "./tabs/Dashboard/DashboardTab";
import ProfileTab from "./tabs/Profile/ProfileTab";

const tabs = [
  { name: "Beranda", icon: "home", component: HomeTab },
  { name: "Dashboard", icon: "view-dashboard-edit-outline", component: DashboardTab },
  { name: "Profile", icon: "account", component: ProfileTab },
];
const HomeTabs = () => {
  return <BottomTabNavigator tabs={tabs} />;
};

const styles = StyleSheet.create({
});

export default HomeTabs;
