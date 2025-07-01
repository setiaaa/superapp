// src/screens/partials/HomeBottomTabs.js
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomTabBar from "../components/BottomTabBar";
import BerandaTab from "./partials/BerandaTab";

const HomeBottomTabs = () => {
    const [activeTab, setActiveTab] = useState("home");

    const tabs = [
        { key: "home", label: "Beranda", icon: "home" },
        { key: "dashboard", label: "Dasbor", icon: "calendar-clock" },
        { key: "account", label: "Akun", icon: "account" }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "home":
                return <BerandaTab />;
            case "dashboard":
                return <Text>⏱️ Cek Absensi Anda</Text>;
            case "account":
                return <Text>👤 Profil Akun</Text>;
            case "settings":
                return <Text>⚙️ Pengaturan Aplikasi</Text>;
            default:
                return <BerandaTab />;
        }
    };

    return (
        <View style={{ flex: 1}}>
            <View style={{ flex: 1, padding: 0 }}>
                {renderTabContent()}
            </View>

            {/* Floating tab di luar konten */}
            <BottomTabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabPress={setActiveTab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
});

export default HomeBottomTabs;
