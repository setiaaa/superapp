import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailDocument } from "../service/prepareandsharing";
import moment from "moment/min/moment-with-locales";

const CardList = ({ item, token }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const getDetail = (id) => {
        const params = { token, id };
        // const data = event.listsprogress.find(item => item.id === id)
        dispatch(getDetailDocument(params));
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={
                (onPress = () => {
                    getDetail(item.id);
                    navigation.navigate("DokumenDetail", {
                        id: "view",
                        item: item,
                        token: token,
                    });
                })
            }
        >
            <Text style={styles.description}>{item?.id}</Text>
            <View style={styles.cardHeader}>
                <Text style={styles.createdDate}>{item.title}</Text>
            </View>
            <Text style={styles.leaveKategori}>{item?.attachments.length}</Text>
            <Text style={styles.documentType}>
                {moment(item.created_at).locale("id").format("DD MMMM yyyy")}
            </Text>
            <Text style={styles.documentType}>
                {moment(item.updated_at).locale("id").format("DD MMMM yyyy")}
            </Text>
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
