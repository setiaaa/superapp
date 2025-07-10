import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Touchable,
    TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../../../service/prepareandsharing";
import { getTokenValue } from "../../../../../services/session";
import BadgeFilter from "../../../../../components/BadgeFilter";
import CardList from "../../../components/CardList";
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../../../../theme/ThemeContext"; // Adjust the import path as necessary

const DokumenTab = () => {
    const dispatch = useDispatch();
    const { theme } = useTheme();
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);
    const navigation = useNavigation();

    const filterType = [
        { key: "draft", published: "false", value: "Draft", label: "Draft" },
        {
            key: "published",
            published: "true",
            value: "Published",
            label: "Published",
        },
        {
            key: "revision",
            published: "true",
            value: "revision",
            label: "Revisi",
        },
        {
            key: "review",
            published: "true",
            value: "review",
            label: "Sedang Ditinjau",
        },
    ];

    const [type, setType] = useState({
        key: "draft",
        published: "false",
        value: "Draft",
        label: "Draft",
    });
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        if (token !== "") {
            dispatch(
                getDocument({
                    token: token,
                    page: page,
                    type: type.published,
                    tipe: type.value,
                })
            );
        }
    }, [type, token]);

    const { dokumen, loading, load } = useSelector(
        (state) => state.prepareandsharing
    );
    const renderItem = ({ item }) => (
        <CardList item={item} token={token} tipe={type.value} />
    );
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={{ padding: 0 }}>
                <BadgeFilter
                    filters={filterType}
                    selectedFilter={type}
                    onSelect={setType}
                />
            </View>
            <View style={styles.list}>
                <FlatList
                    data={dokumen.lists !== null ? dokumen.lists : []}
                    renderItem={renderItem}
                />
            </View>
            <TouchableOpacity
                style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    padding: 12,
                    backgroundColor: theme.primary,
                    borderRadius: 50,
                    shadowColor: theme.shadow
                }}
                onPress={() => {
                    navigation.navigate("BerbagiDokumen");
                    // Navigate to the document creation screen
                    // navigation.navigate("CreateDocument");
                }}
            >
                <MaterialCommunityIcons name="plus" size={28} color={theme.icon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
        gap: 12,
    },
    list: {
        height: "89%",
    },
});
export default DokumenTab;
