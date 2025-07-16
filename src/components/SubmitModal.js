import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeContext";

const SubmitModal = ({ status, setStatus, messageSuccess, navigate }) => {
    const { theme } = useTheme();
    const navigation = useNavigation();

    const isVisible = status === "success" || status === "error";

    const handleClose = () => {
        setStatus(null);
        if (navigate && status === "success") {
            navigation.navigate(navigate);
        }
    };

    const message =
        status === "success"
            ? messageSuccess || "Berhasil!"
            : "Terjadi kesalahan. Silakan coba lagi.";

    const color = status === "success" ? theme.success : theme.error;

    const buttonLabel = status === "success" ? "Lanjut" : "Tutup";

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={handleClose}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={0.4}
        >
            <View
                style={[
                    styles.modalContainer,
                    {
                        backgroundColor: theme.surface,
                        shadowColor: theme.shadow,
                    },
                ]}
            >
                <Text style={[styles.title, { color }]}>
                    {status === "success" ? "Berhasil" : "Gagal"}
                </Text>
                <Text style={[styles.message, { color: theme.textSecondary }]}>
                    {message}
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.okButton,
                            {
                                backgroundColor:
                                    status === "success"
                                        ? theme.primary
                                        : theme.error,
                            },
                        ]}
                        onPress={handleClose}
                    >
                        <Text style={{ color: theme.textButton }}>
                            {buttonLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default SubmitModal;

const styles = StyleSheet.create({
    modalContainer: {
        borderRadius: 12,
        padding: 20,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    message: {
        fontSize: 14,
        marginBottom: 20,
    },
    buttonContainer: {
        alignItems: "flex-end",
    },
    okButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
});
