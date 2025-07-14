import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../../theme/ThemeContext";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getTokenValue } from "../../../../../services/session";
import {
    getDetailDocument,
    postCommentRepo,
} from "../../../service/prepareandsharing";
import { setRefresh } from "../../../store/prepareandsharing";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DaftarKomentar from "../../../components/CommentList";

const KomentarTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const [token, setToken] = useState("");
    const [komen, setKomen] = useState("");
    const [parentId, setParentId] = useState({ id: "", creator: "" });
    const { dokumen, refresh } = useSelector(
        (state) => state.prepareandsharing
    );
    const detail = dokumen.detail;
    const comment = detail?.comments;

    // console.log(detail)

    const dispatch = useDispatch();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    });

    const handleComent = () => {
        const payload = {
            document_id: detail.id,
            parent_id: parentId.id !== "" ? parentId.id : "",
            message: komen,
        };
        const data = {
            token: token,
            payload: payload,
        };
        dispatch(postCommentRepo(data));
        setKomen("");
        setParentId({ id: "", creator: "" });
        dispatch(setRefresh(true));
    };

    useEffect(() => {
        if (refresh) {
            const params = { token: token, id: detail.id };
            dispatch(getDetailDocument(params));
            dispatch(setRefresh(false));
        }
    }, [refresh]);

    // console.log('Komen: ', comment)

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <FlatList
                data={comment}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <DaftarKomentar
                            items={item}
                            setParentId={setParentId}
                        />
                    </View>
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => <Text style={{
                    color: theme.textSecondary,
                    textAlign: "center",
                }}>Tidak ada komentar</Text>}
                style={{ height: "70%" }}
            />
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        padding: 16,
        borderRadius: 12,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    },
});

export default KomentarTab;
