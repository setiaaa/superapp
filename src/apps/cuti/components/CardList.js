import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailArsipCuti } from "../api";

const CardList = ({ item, token } ) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getDetail = (id) => {
        const params = { token, id };
        // console.log(id)
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailArsipCuti(params));
    };
    
    const { arsip, message, loading, status } = useSelector(
        (state) => state.cuti
    );
    // console.log("arsip", arsip);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={
                (onPress = () => {
                    getDetail(item.id);
                    // console.log("item", item);
                    navigation.navigate("DokumenPersetujuanDetail", {
                        id: "view",
                        item: item,
                        token: token,
                    });
                })
            }
        >
            <Text style={styles.description}>{item?.id}</Text>
            <View style={styles.cardHeader}>
                <Text style={styles.createdDate}>
                    {item.tanggal_pembuatan.split("T")[0]}
                </Text>
                <Text style={styles.createdDate}>
                    {item.tanggal_pembuatan.split("T")[1]}
                </Text>
            </View>
            <Text style={styles.leaveKategori}>{item?.jenis_cuti}</Text>
            <Text style={styles.documentType}>{item?.tipe_dokumen}</Text>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Text>{item.mulai_cuti.split("T")[0]}</Text>
                <Text>{item.akhir_cuti.split("T")[0]}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
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
        color: "#555",
    },
});

export default CardList;
