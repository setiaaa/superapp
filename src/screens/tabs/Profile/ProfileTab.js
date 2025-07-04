import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
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
import { useNavigation } from "@react-navigation/native";

const ProfileTab = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector((state) => state.user);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil</Text>
            <Text style={styles.description}>
                {/* Nama: Galang// {user.name} */}
                Nama: Galang
            </Text>
            <Text style={styles.description}>
                {/* NIP: {user.nip} */}
                NIP: 123456789
            </Text>
            <CustomButton
                title="Logout"
                onPress={() => {
                    Alert.alert("Apakah Anda yakin ingin keluar?", [
                        {
                            text: "Batal",
                            onPress: () => console.log("Batal"),
                            style: "cancel",
                        },
                        {
                            text: "Keluar",
                            onPress: () => {
                                removeTokenValue();
                                dispatch(setLogout());
                                dispatch(setProfile({}));
                                // dispatch(setProfileKores({}));
                                // dispatch(setCheckProdukHukum(false));
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }],
                                });
                            },
                        },
                    ]);
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
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#666",
    },
});

export default ProfileTab;
