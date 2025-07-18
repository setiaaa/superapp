import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsBypass, setNotifIos } from "../../../../../store/Account";
import { getTokenValue } from "../../../../../services/session";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../../theme/ThemeContext";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DokumenPersetujuanDetail = ({ route }) => {
  // console.log({ path: path ? path : null });
  console.log({ path: path !== undefined ? path : null });
  const { theme, isDark, toggleTheme, themeMode } = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Detail Cuti",
      showBack: true,
    });
  }, [navigation]);
  const approval = route?.params;
  // const approval = route?.params || {};
  const { profile, IsBypass } = useSelector((state) => state.account);
  const { arsip, message, loading, status } = useSelector(
    (state) => state.cuti
  );
  // const { arsip } = useSelector((state) => state.cuti);
  const arsipDetail = arsip?.detail;
  const [token, setToken] = useState("");
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);
  if (!arsipDetail) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={{ marginTop: 10, color: theme.text }}>
          Memuat data detail...
        </Text>
      </View>
    );
  }

  const formatTanggal = (tanggalString) => {
    if (!tanggalString || tanggalString === "-") return "-";

    try {
      const [datePart, timePart] = tanggalString.split("T");
      const [day, monthName, year] = datePart.split(" ");

      const bulanMap = {
        Januari: 0,
        Februari: 1,
        Maret: 2,
        April: 3,
        Mei: 4,
        Juni: 5,
        Juli: 6,
        Agustus: 7,
        September: 8,
        Oktober: 9,
        November: 10,
        Desember: 11,
      };

      const bulanIndex = bulanMap[monthName];
      if (bulanIndex === undefined) return tanggalString;

      const tanggalObj = new Date(year, bulanIndex, day);
      if (isNaN(tanggalObj.getTime())) return tanggalString;

      const namaBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];

      const hari = tanggalObj.getDate().toString().padStart(2, "0");
      const bulan = namaBulan[tanggalObj.getMonth()];
      const tahun = tanggalObj.getFullYear();

      return `${hari} ${bulan} ${tahun}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return tanggalString;
    }
  };

  const getPeriodeCuti = (mulaiCuti, akhirCuti) => {
    if (!mulaiCuti || !akhirCuti) return "-";

    const tanggalMulai = formatTanggal(mulaiCuti);
    const tanggalAkhir = formatTanggal(akhirCuti);

    if (tanggalMulai === tanggalAkhir) {
      return tanggalMulai;
    }

    return `${tanggalMulai} - ${tanggalAkhir}`;
  };

  const getDurasiCuti = (mulaiCuti, akhirCuti) => {
    if (!mulaiCuti || !akhirCuti || mulaiCuti === "-" || akhirCuti === "-")
      return "-";

    try {
      const parseTanggal = (tanggalStr) => {
        const [datePart] = tanggalStr.split("T");
        const [day, monthName, year] = datePart.split(" ");

        const bulanMap = {
          Januari: 0,
          Februari: 1,
          Maret: 2,
          April: 3,
          Mei: 4,
          Juni: 5,
          Juli: 6,
          Agustus: 7,
          September: 8,
          Oktober: 9,
          November: 10,
          Desember: 11,
        };

        return new Date(year, bulanMap[monthName], day);
      };

      const tanggalMulai = parseTanggal(mulaiCuti);
      const tanggalAkhir = parseTanggal(akhirCuti);

      const diffTime = Math.abs(tanggalAkhir - tanggalMulai);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      return `${diffDays} hari`;
    } catch (error) {
      console.error("Error calculating duration:", error);
      return "-";
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const selectPDF = async () => {
    try {
      // Request permission for Android
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "Storage permission is required to select PDF files"
        );
        return;
      }

      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: "documentDirectory",
      });

      setSelectedFile(result);
      console.log("Selected PDF:", result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled PDF selection");
      } else {
        console.error("Error selecting PDF:", err);
        Alert.alert("Error", "Gagal memilih file PDF");
      }
    }
  };

  const uploadPDF = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Silakan pilih file PDF terlebih dahulu");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      // Ganti dengan endpoint API Anda
      const response = await fetch("YOUR_UPLOAD_ENDPOINT", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        Alert.alert("Success", "File PDF berhasil diupload");
        setSelectedFile(null);
      } else {
        Alert.alert("Error", "Gagal mengupload file PDF");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Terjadi kesalahan saat mengupload");
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const jenisCuti = arsipDetail?.detail_dokumen?.jenis_cuti?.nama || "-";
  const tipeHari = arsipDetail?.detail_dokumen?.jenis_cuti?.tipe_hari || "-";
  const statusDokumen =
    arsipDetail?.detail_dokumen?.dokumen?.status_dokumen?.nama || "Disetujui";
  const tipeDokumen =
    arsipDetail?.detail_dokumen?.dokumen?.jenis_dokumen || "-";

  const namapengaju = arsipDetail?.detail_dokumen?.dokumen?.nama_pengaju || "-";
  const nippengaju = arsipDetail?.detail_dokumen?.dokumen?.nip_pengaju || "-";
  const golonganpengaju =
    arsipDetail?.detail_dokumen?.dokumen?.golongan_pengaju || "-";
  const jabatanpengaju =
    arsipDetail?.detail_dokumen?.dokumen?.posisi_pengaju || "-";
  const unitkerjapengaju =
    arsipDetail?.detail_dokumen?.dokumen?.unit_kerja_pengaju || "-";

  const mulaiCuti = arsipDetail?.detail_dokumen?.dokumen?.mulai_cuti || "-";
  const akhirCuti = arsipDetail?.detail_dokumen?.dokumen?.akhir_cuti || "-";
  const alamatCuti = arsipDetail?.detail_dokumen?.dokumen?.alamat_cuti || "-";
  const phoneCuti = arsipDetail?.detail_dokumen?.dokumen?.nomor_telpon || "-";
  const alasanCuti = arsipDetail?.detail_dokumen?.dokumen?.alasan_cuti || "-";
  const kotaCuti = arsipDetail?.detail_dokumen?.dokumen?.kota || "-";

  const periodeCuti = getPeriodeCuti(mulaiCuti, akhirCuti);
  const durasiCuti = getDurasiCuti(mulaiCuti, akhirCuti);

  const approvePersone = arsipDetail?.komentar_dokumen[1]?.nama || "-";

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "disetujui":
        return "#4CAF50";
      case "ditolak":
        return "#F44336";
      case "pending":
        return "#FF9800";
      default:
        return theme.primary;
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Card */}
      <View style={[styles.profileCard, { backgroundColor: theme.card }]}>
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatarCircle,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="account"
              size={50}
              color={theme.primary}
            />
          </View>
        </View>

        <View style={styles.userInfo}>
          <Text style={[styles.username, { color: theme.text }]}>
            {namapengaju}
          </Text>
          <Text style={[styles.userNip, { color: theme.textSecondary }]}>
            NIP: {nippengaju}
          </Text>
        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="star-outline"
                size={20}
                color={theme.textSecondary}
              />
              <View style={styles.detailText}>
                <Text
                  style={[styles.detailLabel, { color: theme.textSecondary }]}
                >
                  Golongan
                </Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {golonganpengaju}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="briefcase-outline"
                size={20}
                color={theme.textSecondary}
              />
              <View style={styles.detailText}>
                <Text
                  style={[styles.detailLabel, { color: theme.textSecondary }]}
                >
                  Jabatan
                </Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {jabatanpengaju}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <MaterialCommunityIcons
                name="office-building-outline"
                size={20}
                color={theme.textSecondary}
              />
              <View style={styles.detailText}>
                <Text
                  style={[styles.detailLabel, { color: theme.textSecondary }]}
                >
                  Unit Kerja
                </Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {unitkerjapengaju}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Jenis Cuti Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="file-document-outline"
              size={24}
              color={theme.primary}
            />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Jenis Cuti
          </Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Jenis Cuti
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {jenisCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Tipe Hari
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {tipeHari}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Tipe Dokumen
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {tipeDokumen}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Status Dokumen
            </Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(statusDokumen) + "20" },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(statusDokumen) },
                ]}
              >
                {statusDokumen}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Status Cuti Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="calendar-check"
              size={24}
              color={theme.primary}
            />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Informasi Cuti
          </Text>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Periode Cuti
            </Text>
            <Text
              style={{ fontSize: 15, color: theme.text, fontWeight: "bold" }}
            >
              {periodeCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Durasi Cuti
            </Text>
            <Text
              style={{ fontSize: 15, color: theme.text, fontWeight: "bold" }}
            >
              {durasiCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Alamat Cuti
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                flex: 1,
                textAlign: "left",
                color: theme.text,
              }}
            >
              {alamatCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              No Telpon
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {phoneCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Alasan Cuti
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {alasanCuti}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>
              Kota
            </Text>
            <Text style={[styles.value, { color: theme.text }]}>
              {kotaCuti}
            </Text>
          </View>
        </View>
      </View>
      {/* Upload Pdf */}
      <View style={styles.pdfContainer}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📎</Text>
          </View>
          <Text style={styles.title}>Lampiran</Text>
        </View>
        <TouchableOpacity
          style={styles.uploadArea}
          onPress={selectPDF}
          disabled={uploading}
        ></TouchableOpacity>
      </View>

      {/* Surat Approval */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.primary + "20" },
            ]}
          >
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={theme.primary}
            />
          </View>
          <Text style={[styles.cardTitle, { color: theme.text }]}>
            Approval Cuti
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              flex: 1,
              textAlign: "right",
              color: theme.text,
            }}
          >
            {approvePersone}
          </Text>
        </View>
      </View>

      {/* Bottom padding for better scrolling */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  profileCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },

  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  userInfo: {
    alignItems: "center",
    marginBottom: 20,
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },

  userNip: {
    fontSize: 14,
    textAlign: "center",
  },

  detailsContainer: {
    marginTop: 16,
  },

  detailRow: {
    marginBottom: 16,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  detailText: {
    marginLeft: 12,
    flex: 1,
  },

  detailLabel: {
    fontSize: 12,
    marginBottom: 2,
    textTransform: "uppercase",
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 16,
    fontWeight: "500",
  },

  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    // debug element
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "red",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },

  cardContent: {
    gap: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },

  value: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },

  statusSubtitle: {
    fontSize: 14,
  },

  separator: {
    height: 1,
    marginVertical: 16,
  },

  bottomPadding: {
    height: 20,
  },

  pdfContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
    margin: 16,
  },
});

export default DokumenPersetujuanDetail;
