import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CardList = ( {item} ) => {
  // console.log(item);
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{item?.tanggal_pembuatan}</Text>
            {/* <Text style={styles.title}>{item?.jenis_cuti}</Text> */}
            <Text style={styles.description}>{item?.jenis_cuti}</Text>
            <Text style={styles.description}>{item?.jenis_cuti}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        // shadowColor: '#000',
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 3,
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        // marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: "#555",
    },
});

export default CardList;
