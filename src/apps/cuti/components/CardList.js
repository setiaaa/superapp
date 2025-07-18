import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getDetailArsipCuti } from "../service/cuti";
import { useTheme } from "../../../theme/ThemeContext"; // Adjust the import path as necessary

const CardList = ({ item, token, selectedFilter }) => {
  const { theme, isDark, toggleTheme, themeMode } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailArsipCuti(params));
  };

  const goToDetail = () => {
    const params = { token, id: item.id };
    dispatch(getDetailArsipCuti(params));
    navigation.navigate("DokumenPersetujuanDetail", {
      id: "view",
      item: item,
      token: token,
    });
  };

  const handleCancel = () => {
    // --- LOGIKA UNTUK MEMBATALKAN CUTI DITARUH DI SINI ---
    console.log("Tombol PEMBATALAN diklik untuk ID:", item.id);
    alert(`Fungsi pembatalan untuk Cuti ID ${item.id} dipanggil!`);
  };

  //
  const isApprovedFilterSelected = selectedFilter === "Completed";

  const { arsip, message, loading, status } = useSelector(
    (state) => state.cuti
  );

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <TouchableOpacity onPress={goToDetail}>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {item?.id}
        </Text>
        <View style={styles.cardHeader}>
          <Text style={[styles.createdDate, { color: theme.text }]}>
            {item?.tanggal_pembuatan.split("T")[0]}
          </Text>
          <Text style={[styles.createdDate, { color: theme.text }]}>
            {item?.tanggal_pembuatan.split("T")[1]}
          </Text>
        </View>
        <Text style={[styles.leaveKategori, { color: theme.text }]}>
          {item?.jenis_cuti}
        </Text>
        <Text style={[styles.documentType, { color: theme.text }]}>
          {item?.tipe_dokumen}
        </Text>
        <View style={styles.dateRangeContainer}>
          <Text style={{ color: theme.text }}>
            {item?.mulai_cuti.split("T")[0]}
          </Text>
          <Text style={{ color: theme.text }}>
            {item?.akhir_cuti.split("T")[0]}
          </Text>
        </View>
      </TouchableOpacity>

      {/* BAGIAN 2: Tombol pembatalan yang terpisah */}
      {isApprovedFilterSelected && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel} // Menggunakan fungsi handleCancel
        >
          <Text style={styles.cancelButtonText}>Pembatalan</Text>
        </TouchableOpacity>
      )}
    </View>
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
  cancelButton: {
    backgroundColor: "#FF1717",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CardList;
