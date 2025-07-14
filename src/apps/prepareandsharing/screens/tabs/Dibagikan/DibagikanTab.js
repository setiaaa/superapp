import React, { use, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../../theme/ThemeContext";
import { getTokenValue } from "../../../../../services/session";
import { getDocumentDibagikan } from "../../../service/prepareandsharing";
import { useNavigation } from "@react-navigation/native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import CardList from "../../../components/CardList";

const DibagikansTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);
    const dispatch = useDispatch();
    const [variant, setVariant] = useState("list");
    const navigation = useNavigation();

    useEffect(() => {
        if (token !== "") {
            dispatch(
                getDocumentDibagikan({ token: token, page: page, tipe: "done" })
            );
        }
    }, [token, page]);

    const { dibagikan, loading, load } = useSelector(
        (state) => state.prepareandsharing
    );

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    });

    console.log("dibagikan", dibagikan);

    const handleVariant = (cekVariant) => {
        setVariant(cekVariant);
    };

    const loadMore = () => {
        if (dibagikan.length !== 0 && dibagikan.length % 10 === 0) {
            setPage(page + 10);
        }
    };
    const renderItem = ({ item }) => (
        <CardList item={item} token={token} tipe={"done"} />
    );
    // const [refreshing, setRefreshing] = useState(false);

    return (
        <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}
        >
            <View style={styles.list}>
                <FlatList
                    data={dibagikan.lists !== null ? dibagikan.lists : []}
                    renderItem={renderItem}
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({});
export default DibagikansTab;
