import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailArsipCuti } from "../service/cuti";
import { useTheme } from "../../../theme/ThemeContext"; // Adjust the import path as necessary

const CardList = ({ item, token }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailArsipCuti(params));
    };

    const { arsip, message, loading, status } = useSelector(
        (state) => state.cuti
    );

    return (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: theme.card }, // 🎨 gunakan warna dari tema
            ]}
            onPress={
                (onPress = () => {
                    getDetail(item.id);
                    navigation.navigate("DokumenPersetujuanDetail", {
                        id: "view",
                        item: item,
                        token: token,
                    });
                })
            }
        >
            <Text style={[styles.description, { color: theme.textSecondary }]}>
                {item?.id}
            </Text>
            <View style={styles.cardHeader}>
                <Text style={[styles.createdDate, { color: theme.text }]}>
                    {item.tanggal_pembuatan.split("T")[0]}
                </Text>
                <Text style={[styles.createdDate, { color: theme.text }]}>
                    {item.tanggal_pembuatan.split("T")[1]}
                </Text>
            </View>
            <Text style={[styles.leaveKategori, { color: theme.text }]}>
                {item?.jenis_cuti}
            </Text>
            <Text style={[styles.documentType, { color: theme.text }]}>
                {item?.tipe_dokumen}
            </Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text style={{ color: theme.text }}>
                    {item.mulai_cuti.split("T")[0]}
                </Text>
                <Text style={{ color: theme.text }}>
                    {item.akhir_cuti.split("T")[0]}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        gap: 8,
        marginBottom: 12,
    },
    cardHeader: {
        fontSize: 16,
        fontWeight: "600",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    createdDate: {
        fontSize: 16,
        fontWeight: "600",
    },
    description: {
        fontSize: 14,
    },
});

export default CardList;
