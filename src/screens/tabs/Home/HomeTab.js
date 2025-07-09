import React, { useRef, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetApp from "../../../components/BottomSheetApp"; // Assuming you have a MoreAppsSheet component
import { getProfileMe } from "../../../services/api";
import { getTokenValue } from "../../../services/session";
import { useDispatch, useSelector } from "react-redux";

const subApps = [
    { key: "Surat", label: "Surat", icon: "email" },
    { key: "Calender", label: "Kalender", icon: "calendar" },
    { key: "Cuti", label: "Cuti", icon: "airplane" },
    { key: "PrepareAndSharing", label: "Prepare and Sharing", icon: "cloud" },
    { key: "Event", label: "Event Management", icon: "calendar-multiple" },
    { key: "SPPD", label: "SPPD", icon: "car-arrow-right" },
];
const itemSize = 100; // ✅ Tetap, tidak tergantung lebar layar
const spacing = 16;

const BerandaTab = () => {
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
            console.log("Token value:", val);
        });
    }, []);

    useEffect(() => {
        if (token !== "") {
            dispatch(getProfileMe({ token: token }));
        }
    }, [token]);

    const { profile } = useSelector((state) => state.account);
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.key)}>
            <MaterialCommunityIcons name={item.icon} size={26} color="#333" />
            <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.mainWrapper}>
            <View style={styles.greetingContainer}>
                <Text style={styles.username}>Galang</Text>
                <Text style={styles.nip}>123456789</Text>
            </View>
            <FlatList
                data={subApps}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={Math.floor(
                    Dimensions.get("window").width / (itemSize + spacing)
                )} // ✅ jumlah kolom fleksibel
                contentContainerStyle={styles.container}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

export default BerandaTab;

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
    username: {
        fontSize: 16,
        fontWeight: "bold",
    },
    nip: {
        fontSize: 12,
        fontWeight: "500",
    },
    container: {
        // paddingHorizontal: spacing,
        
        alignItems: "center",
        backgroundColor: "white",
    },
    row: {
        justifyContent: "space-between",
        gap: spacing,

    },
    item: {
        width: itemSize,
        height: itemSize,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#fff",
        // marginBottom: spacing,
        marginVertical: spacing / 2,
    },
    label: {
        marginTop: 6,
        fontSize: 12,
        textAlign: "center",
        color: "#333",
    },
});
