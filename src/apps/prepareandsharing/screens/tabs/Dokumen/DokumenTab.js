import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDocument } from "../../../service/prepareandsharing";
import { getTokenValue } from "../../../../../services/session";
import BadgeFilter from "../../../../../components/BadgeFilter";
import CardList from "../../../components/CardList";
import { FlatList } from "react-native-gesture-handler";

const DokumenTab = () => {
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);

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
            console.log(type);
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

    // console.log("DokumenTab", dokumen.lists);
    const renderItem = ({ item }) => <CardList item={item} token={token} />;
    return (
        <View style={{ ...styles.container }}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        padding: 20,
        gap: 12
    },
});
export default DokumenTab;
