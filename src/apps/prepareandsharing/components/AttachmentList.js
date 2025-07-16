import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Alert,
    ActivityIndicator,
    Modal,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as WebBrowser from "expo-web-browser";
import { useTheme } from "../../../theme/ThemeContext"; // Adjust the import path as necessary

const iconMap = {
    pdf: require("../../../../assets/attachments/pdf.png"),
    doc: require("../../../../assets/attachments/doc.png"),
    docx: require("../../../../assets/attachments/doc.png"),
    xls: require("../../../../assets/attachments/sheet.png"),
    xlsx: require("../../../../assets/attachments/sheet.png"),
    ppt: require("../../../../assets/attachments/slide.png"),
    pptx: require("../../../../assets/attachments/slide.png"),
    jpg: null,
    jpeg: null,
    png: null,
    // default: require("../../../../../../assets/attachments/default.png"),
};

const AttachmentList = ({ attachments = [] }) => {
    const { theme, isDark, toggleTheme, themeMode  } = useTheme();
    const [loading, setLoading] = useState(false);

    const handleDownload = async (url) => {
        try {
            if (!url) throw new Error("URL tidak tersedia");

            setLoading(true);

            const fileName = url.split("/").pop();
            const downloadResumable = FileSystem.createDownloadResumable(
                url,
                FileSystem.documentDirectory + fileName
            );

            const { uri } = await downloadResumable.downloadAsync();

            if (Platform.OS === "ios" || Platform.OS === "android") {
                await Sharing.shareAsync(uri);
            } else {
                await WebBrowser.openBrowserAsync(url);
            }
        } catch (error) {
            Alert.alert(
                "Gagal Mengunduh",
                "Terjadi kesalahan saat mengunduh file. Silakan coba lagi.",
                [{ text: "OK" }]
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ maxHeight: "100%" }}
                contentContainerStyle={{ gap: 12 }}
                showsVerticalScrollIndicator={true}
            >
                {attachments.map((item, index) => {
                    const file = item[0] || item; // handle format lama
                    const uri = file?.uri || file?.files;
                    const name = file?.name || uri?.split("/").pop();
                    const ext = name?.split(".").pop().toLowerCase();

                    const isImage = ["jpg", "jpeg", "png"].includes(ext);

                    return (
                        <View
                            key={index}
                            style={[
                                styles.card,
                                { backgroundColor: theme.card },
                            ]}
                        >
                            <Image
                                source={
                                    isImage
                                        ? { uri }
                                        : iconMap[ext] || iconMap["default"]
                                }
                                style={[
                                    styles.icon,
                                    isImage && { resizeMode: "cover" },
                                ]}
                            />
                            <View style={{ flex: 1 }}>
                                <Text
                                    style={[
                                        styles.name,
                                        { color: theme.text }, // ✅
                                    ]}
                                    numberOfLines={1}
                                >
                                    {name}
                                </Text>
                                <Text style={[
                                        styles.ext,
                                        { color: theme.textSecondary }, // ✅
                                    ]}>
                                    Format: {ext?.toUpperCase()}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleDownload(uri)}
                            >
                                <MaterialCommunityIcons
                                    name="download"
                                    size={24}
                                    color={theme.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
            {loading && (
                <Modal transparent animationType="fade">
                    <View style={styles.overlay}>
                        <View style={[
                                styles.loadingBox,
                                { backgroundColor: theme.card }, // ✅
                            ]}>
                            <ActivityIndicator
                                size="large"
                                color={theme.primary} // ✅
                            />
                            <Text
                                style={{
                                    marginTop: 10,
                                    color: theme.text, // ✅
                                }}
                            >
                                Mengunduh file...
                            </Text>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 14,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: 4,
    },
    name: {
        fontSize: 14,
    },
    ext: {
        fontSize: 12,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingBox: {
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        minWidth: 200,
    },
});

export default AttachmentList;
