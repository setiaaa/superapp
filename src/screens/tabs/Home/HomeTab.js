import React, { useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetApp from "../../../components/BottomSheetApp"; // Assuming you have a MoreAppsSheet component

const subApps = [
    { key: "Surat", label: "Surat", icon: "email" },
    { key: "Calender", label: "Kalender", icon: "calendar" },
    { key: "Cuti", label: "Cuti", icon: "airplane" },
    { key: "Prepandshar", label: "Prepare and Sharing", icon: "cloud" },
    { key: "Event", label: "Event Management", icon: "calendar-multiple" },
    { key: "SPPD", label: "SPPD", icon: "car-arrow-right" },
    // { key: "More", label: "Lainnya", icon: "dots-grid" },
];

const numColumns = 3;
const screenWidth = Dimensions.get("window").width - 20;
const itemSpacing = 24;
const itemSize = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const BerandaTab = () => {
    const navigation = useNavigation();
    const username = "Galang"; // ganti sesuai user stateF
    const nip = "123456789"; // ganti sesuai user state

    const sheetRef = useRef();

    const handlePressItem = (item) => {
        if (item.key === "More") {
            console.log("Membuka BottomSheet");
            sheetRef.current?.open();
        } else {
            navigation.navigate(item.key);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, { width: itemSize, height: itemSize }]}
            onPress={() => handlePressItem(item)}
        >
            <MaterialCommunityIcons
                    name={item.icon}
                    size={28}
                />
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    );
    return (
        <BottomSheetModalProvider>
            <View style={{...styles.mainWrapper, zIndex: 9999}}>
                <TouchableOpacity style={styles.greetingContainer}
                    >
                    <Text
                        style={{
                            alignSelf: "flex-end",
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        {username}
                    </Text>
                    <Text
                        style={{
                            alignSelf: "flex-end",
                            fontSize: 12,
                            fontWeight: "medium",
                        }}
                    >
                        {nip}
                    </Text>
                </TouchableOpacity>
                <View
                    style={{
                        backgroundColor: "#fff",
                        paddingBottom: 0,
                        borderRadius: 16,
                    }}
                >
                    <FlatList
                        data={
                            subApps.length > 0
                                ? subApps
                                : [
                                      {
                                          key: "empty",
                                          label: "Tidak ada aplikasi",
                                          icon: "alert-circle",
                                      },
                                  ]
                        }
                        renderItem={renderItem}
                        numColumns={numColumns}
                        keyExtractor={(item) => item.key}
                        contentContainerStyle={styles.container}
                        columnWrapperStyle={styles.row}
                    />
                    <BottomSheetApp ref={sheetRef} navigation={navigation} />
                </View>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    mainWrapper: {
        margin: 20,
        gap: 20,
        
    },
    greetingContainer: {
        gap: 4,
        borderRadius: 12,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        alignSelf: "flex-end",
    },
    container: {
        padding: itemSpacing,
        paddingBottom: 0,
    },
    row: {
        justifyContent: "space-between",
        marginBottom: itemSpacing,
    },
    item: {
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    label: {
        marginTop: 8,
        fontSize: 10,
        textAlign: "center",
        color: "#333",
    },
});

export default BerandaTab;
