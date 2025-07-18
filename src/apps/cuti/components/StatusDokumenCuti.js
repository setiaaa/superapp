import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// --- Konfigurasi Grid ---
const numColumns = 2;
const screenWidth = Dimensions.get("window").width;
const containerPadding = 20;
const itemSpacing = 40;

// Kalkulasi ukuran item
const totalSpacing = itemSpacing * (numColumns - 1) + containerPadding * 3;
const itemWidth = (screenWidth - totalSpacing) / numColumns;
const itemHeight = itemWidth * 1.05; // Membuat item sedikit lebih tinggi dari lebarnya

const FormOptions = [
  {
    key: "Draft",
    label: "Draft",
    icon: "file-document-outline",
    color: "#8A8A8A",
  },
  {
    key: "Sedang Proses",
    label: "Sedang\nProses",
    icon: "archive-outline",
    color: "#F97316",
  },
  {
    key: "Dokumen Disetujui",
    label: "Dokumen\nDisetujui",
    icon: "check-all",
    color: "#22C55E",
  },
  {
    key: "Dokumen Tidak Disetujui",
    label: "Dokumen\nTidak Disetujui",
    icon: "close-circle-outline",
    color: "#EF4444",
  },
];

const StatusCuti = () => {
  const handlePressItem = (item) => {
    console.log("Item yang ditekan:", item.label);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        {
          width: itemWidth,
          height: itemHeight,
          backgroundColor: item.color,
        },
      ]}
      onPress={() => handlePressItem(item)}
    >
      <MaterialCommunityIcons name={item.icon} size={40} color="#FFFFFF" />
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status Dokumen Cuti</Text>
      <FlatList
        data={FormOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: containerPadding,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  item: {
    borderRadius: 12,
    padding: 12,
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginBottom: itemSpacing,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    // Teks di bawah ikon
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default StatusCuti;
