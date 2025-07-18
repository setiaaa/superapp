import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const numColumns = 3; // Mengubah menjadi 3 kolom seperti di gambar
const screenWidth = Dimensions.get("window").width - 40; // Menyesuaikan padding horizontal
const itemSpacing = 20;
const itemSize = (screenWidth - itemSpacing * (numColumns + 1)) / numColumns;

const FormOptions = [
  { key: "Tahunan", label: "Cuti Tahunan", icon: "calendar" },
  { key: "Besar", label: "Cuti Besar", icon: "calendar" },
  { key: "Sakit", label: "Cuti Sakit", icon: "calendar" },
  { key: "AlasanPenting", label: "Cuti Alasan Penting", icon: "calendar" },
  {
    key: "DiluarTanggungan",
    label: "Cuti Diluar Tanggungan Negara",
    icon: "calendar",
  },
];

const FormPengajuanCutiLayar = ({ navigation }) => {
  // Nama komponen diubah
  const handlePressItem = (item) => {
    // Logika navigasi Anda
    navigation.navigate(item.key);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item} // Ukuran sudah di handle di style
      onPress={() => handlePressItem(item)}
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons name={item.icon} size={28} color="white" />
      </View>
      <Text style={styles.label}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headerTitle}>Form Pengajuan Cuti</Text>
      <FlatList
        data={FormOptions}
        renderItem={renderItem}
        numColumns={numColumns}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: "#ffff", // Latar belakang abu-abu muda
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  row: {
    justifyContent: "space-around",
    marginBottom: itemSpacing,
  },
  item: {
    width: itemSize,
    height: itemSize + 20,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: itemSpacing / 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
});

export default FormPengajuanCutiLayar;
