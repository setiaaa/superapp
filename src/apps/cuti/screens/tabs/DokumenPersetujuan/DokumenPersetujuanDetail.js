import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { setIsBypass, setNotifIos } from "../../../../../store/Account";
import { getTokenValue } from "../../../../../services/session";

const DokumenPersetujuanDetail = ({ route }) => {
    const approval = route.params;
    const { profile, IsBypass } = useSelector((state) => state.account);
    const { arsip, message, loading, status } = useSelector(
        (state) => state.cuti
    );

    const arsipDetail = arsip.detail;

    console.log(arsip.detail.detail_dokumen?.dokumen?.id);

    const [token, setToken] = useState("");

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Jenis Cuti</Text>
                <Text>{arsipDetail?.detail_dokumen?.jenis_cuti?.nama}</Text>
                <Text>{arsipDetail?.detail_dokumen?.jenis_cuti?.tipe_hari}</Text>  
                <Text>{arsipDetail?.detail_dokumen?.dokumen?.jenis_dokumen}</Text>  
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        gap: 8,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
});

export default DokumenPersetujuanDetail;
