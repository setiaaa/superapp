import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../../../../../services/session";
import AttachmentList from "../../../components/AttachmentList";
import { useTheme } from "../../../../../theme/ThemeContext";

const LampiranTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const [token, setToken] = useState("");
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    });
    const { dokumen, loading } = useSelector(
        (state) => state.prepareandsharing
    );
    const { device } = useSelector((state) => state.apps);
    const detail = dokumen.detail;
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Lampiran</Text>
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <Text style={{ color: theme.textSecondary }}>
                    Lampiran dokumen ini berisi file-file yang terkait dengan
                    dokumen tersebut. Anda dapat mengunduh atau melihat lampiran
                    ini sesuai kebutuhan.
                </Text>
                <AttachmentList
                    attachments={dokumen?.detail?.attachments || []}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
    },
});

export default LampiranTab;
