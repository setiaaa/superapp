import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomTabBar from "../../../components/BottomTabBar";
import HomeTab from "./tabs/PersonalTab";
import DokumenPersetujuanTab from "./tabs/DokumenPersetujuanTab";

const CutiBottomTabs = () => {
    const [activeTab, setActiveTab] = useState("dokumenpersetujuan");

    const tabs = [
        { key: "personal", label: "Personal", icon: "home" },
        { key: "dokumenpersetujuan", label: "Dokumen Persetujuan", icon: "briefcase" },
        { key: "dokumenpersonal", label: "Dokumen Personal", icon: "file" }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "personal":
                return <HomeTab />;
            case "dokumenpersetujuan":
                return <DokumenPersetujuanTab />
            case "dokumenpersonal":
                return <Text>👤 Profil Akun</Text>;
            default:
                setActiveTab(dokumenpersetujuan)
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

export default CutiBottomTabs;
