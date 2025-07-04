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
import { setLogout } from "../../../auth/store/store";
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

const ProfileTab = () => {
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
    console.log("Profile", profile);

    return (
        <View style={styles.container}>
            <View style={
                styles.cardProfile
            }>
                <Image
                    style={{ 
                        width: 61
                     }}
                    source={{ url: BASE_URL + profile.avatar_signed }}
                />
                {console.log(BASE_URL + profile.avatar_signed)}
            <Text style={styles.name}>{profile.nama}</Text>
            <Text style={styles.nip}>{profile.nama_jabatan}</Text>
            </View>
            <CustomButton
                title="Logout"
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
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    cardProfile: {
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 16,
        // backgroundColor: "#e0e0e0",
        borderRadius: 12,
        padding: 16,
        backgroundColor: "#fff",
    },
    name: {
        fontSize: 14,
        fontWeight: "bold",
        marginTop: 8,
    },
    nip: {
        fontSize: 12,
        color: "#666",
        // backgroundColor
    },
});

export default ProfileTab;
