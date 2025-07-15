import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";

const ProfileCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(165)).current;

  const userData = [
    { label: "Jenis Kelamin: Laki-Laki", value: "gender" },
    { label: "Golongan: IV/b", value: "golongan" },
    {
      label: "Jabatan: KEPALA PUSAT DATA, STATISTIK, DAN INFORMASI",
      value: "jabatan",
    },
    { label: "Unit Kerja: SEKRETARIAT JENDERAL", value: "unit" },
    {
      label: "Satuan Kerja: PUSAT DATA, STATISTIK, DAN INFORMASI",
      value: "satuan",
    },
  ];

  const toggleExpand = () => {
    const initialHeight = 165;
    const expandedHeight = 350;

    Animated.timing(heightAnim, {
      toValue: isExpanded ? initialHeight : expandedHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <Animated.View style={[styles.card, { height: heightAnim }]}>
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
        }}
        style={styles.avatar}
      />
      <Pressable onPress={toggleExpand} style={styles.toggleButton}>
        <Text style={styles.toggleText}>
          {isExpanded ? "▲ Profile" : "▼ Profile"}
        </Text>
      </Pressable>

      {isExpanded && (
        <View style={styles.details}>
          {userData.map((item, index) => (
            <Text key={`${item.value}-${index}`} style={styles.detailText}>
              {item.label}
            </Text>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    overflow: "visible",
    margin: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  toggleButton: {
    padding: 8,
    marginBottom: 8,
  },
  toggleText: {
    fontSize: 14,
    color: "#2e78b7",
    fontWeight: "500",
  },
  details: {
    width: "100%",
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    marginVertical: 4,
    color: "#444",
  },
});

export default ProfileCard;
