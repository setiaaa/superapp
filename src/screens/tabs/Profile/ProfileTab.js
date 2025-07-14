import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../components/CustomButton"; // Adjust the import path as necessary
import {
    getMenuLite,
    getMenuType,
    getTokenValue,
    //   removeMenuLite,
    //   removePushNotif,
    removeTokenValue,
    setMenuLite,
    setMenuType,
} from "../../../services/session";
import { setLogout } from "../../../auth/store/login";
import {
    setNotifIos,
    setProfile,
    setResponReset,
    setTypeMenu,
} from "../../../store/Account";
import { setProfile as setProfileKores } from "../../../store/profile"; // Adjust the import path as necessary
import { useNavigation } from "@react-navigation/native";
import { config } from "../../../services/api"; // Adjust the import path as necessary
import { Config } from "../../../services/config"; // Adjust the import path as necessary
import { useTheme } from "../../../theme/ThemeContext";

const ProfileTab = () => {
    const { isDark, toggleTheme, theme } = useTheme(); // Assuming you have a useTheme hook for theming
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [token, setToken] = useState(""); // Initialize token state
    const BASE_URL = Config.base_url + "bridge";
    const { profile, linimasa, loading, responReset } = useSelector(
        (state) => state.account
    );

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View
                style={[styles.cardProfile, { backgroundColor: theme.surface }]}
            >
                <Image
                    style={{
                        width: 61,
                    }}
                    source={{ url: BASE_URL + profile.avatar_signed }}
                />
                <Text style={[styles.name, { color: theme.text }]}>
                    {profile.nama}
                </Text>
                <Text style={[styles.nip, { color: theme.textSecondary }]}>
                    {profile.nama_jabatan}
                </Text>
            </View>
            {/* <CustomButton title="Tema" onPress={toggleTheme} /> */}
            <CustomButton title="Tema" onPress={() => {
                navigation.navigate("Tema");
            }}/>

            <CustomButton
                title="Logout"
                icon="logout"
                color={theme.error} // Tomato color for logout button
                onPress={() => {
                    dispatch(setLogout());
                    removeTokenValue();
                    dispatch(setProfile({}));
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                    });
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
    cardProfile: {
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 12,
        padding: 16,
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 8,
    },
    nip: {
        fontSize: 12,
    },
});

export default ProfileTab;
