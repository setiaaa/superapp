import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getTokenValue } from "../services/session";
import {
    getDivision,
    getDivisionTree,
    getEmployee,
} from "../services/Addressbook";
import { useNavigation } from "@react-navigation/native";
import { setAddressbookSelected } from "../store/AddressbookKKP";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetBackdrop,
    BottomSheetView,
    BottomSheetTextInput,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
// import { TopAddressBook } from "../utils/menutab";
import { useTheme } from "../theme/ThemeContext";
import Header from "../components/Header";

const CardListPilih = ({ item, addressbook, device, config }) => {
    const { isDark, toggleTheme, theme } = useTheme(); // Assuming you have a useTheme hook for theming
    const dispatch = useDispatch();
    const deleteItem = (id, state) => {
        let data;
        if (state === "jabatan") {
            if (config.tipeAddress == "korespondensi") {
                data = addressbook.selected.filter((data) => {
                    let code = data.code;
                    return code !== id;
                });
            } else {
                data = addressbook.selected.filter((data) => {
                    let nip = data.nip || data?.officer?.official.split("/")[1];
                    return nip !== id;
                });
            }
            dispatch(setAddressbookSelected(data));
        } else {
            if (config.tipeAddress == "korespondensi") {
                data = addressbook.selected.filter((data) => data.nik !== id);
            } else {
                data = addressbook.selected.filter((data) => data.nip !== id);
            }
            dispatch(setAddressbookSelected(data));
        }
    };
    return (
        <View
            style={{ paddingBottom: 10 }}
            key={item.nip ? item.nip : item.code}
        >
            {item.code !== undefined && item.person !== undefined ? (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: "5%",
                        gap: 10,
                        // backgroundColor: theme.card,
                        padding: 10,
                        borderRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: "#171717",
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (config.tipeAddress == "korespondensi") {
                                deleteItem(item.code, "jabatan");
                            } else {
                                deleteItem(
                                    item.nip ||
                                        item.officer.official.split("/")[1],
                                    "jabatan"
                                );
                            }
                        }}
                    >
                        <Ionicons name="close-circle" size={24} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            width: "80%",
                        }}
                    >
                        {item.person !== undefined ? item.person : ""}
                    </Text>
                </View>
            ) : item.code !== undefined && item.title !== undefined ? (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: "5%",
                        gap: 10,
                        // backgroundColor: theme.card,
                        padding: 10,
                        borderRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: theme.shadow,
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (config.tipeAddress == "korespondensi") {
                                deleteItem(item.code, "jabatan");
                            } else {
                                deleteItem(
                                    item.nip ||
                                        item.officer.official.split("/")[1],
                                    "jabatan"
                                );
                            }
                        }}
                    >
                        <Ionicons name="close-circle" size={24} />
                    </TouchableOpacity>
                    <Text
                        style={{
                            width: "80%",
                        }}
                    >
                        {item.title.name !== undefined
                            ? item.title.name
                            : item.title}
                    </Text>
                </View>
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        display: "flex",
                        alignItems: "center",
                        marginTop: 10,
                        marginHorizontal: "5%",
                        gap: 10,
                        padding: 10,
                        borderRadius: 8,
                        //shadow ios
                        shadowOffset: { width: -2, height: 4 },
                        shadowColor: "#171717",
                        shadowOpacity: 0.2,
                        //shadow android
                        elevation: 2,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (config.tipeAddress == "korespondensi") {
                                deleteItem(item.nik, "pegawai");
                            } else {
                                deleteItem(item.nip, "pegawai");
                            }
                        }}
                    >
                        <Ionicons name="close-circle" size={24} />
                    </TouchableOpacity>
                    <View style={{ width: "80%" }}>
                        <Text style={{}}>{item.nama || item.fullname}</Text>
                        <Text style={{}}>{item.nip ? item.nip : item.nik}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export const AddressBook = ({ route }) => {
    const { theme } = useTheme();
    const [token, setToken] = useState("");
    const { config } = route.params;

    const dispatch = useDispatch();

    useEffect(() => {
        getTokenValue().then((val) => {
            setToken(val);
        });
    }, []);

    useEffect(() => {
        if (token !== "") {
            // dispatch(getDivision(token))
            dispatch(getEmployee({ token: token, search: "" }));
            // dispatch(getDivisionTree({ token: token, id: kategori.key }))
        }
    }, [token]);

    const { addressbook } = useSelector((state) => state.addressBookKKP);

    const navigation = useNavigation();

    useEffect(() => {
        dispatch(setAddressbookSelected(config.payload));
    }, [config]);

    const bottomSheetModalMemberRef = useRef(null);

    const initialSnapPoints = useMemo(() => ["10%", "90%"], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    // const bottomSheetMember = () => {
    bottomSheetModalMemberRef.current?.present();
    // };

    handleDismiss = () => {
        bottomSheetModalMemberRef.current?.present();
    };

    // if (addressbook.selected.length > 0) {
    //   bottomSheetMember();
    // }

    // useEffect(() => {
    //   if (addressbook.selected.length > 0) {
    //     bottomSheetMember();
    //   }
    // }, []);

    // const { device } = useSelector((state) => state.apps);

    return (
        <View style={{ flex: 1 }}>
            <GestureHandlerRootView>
                <Header
                    title="Buku Kontak"
                    showBack={true}
                    onBackPress={() => navigation.goBack()}
                />

                <View style={{ height: "90%" }}>
                    {/* <TopAddressBook config={config} /> */}
                </View>

                <BottomSheetModalProvider style={{}}>
                    <BottomSheetModal
                        ref={bottomSheetModalMemberRef}
                        snapPoints={animatedSnapPoints}
                        handleHeight={animatedHandleHeight}
                        contentHeight={animatedContentHeight}
                        index={0}
                        style={{
                            borderRadius: 50,
                            borderColor: "green",
                            borderWidth: 2,
                            backgroundColor: theme.surface,
                        }}
                        keyboardBlurBehavior="restore"
                        android_keyboardInputMode="adjust"
                        onDismiss={handleDismiss}
                        backgroundStyle={{ backgroundColor: theme.card }}
                    >
                        <BottomSheetView
                            onLayout={handleContentLayout}
                            style={{
                                borderColor: "red",
                                borderWidth: 1,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    borderRadius: 12,
                                    paddingBottom: 20,
                                }}
                            >
                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: 500,
                                            marginBottom: 50,
                                        }}
                                    >
                                        Daftar ({addressbook.selected.length}{" "}
                                        Pilihan)
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(
                                                setAddressbookSelected([])
                                            );
                                        }}
                                    >
                                        <Text style={{}}>Hapus Semua</Text>
                                    </TouchableOpacity>
                                </View>
                                {addressbook.selected.length === 0 ? (
                                    <View style={{ alignItems: "center" }}>
                                        <Text style={{}}>
                                            Belum ada yang dipilih
                                        </Text>
                                    </View>
                                ) : (
                                    <View>
                                        <FlatList
                                            data={addressbook.selected}
                                            renderItem={({ item }) => (
                                                <CardListPilih
                                                    item={item}
                                                    addressbook={addressbook}
                                                    config={config}
                                                />
                                            )}
                                            style={{ height: 600 }}
                                            keyExtractor={(item) =>
                                                item.nip ? item.nip : item.code
                                            }
                                        />
                                    </View>
                                )}
                            </View>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </View>
    );
};
