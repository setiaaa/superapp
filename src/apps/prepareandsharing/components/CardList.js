import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDocument } from "../service/prepareandsharing";
import moment from "moment/min/moment-with-locales";
import {
    setDokumentlists,
    setEdit,
    setLoadMore,
    setRating,
} from "../store/prepareandsharing";
import DokumenDetail from "../screens/tabs/Dokumen/DokumenDetail";
import { useTheme } from "../../../theme/ThemeContext";

const CardList = ({ item, token, tipe }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDocument(params));
    };

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.card }]}
            onPress={() => {
                getDetail(item.id);

                if (tipe === "Draft") {
                    navigation.navigate("BerbagiDokumen", {
                        data: item,
                        type: "edit",
                    });
                } else if (tipe === "revision") {
                    dispatch(setEdit("Edit")); // untuk bisa edit dari detail
                    navigation.navigate("DokumenDetail", {
                        tipe: "revision",
                    });
                } else if (tipe === "Published" || tipe === "review") {
                    navigation.navigate("DokumenDetail", {
                        tipe: tipe, // untuk ditangani oleh DokumenDetail
                    });
                }
            }}
        >
            {/* <Text style={styles.description}>{item?.id}</Text> */}
            <View style={styles.cardHeader}>
                <Text style={[styles.createdDate, { color: theme.text }]}>
                    {item.title}
                </Text>
            </View>
            <Text style={[styles.leaveKategori, { color: theme.text }]}>
                {item?.attachments.length}
            </Text>
            <Text style={[styles.documentType, { color: theme.textSecondary }]}>
                {moment(item.created_at).locale("id").format("DD MMMM yyyy")}
            </Text>
            <Text style={[styles.documentType, { color: theme.textSecondary }]}>
                {moment(item.updated_at).locale("id").format("DD MMMM yyyy")}
            </Text>
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
        color: "#555",
    },
    documentType: {
        fontSize: 13,
    },
});

export default CardList;
