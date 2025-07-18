import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../../../../components/Search";
import { useTheme } from "../../../../../theme/ThemeContext";
import Dropdown from "../../../../../components/DropdownFilter";
import { Ionicons } from "@expo/vector-icons";
import DropdownFilter from "../../../../../components/DropdownFilter";
import { ActivityIndicator, Portal } from "react-native-paper";
import BottomSheet, {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import {
    FlatList,
    GestureHandlerRootView,
    RefreshControl,
} from "react-native-gesture-handler";
import {
    getDivisionFilter,
    getDocumentTamplate,
    getSubDivisionFilter,
} from "../../../service/prepareandsharing";
import { getTokenValue } from "../../../../../services/session";
import EmptyList from "../../../../../components/EmptyList";

const dropdownFilter = [
    {
        key: "true",
        value: "Nama Template",
    },
    {
        key: "false",
        value: "Pembuat",
    },
];

const DokumenTemplateTab = () => {
    const { theme } = useTheme();
    const [search, setSearch] = useState("");
    const [filterUnker, setFilterUnker] = useState();
    const [filterSatker, setFilterSatker] = useState();
    const [dataM, setDataM] = useState([]);
    const [page, setPage] = useState(10);
    const [type, setType] = useState({
        key: "true",
        value: "Nama Template",
    });
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }),
        [];

    const bottomSheetModalRef = useRef(null);
    const bottomSheetModalFilterRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT", "80%"], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    const bottomSheetAttach = (item) => {
        bottomSheetModalRef.current?.present();
        setDataM(item);
    };

    const bottomSheetAttachFilter = (item) => {
        bottomSheetModalFilterRef.current?.present();
    };

    const bottomSheetAttachClose = () => {
        if (bottomSheetModalRef.current) bottomSheetModalRef.current?.close();
    };

    const bottomSheetAttachFilterClose = () => {
        if (bottomSheetModalFilterRef.current)
            bottomSheetModalFilterRef.current?.close();
    };

    useEffect(() => {
        if (filterUnker && filterUnker.key) {
            dispatch(
                getSubDivisionFilter({ token: token, id: filterUnker.key })
            );
        }
    }, [filterUnker]);

    useEffect(() => {
        if (token !== "") {
            dispatch(
                getDocumentTamplate({
                    token: token,
                    page: page,
                    general: search,
                    by_title: type.key,
                    unker: filterUnker ? filterUnker.value : "",
                    satker: filterSatker ? filterSatker.value : "",
                })
            );
        }
    }, [token, page, type, search, filterUnker, filterSatker]);

    const { tamplate, loading, load, filter } = useSelector(
        (state) => state.prepareandsharing
    );

    const onRefresh = React.useCallback(() => {
        try {
            if (token !== "") {
                dispatch(
                    getDocumentTamplate({
                        token: token,
                        page: page,
                        general: search,
                        by_title: type.key,
                        unker: filterUnker ? filterUnker.value : "",
                        satker: filterSatker ? filterSatker.value : "",
                    })
                );
            }
        } catch (error) {}

        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, [token, page, type, search, filterUnker, filterSatker]);

    const unker = () => {
        let judulUnker = [];
        filter.unker.map((item) => {
            judulUnker.push({
                key: item.id,
                value: item.name,
            });
        });
        return judulUnker;
    };
    const [refreshing, setRefreshing] = useState(false);

    const satker = () => {
        let judulSatker = [];
        filter.satker.map((item) => {
            judulSatker.push({
                key: item.id,
                value: item.name,
            });
        });
        return judulSatker;
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.background },
                ]}
            >
                <Search placeholder={"Cari..."} onSearch={setSearch} />
                <View style={{ gap: 16, flexDirection: "row" }}>
                    <DropdownFilter
                        data={dropdownFilter}
                        placeHolder={"Filter"}
                        selected={type}
                        setSelected={setType}
                    />
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 8,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: theme.border,
                            backgroundColor: theme.surface,
                        }}
                        onPress={() => {
                            bottomSheetAttachFilter();
                            dispatch(getDivisionFilter({ token: token }));
                            console.log("Filter pressed");
                        }}
                    >
                        <Ionicons
                            name="filter"
                            size={24}
                            color={theme.primary}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    key={"_"}
                    data={tamplate.lists}
                    renderItem={({ item }) => (
                        <DataList
                            bottomSheetAttach={bottomSheetAttach}
                            item={item}
                            token={token}
                            device={device}
                        />
                    )}
                    ListFooterComponent={() =>
                        load === true ? (
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    padding: 24,
                                }}
                            >
                                <ActivityIndicator
                                    size="large"
                                    color={theme.primary}
                                />
                            </View>
                        ) : null
                    }
                    keyExtractor={(item) => "_" + item.id}
                    ListEmptyComponent={() => <EmptyList />}
                    onEndReached={() => {
                        if (tamplate.lists.length !== 0) {
                            loadMore();
                        }
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
                <Portal>
                    <BottomSheetModalProvider>
                        <BottomSheetModal
                            ref={bottomSheetModalFilterRef}
                            snapPoints={animatedSnapPoints}
                            handleHeight={animatedHandleHeight}
                            contentHeight={animatedContentHeight}
                            index={0}
                            style={{ borderRadius: 50 }}
                            keyboardBlurBehavior="restore"
                            android_keyboardInputMode="adjust"
                            backgroundStyle={{ backgroundColor: theme.card }}
                            handleIndicatorStyle={{
                                backgroundColor: theme.text,
                            }}
                            backdropComponent={({ style }) => (
                                <View
                                    style={[
                                        style,
                                        {
                                            backgroundColor: theme.shadow,
                                        },
                                    ]}
                                />
                            )}
                            onDismiss={bottomSheetAttachFilterClose}
                        >
                            <BottomSheetView
                                style={{
                                    paddingHorizontal: 20,
                                    paddingBottom: 40,
                                    backgroundColor: theme.surface,
                                    gap: 16,
                                }}
                                onLayout={handleContentLayout}
                            >
                                <Text
                                    style={[
                                        styles.title,
                                        { color: theme.text },
                                    ]}
                                >
                                    Filter Data
                                </Text>

                                <View style={{ gap: 16 }}>
                                    <View style={styles.input}>
                                        <Text
                                            style={[
                                                styles.label,
                                                { color: theme.text },
                                            ]}
                                        >
                                            Unit Kerja
                                        </Text>
                                        <DropdownFilter
                                            data={unker()}
                                            placeHolder={"Filter"}
                                            selected={type}
                                            setSelected={setType}
                                            absolute={false}
                                        />
                                    </View>
                                    <View style={styles.input}>
                                        <Text
                                            style={[
                                                styles.label,
                                                { color: theme.text },
                                            ]}
                                        >
                                            Satuan Kerja
                                        </Text>
                                        <DropdownFilter
                                            data={unker()}
                                            placeHolder={"Filter"}
                                            selected={type}
                                            setSelected={setType}
                                            absolute={false}
                                        />
                                    </View>
                                </View>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </BottomSheetModalProvider>
                </Portal>
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },
});
export default DokumenTemplateTab;
