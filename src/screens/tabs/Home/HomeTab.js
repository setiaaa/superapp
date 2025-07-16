import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomSheet, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomSheetApp from "../../../components/BottomSheetApp"; // Assuming you have a MoreAppsSheet component
import { getProfileMe } from "../../../services/api";
import { getTokenValue } from "../../../services/session";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../theme/ThemeContext";
// komponen Carousel
import Carousel from "../../../components/Carousel";
// Dummy data
const dummyData = [
  {
    title: "test",
    description: "test",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2021/06/28/Image-photo-icon-Graphics-13989898-1-1-580x386.jpg",
  },
  {
    title: "test",
    description: "test",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2021/06/28/Image-photo-icon-Graphics-13989898-1-1-580x386.jpg",
  },
  {
    title: "test",
    description: "test",
    image:
      "https://www.creativefabrica.com/wp-content/uploads/2021/06/28/Image-photo-icon-Graphics-13989898-1-1-580x386.jpg",
  },
];

const subApps = [
  { key: "Surat", label: "Surat", icon: "email" },
  { key: "Calender", label: "Kalender", icon: "calendar" },
  { key: "Cuti", label: "Cuti", icon: "airplane" },
  { key: "PrepareAndSharing", label: "Prepare and Sharing", icon: "cloud" },
  { key: "Event", label: "Event Management", icon: "calendar-multiple" },
  { key: "SPPD", label: "SPPD", icon: "car-arrow-right" },
];
const itemSize = 100;
const spacing = 16;

const BerandaTab = () => {
    const { theme, isDark, toggleTheme, themeMode  } = useTheme();
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // Carousel
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [news, setNews] = useState(dummyData);

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

  useEffect(() => {
    if (token !== "") {
      dispatch(getProfileMe({ token: token }));
    }
  }, [token]);

  const { profile } = useSelector((state) => state.account);
  const renderItem = ({ item }) => (
    <TouchableOpacity
           
      style={[
                styles.item,
                { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
           
      onPress={() => navigation.navigate(item.key)}
        
    >
      <MaterialCommunityIcons
                name={item.icon}
                size={26}
                color={theme.icon}
            />
      <Text style={[styles.label, { color: theme.text }]}>
                {item.label}
            </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.surface, { backgroundColor: theme.background }]}>
      <View
                style={[
                    styles.greetingContainer,
                    { backgroundColor: theme.surface },
                ]}
            >
        <Text style={[styles.username, { color: theme.text }]}>
                    {profile?.nama || "Selamat Datang"}
                </Text>
        <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={[styles.position, { color: theme.text }]}
                >
                    {profile?.nama_jabatan || "-"}
                </Text>
      </View>
      <View style={styles.carouselWrapper}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <Carousel newsData={news} />
        )}
      </View>

      <FlatList
        data={subApps}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        numColumns={Math.floor(
          Dimensions.get("window").width / (itemSize + spacing)
        )}
        contentContainerStyle={[
                    styles.container,
                    { backgroundColor: theme.surface },
                ]}
      />
    </View>
  );
};

export default BerandaTab;

const styles = StyleSheet.create({
    surface: {
        flex: 1,
        padding: 20,
        gap: 20,
    },
    carouselWrapper: {
    height: 250,
    width: "100%",
  },
    greetingContainer: {
        gap: 4,
        borderRadius: 12,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: 16,
        alignSelf: "flex-end",
        maxHeight: 56,
    },
    username: {
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "right",
    },
    position: {
        fontSize: 8,
        fontWeight: "500",
        textAlign: "right",
        maxWidth: "50%",
    },
    container: {
        borderRadius: 12,
        alignItems: "center",
    },
    row: {
        justifyContent: "space-between",
        gap: spacing,
    },
    item: {
        width: itemSize,
        height: itemSize,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        marginVertical: spacing / 2,
    },
    label: {
        marginTop: 6,
        fontSize: 12,
        textAlign: "center",
        color: "#333",
    },
});
