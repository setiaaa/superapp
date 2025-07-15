import React from "react";
import { View, Text, StyleSheet } from "react-native";

const KuotaCuti = ({
  Jenis,
  Periode,
  Mulai_Berlaku,
  Akhir_Berlaku,
  Kuota_Cuti,
  Sisa_Kuota,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Bagian kiri: Detail Cuti */}
      <View style={styles.leftContent}>
        <Text style={styles.jenisText}>Jenis : {Jenis}</Text>
        {/* Tampilkan Periode hanya jika ada */}
        {Periode && <Text style={styles.detailText}>Periode: {Periode}</Text>}
        <Text style={styles.detailText}>Mulai Berlaku: {Mulai_Berlaku}</Text>
        <Text style={styles.detailText}>Akhir Berlaku: {Akhir_Berlaku}</Text>
      </View>

      {/* Bagian kanan: Kuota Cuti dan Sisa Kuota */}
      <View style={styles.rightContent}>
        {/* Bentuk gelombang di latar belakang */}
        <View style={styles.waveBackground} />

        <View style={styles.quotaItem}>
          <Text style={styles.quotaLabel}>Kuota Cuti</Text>
          <Text style={styles.quotaValue}>{Kuota_Cuti}</Text>
        </View>
        <View style={styles.quotaItem}>
          <Text style={styles.quotaLabel}>Sisa Kuota</Text>
          <Text style={styles.quotaValue}>{Sisa_Kuota}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF", // Latar belakang putih
    borderRadius: 12,
    marginVertical: 8,
    marginHorizontal: 20, // Memberi sedikit margin dari sisi layar
    padding: 16,
    flexDirection: "row", // Mengatur konten dalam baris
    justifyContent: "space-between", // Memisahkan konten kiri dan kanan
    alignItems: "center",
    elevation: 3, // Bayangan untuk efek kartu di Android
    shadowColor: "#000", // Bayangan untuk efek kartu di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden", // Penting untuk memastikan waveBackground tidak keluar dari batas
  },
  leftContent: {
    flex: 2, // Mengambil lebih banyak ruang di sisi kiri
    paddingRight: 10,
  },
  jenisText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
  },
  rightContent: {
    flex: 1, // Mengambil lebih sedikit ruang di sisi kanan
    alignItems: "flex-end", // Rata kanan
    justifyContent: "center",
    position: "relative", // Untuk menempatkan waveBackground
  },
  waveBackground: {
    position: "absolute",
    right: -30, // Sesuaikan posisi horizontal
    top: "50%",
    transform: [{ translateY: -50 }], // Pusatkan secara vertikal
    width: 100, // Lebar gelombang
    height: 100, // Tinggi gelombang
    borderRadius: 50, // Membuat bentuk lingkaran untuk gelombang
    backgroundColor: "#F0F0F0", // Warna abu-abu muda untuk gelombang
    opacity: 0.7, // Sedikit transparan
    // Anda bisa menggunakan SVG atau gambar untuk bentuk gelombang yang lebih kompleks
    // Untuk kesederhanaan, ini adalah lingkaran semi-transparan
  },
  quotaItem: {
    alignItems: "center",
    marginBottom: 8,
    zIndex: 1, // Pastikan teks kuota di atas waveBackground
  },
  quotaLabel: {
    fontSize: 12,
    color: "#666666",
  },
  quotaValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
});

export default KuotaCuti;
