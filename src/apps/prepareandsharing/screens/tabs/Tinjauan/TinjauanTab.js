import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../../../../theme/ThemeContext";
import { getDocumentDibagikan } from "../../../service/prepareandsharing";
import { getTokenValue } from "../../../../../services/session";
import {
    useFocusEffect,
    useIsFocused,
    useNavigation,
} from "@react-navigation/native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import CardList from "../../../components/DocumentCardList";
import Loading from "../../../../../components/Loading";

const TinjauanTab = () => {
    const { theme, isDark, toggleTheme, themeMode } = useTheme();
    const [token, setToken] = useState("");
    const [page, setPage] = useState(10);
    const dispatch = useDispatch();
    const [variant, setVariant] = useState("list");
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const isfocused = useIsFocused();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    });

    useFocusEffect(
        useCallback(() => {
            if (token !== "") {
                dispatch(
                    getDocumentDibagikan({ token: token, page: page, tipe: "review" })
                );
            }
        }, [isfocused])
    );

    useEffect(() => {
        if (token !== "") {
            dispatch(
                getDocumentDibagikan({
                    token: token,
                    page: page,
                    tipe: "review",
                })
            );
        }
    }, [token, page]);

    const onRefresh = React.useCallback(() => {
        try {
            if (token !== "") {
                dispatch(
                    getDocumentDibagikan({
                        token: token,
                        page: page,
                        tipe: "review",
                    })
                );
            }
        } catch (error) {}

        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [token, page]);

    const { dibagikan, loading, load } = useSelector(
        (state) => state.prepareandsharing
    );
    const handleVariant = (cekVariant) => {
        setVariant(cekVariant);
    };

    const loadMore = () => {
        if (dibagikan.length !== 0 && dibagikan.length % 10 === 0) {
            setPage(page + 10);
        }
    };
    const renderItem = ({ item }) => (
        <CardList item={item} token={token} tipe={"review"} tab={"TinjauanTab"} />
    );

    return (
        <GestureHandlerRootView
            style={{ flex: 1, backgroundColor: theme.background, padding: 20 }}
        >
            {loading ? <Loading /> : null}
            <View style={styles.list}>
                <FlatList
                    data={dibagikan.lists !== null ? dibagikan.lists : []}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
export default TinjauanTab;
