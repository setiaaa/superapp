import React, {
    useRef,
    useMemo,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const numColumns = 4;
const screenWidth = Dimensions.get("window").width - 20;
const itemSpacing = 20;
const itemSize = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const allSubApps = [
    { key: "Surat", label: "Surat", icon: "email" },
    { key: "Calender", label: "Kalender", icon: "calendar" },
    { key: "CutiApp", label: "Cuti", icon: "airplane" },
    { key: "DigitalSignApp", label: "DigiSign", icon: "pen" },
    { key: "DriveApp", label: "Drive", icon: "cloud" },
    { key: "KepegawaianApp", label: "EPegawai", icon: "account-group" },
    { key: "SPPD", label: "SPPD", icon: "car-arrow-right" },
];

const BottomSheetApp = forwardRef(({ navigation }, ref) => {
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ["50%"], []);

    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRef.current?.present(),
        close: () => bottomSheetRef.current?.dismiss(),
    }));

    const handlePressItem = useCallback((item) => {
        bottomSheetRef.current?.dismiss();

        // Beri delay sedikit agar sheet sempat ditutup sebelum navigasi
        setTimeout(() => {
            navigation.navigate(item.key);
        }, 300); // atau 200ms juga cukup
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.item, { width: itemSize, height: itemSize }]}
            onPress={() => handlePressItem(item)}
        >
            <View style={styles.iconWrapper}>
                <MaterialCommunityIcons name={item.icon} size={28} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: "white" }}
            style={{
                position: "absolute", // Position it absolutely
                zIndex: 1000, // Ensure it appears above other components
            }}
        >
            <View
                style={{
                    backgroundColor: "#fff",
                    paddingBottom: 0,
                    borderRadius: 16,
                }}
            >
                <FlatList
                    data={
                        allSubApps.length > 0
                            ? allSubApps
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
            </View>
        </BottomSheetModal>
    );
});

export default BottomSheetApp;

const styles = StyleSheet.create({
    container: {
        padding: itemSpacing,
        paddingBottom: 0,
        zIndex: 10,
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
