import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Search } from "../../../../../components/Search";
import BadgeFilter from "../../../../../components/BadgeFilter";
import ProfileCard from "../../../../../apps/cuti/components/CardCuti";
import FormCuti from "../../../../../apps/cuti/components/FormCuti";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import KuotaCuti from "../../../components/KuotaCuti";
import StatusDokumencuti from "../../../components/StatusDokumenCuti";
import StatusCuti from "../../../components/StatusDokumenCuti";

const PersonalTab = ({ navigation }) => {
  const formCutiRef = useRef(null);

  const openFormCuti = () => {
    formCutiRef.current?.open();
  };

  // Data untuk komponen KuotaCuti
  const cutiData = [
    {
      Jenis: "Cuti Tahunan",
      Periode: "N-2",
      Mulai_Berlaku: "01 Januari 2023",
      Akhir_Berlaku: "31 Desember 2025",
      Kuota_Cuti: "6",
      Sisa_Kuota: "6",
    },
    {
      Jenis: "Cuti Tahunan",
      Periode: "N-1",
      Mulai_Berlaku: "01 Desember 2023",
      Akhir_Berlaku: "31 Desember 2026",
      Kuota_Cuti: "6",
      Sisa_Kuota: "6",
    },
    {
      Jenis: "Cuti Tahunan",
      Periode: "N",
      Mulai_Berlaku: "01 Desember 2024",
      Akhir_Berlaku: "31 Desember 2027",
      Kuota_Cuti: "12",
      Sisa_Kuota: "12",
    },
  ];

  // Render item untuk FlatList Kuota Cuti
  const renderKuotaCutiItem = ({ item }) => (
    <KuotaCuti
      Jenis={item.Jenis}
      Periode={item.Periode}
      Mulai_Berlaku={item.Mulai_Berlaku}
      Akhir_Berlaku={item.Akhir_Berlaku}
      Kuota_Cuti={item.Kuota_Cuti}
      Sisa_Kuota={item.Sisa_Kuota}
    />
  );

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <ProfileCard />
      <FormCuti ref={formCutiRef} navigation={navigation} />
      <StatusCuti />
      <Text style={styles.sectionTitle}>Kuota Cuti</Text>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <FlatList
        style={styles.container}
        data={cutiData}
        renderItem={renderKuotaCutiItem}
        keyExtractor={(item, index) => `${item.Jenis}-${item.Periode}-${index}`}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.flatListContentContainer}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  flatListContentContainer: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    backgroundColor: "#F8FAFC",
  },
  headerContent: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#F8FAFC",
  },
  text: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
    gap: 16,
  },
  counterBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 8,
    fontWeight: "600",
  },
  count: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6D28D9",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#1F2937",
  },
});

export default PersonalTab;
