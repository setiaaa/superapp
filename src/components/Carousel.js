import React, { useState, useEffect, useRef } from "react"; // Tambahkan useState, useEffect, useRef
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window"); // Gunakan 'width' untuk konsistensi
const ITEM_WIDTH = screenWidth * 0.75;
const SPACING = 10;
const AUTO_PLAY_INTERVAL = 3000;

// Komponen Carousel
const NewsCard = ({ item }) => (
  <View style={styles.card}>
    {item.image && (
      <Image
        // source={{ uri: item.image }}
        source={
          typeof item.image === "string" ? { uri: item.image } : item.image
        }
        style={styles.image}
        accessibilityLabel={item.title}
      />
    )}
    <View style={styles.content}>
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {item.description}
      </Text>
    </View>
  </View>
);

// Komponen utama Carousel
const Carousel = ({ newsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const flatListRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Fungsi untuk menggulir ke index tertentu
  const scrollToIndex = (index) => {
    if (flatListRef.current && newsData && newsData.length > 0) {
      const nextIndex = index >= newsData.length ? 0 : index; // Loop ke awal
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }
  };

  // Efek untuk auto-play
  useEffect(() => {
    if (isAutoPlaying && newsData && newsData.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex =
            prevIndex + 1 >= newsData.length ? 0 : prevIndex + 1;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, AUTO_PLAY_INTERVAL);
    }
    return () => clearInterval(autoPlayRef.current); // Bersihkan interval saat unmount
  }, [isAutoPlaying, newsData]);

  // Menghentikan auto-play saat pengguna menggeser
  const handleScrollEnd = (event) => {
    if (newsData && newsData.length > 0) {
      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / (ITEM_WIDTH + SPACING));
      setActiveIndex(newIndex);
      setIsAutoPlaying(false); // Hentikan auto-play saat interaksi manual
    }
  };

  // Mengaktifkan kembali auto-play saat pengguna selesai berinteraksi
  const handleTouchEnd = () => {
    setTimeout(() => setIsAutoPlaying(true), 5000); // Mulai lagi setelah 5 detik
  };

  // Render indikator (dots)
  const renderDots = () => {
    if (!newsData || newsData.length === 0) return null;
    return (
      <View style={styles.dotsContainer}>
        {newsData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3 }]}
          />
        ))}
      </View>
    );
  };

  // Render jika ada data, jika tidak tampilkan pesan error
  if (!newsData || newsData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No news data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={newsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        renderItem={({ item }) => <NewsCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContent}
        onMomentumScrollEnd={handleScrollEnd}
        onTouchEnd={handleTouchEnd}
      />
      {renderDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  flatListContent: {
    paddingHorizontal: SPACING,
  },
  card: {
    width: ITEM_WIDTH,
    marginHorizontal: SPACING / 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginHorizontal: 4,
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Carousel;
