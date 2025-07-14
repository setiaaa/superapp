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
import { useTheme } from "../../../theme/ThemeContext";

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
    const { theme, isDark, toggleTheme, themeMode  } = useTheme();
    const [token, setToken] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        if (token !== "") {
            dispatch(getProfileMe({ token: token }));
        }
    }, [token]);

    const { profile } = useSelector((state) => state.account);
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.item,
                { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
            onPress={() => navigation.navigate(item.key)}
        >
            <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color={theme.icon}
            />
            <Text style={[styles.label, { color: theme.text }]}>
                {item.label}
            </Text>
        </TouchableOpacity>
    );
    // saya ingin cek state tema saat ini

    return (
        <View style={[styles.surface, { backgroundColor: theme.background }]}>
            <View
                style={[
                    styles.greetingContainer,
                    { backgroundColor: theme.surface },
                ]}
            >
                <Text style={[styles.username, { color: theme.text }]}>
                    {profile?.nama || "Selamat Datang"}
                </Text>
                <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[styles.position, { color: theme.text }]}
                >
                    {profile?.nama_jabatan || "-"}
                </Text>
            </View>
            <FlatList
                data={subApps}
                renderItem={renderItem}
                keyExtractor={(item) => item.key}
                numColumns={Math.floor(
                    Dimensions.get("window").width / (itemSize + spacing)
                )}
                contentContainerStyle={[
                    styles.container,
                    { backgroundColor: theme.surface },
                ]}
                // columnWrapperStyle={styles.row}
            />
        </View>
    );
};

export default BerandaTab;

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    greetingContainer: {
        gap: 4,
        borderRadius: 12,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignSelf: "flex-end",
        maxHeight: 56,
        // height: 56,
    },
    username: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
    },
    position: {
        fontSize: 8,
        fontWeight: "500",
        textAlign: "right",
        maxWidth: "50%",
    },
    container: {
        borderRadius: 12,
        alignItems: "center",
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
