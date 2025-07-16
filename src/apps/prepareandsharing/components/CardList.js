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
import DokumenDetail from "../screens/tabs/DokumenDetail";
import { useTheme } from "../../../theme/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const CardList = ({ item, token, tipe, tab }) => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDocument(params));
    };

    return (
        <TouchableOpacity
            style={[
                styles.card,
                { backgroundColor: theme.card, shadowColor: theme.shadow },
            ]}
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
                        tipe: tipe,
                    });
                    if (tab === "TinjauanTab") {
                        navigation.navigate("DokumenDetail", {
                            tipe: tipe,
                            tab: tab,
                        });
                    }
                } else {
                    console.log("tes param");
                    navigation.navigate("DokumenDetail", {
                        tipe: tipe,
                    });
                }
            }}
        >
            {/* <Text style={styles.description}>{item?.id}</Text> */}
            {/* <View style={styles.cardHeader}>
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
            </Text> */}

            <Text style={[styles.title, { color: theme.text }]}>
                {item.title}
            </Text>

            <View style={styles.row}>
                <Ionicons
                    name="document-attach-outline"
                    size={16}
                    color="#666"
                />
                <Text style={[styles.text, { color: theme.text }]}>
                    Lampiran: {item?.attachments.length}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={theme.icon}
                />
                <Text style={[styles.text, { color: theme.textSecondary }]}>
                    Dibuat:{" "}
                    {moment(item.created_at)
                        .locale("id")
                        .format("DD MMMM yyyy")}
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="refresh-outline" size={16} color={theme.icon} />
                <Text style={[styles.text, { color: theme.textSecondary }]}>
                    Diperbarui:{" "}
                    {moment(item.updated_at)
                        .locale("id")
                        .format("DD MMMM yyyy")}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        gap: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
    },
    text: {
        marginLeft: 6,
        fontSize: 14,
    },
});

export default CardList;
